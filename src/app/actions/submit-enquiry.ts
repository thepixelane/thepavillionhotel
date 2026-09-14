"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import type {
  EnquiryField,
  EnquiryFormState,
  EnquirySource,
} from "@/lib/enquiry-state";

const MAX_LENGTHS: Record<EnquiryField, number> = {
  name: 120,
  email: 254,
  phone: 40,
  message: 4000,
  eventType: 120,
  eventDate: 40,
  guests: 60,
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const MIN_TIME_TO_FILL_MS = 2_500;
const EVENT_TYPES = new Set([
  "Wedding / Event",
  "Corporate Meeting",
  "Private Dinner",
  "General Enquiry",
]);

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function normalizeText(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function normalizeMessage(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim();
}

function isEmail(value: string): boolean {
  if (!value || value.length > MAX_LENGTHS.email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string): boolean {
  if (!value) return false;
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function normalizePhone(value: string): string {
  const digits = value.replace(/[^\d]/g, "");
  return value.trim().startsWith("+") ? `+${digits}` : digits;
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parts = value.split("-").map(Number);
  const year = parts[0] ?? 0;
  const month = parts[1] ?? 0;
  const day = parts[2] ?? 0;
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function hashClientKey(ip: string, ua: string): string {
  const salt = process.env.ENQUIRY_HASH_SALT ?? "pavillion-enquiry";
  return createHash("sha256").update(`${salt}::${ip}::${ua}`).digest("hex").slice(0, 32);
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) return false;
  bucket.count += 1;
  return true;
}

function getWriteClient(): SanityClient | null {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

async function readClientContext() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
  const userAgent = headerList.get("user-agent") ?? "unknown";
  return { ip, userAgent };
}

export async function submitEnquiry(
  _prev: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const honeypot = normalizeText(formData.get("hp_website"));
  if (honeypot) {
    return { status: "success", message: "Thank you. We'll be in touch shortly." };
  }

  const renderedAtRaw = normalizeText(formData.get("rendered_at"));
  const renderedAt = Number(renderedAtRaw);
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    const elapsed = Date.now() - renderedAt;
    if (elapsed >= 0 && elapsed < MIN_TIME_TO_FILL_MS) {
      return {
        status: "error",
        message: "Please take a moment to review your details before submitting.",
      };
    }
  }

  const sourceRaw = normalizeText(formData.get("source"));
  const source: EnquirySource = ((): EnquirySource => {
    if (sourceRaw === "events" || sourceRaw === "banquet" || sourceRaw === "stay") return sourceRaw;
    return "contact";
  })();

  const name = normalizeText(formData.get("name"));
  const email = normalizeText(formData.get("email")).toLowerCase();
  const rawPhone = normalizeText(formData.get("phone"));
  const phone = rawPhone ? normalizePhone(rawPhone) : "";
  const message = normalizeMessage(formData.get("message"));
  const requestedEventType = normalizeText(formData.get("eventType"));
  const eventType = requestedEventType && EVENT_TYPES.has(requestedEventType) ? requestedEventType : "";
  const eventDate = normalizeText(formData.get("eventDate"));
  const guests = normalizeText(formData.get("guests"));

  const fieldErrors: Partial<Record<EnquiryField, string>> = {};
  if (!name) fieldErrors.name = "Please share your name.";
  else if (name.length > MAX_LENGTHS.name) fieldErrors.name = "Name is too long.";

  if (!email) fieldErrors.email = "Please provide your email address.";
  else if (!isEmail(email)) fieldErrors.email = "Please enter a valid email address.";
  if (!phone) fieldErrors.phone = "Please provide your phone number.";
  else if (!isPhone(phone)) fieldErrors.phone = "Please enter a valid phone number.";

  if (source === "contact" && !message) {
    fieldErrors.message = "Please tell us a little about your plans.";
  }
  if (message.length > MAX_LENGTHS.message) fieldErrors.message = "Message is too long.";
  if ((source === "events" || source === "banquet") && !eventType) {
    fieldErrors.eventType = "Please select a valid event type.";
  } else if (requestedEventType && !eventType) {
    fieldErrors.eventType = "Please select a valid event type.";
  }
  if (eventDate && !isValidDate(eventDate)) {
    fieldErrors.eventDate = "Please enter a valid event date.";
  }
  if (guests && !/^\d{1,5}(?:\s*[-+]\s*\d{1,5})?$/.test(guests)) {
    fieldErrors.guests = "Please enter a valid guest count.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please review the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const { ip, userAgent } = await readClientContext();
  const clientKey = hashClientKey(ip, userAgent);
  if (!checkRateLimit(clientKey)) {
    return {
      status: "error",
      message: "Too many enquiries from this device. Please try again in a minute.",
    };
  }

  const client = getWriteClient();
  if (!client) {
    console.error("submitEnquiry: SANITY_WRITE_TOKEN missing, cannot store enquiry");
    return {
      status: "error",
      message: "Enquiries are temporarily unavailable. Please call us on +91 231 265 4742.",
    };
  }

  try {
    await client.create({
      _type: "enquiry",
      submittedAt: new Date().toISOString(),
      source,
      name,
      email: email || undefined,
      phone: phone || undefined,
      message: message || undefined,
      eventType: eventType || undefined,
      eventDate: eventDate || undefined,
      guests: guests || undefined,
      handled: false,
      ipHash: clientKey,
      userAgent: userAgent.slice(0, 512),
    });
  } catch (err) {
    console.error("submitEnquiry: failed to write to Sanity", err);
    return {
      status: "error",
      message: "We could not send your enquiry. Please try again or call us directly.",
    };
  }

  revalidatePath("/studio");

  return {
    status: "success",
    message:
      source === "events" || source === "banquet"
        ? "Thank you. Our events team will reach out shortly."
        : "Thank you. Our team will get back to you shortly.",
  };
}

