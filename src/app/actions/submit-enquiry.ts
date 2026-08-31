"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

export type EnquirySource = "contact" | "events" | "banquet" | "stay";

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<EnquiryField, string>>;
};

type EnquiryField =
  | "name"
  | "email"
  | "phone"
  | "message"
  | "eventType"
  | "eventDate"
  | "guests";

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

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function normalize(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return "";
  return value.trim();
}

function isEmail(value: string): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string): boolean {
  if (!value) return false;
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15;
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
  const honeypot = normalize(formData.get("hp_website"));
  if (honeypot) {
    return { status: "success", message: "Thank you. We'll be in touch shortly." };
  }

  const renderedAtRaw = normalize(formData.get("rendered_at"));
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

  const sourceRaw = normalize(formData.get("source"));
  const source: EnquirySource = ((): EnquirySource => {
    if (sourceRaw === "events" || sourceRaw === "banquet" || sourceRaw === "stay") return sourceRaw;
    return "contact";
  })();

  const name = normalize(formData.get("name"));
  const email = normalize(formData.get("email"));
  const phone = normalize(formData.get("phone"));
  const message = normalize(formData.get("message"));
  const eventType = normalize(formData.get("eventType"));
  const eventDate = normalize(formData.get("eventDate"));
  const guests = normalize(formData.get("guests"));

  const fieldErrors: Partial<Record<EnquiryField, string>> = {};
  if (!name) fieldErrors.name = "Please share your name.";
  else if (name.length > MAX_LENGTHS.name) fieldErrors.name = "Name is too long.";

  const hasContact = email.length > 0 || phone.length > 0;
  if (!hasContact) {
    fieldErrors.email = "Add an email or phone number so we can respond.";
    fieldErrors.phone = "Add an email or phone number so we can respond.";
  } else {
    if (email && !isEmail(email)) fieldErrors.email = "Please enter a valid email address.";
    if (email && email.length > MAX_LENGTHS.email) fieldErrors.email = "Email is too long.";
    if (phone && !isPhone(phone)) fieldErrors.phone = "Please enter a valid phone number.";
  }

  if (source === "contact" && !message) {
    fieldErrors.message = "Please tell us a little about your plans.";
  }
  if (message.length > MAX_LENGTHS.message) fieldErrors.message = "Message is too long.";

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

export const initialEnquiryState: EnquiryFormState = { status: "idle", message: "" };
