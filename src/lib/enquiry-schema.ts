import { z } from "zod";

export const EVENT_TYPES = [
  "Wedding / Event",
  "Corporate Meeting",
  "Private Dinner",
  "General Enquiry",
] as const;

const optionalEmail = z.union([z.literal(""), z.string().email("Please enter a valid email address.").max(254, "Email is too long.")]);
const optionalPhone = z.union([z.literal(""), z.string().regex(/^\+?[\d\s().-]{7,40}$/, "Please enter a valid phone number.")]);

const contactDetails = {
  name: z.string().min(1, "Please share your name.").max(120, "Name is too long."),
  email: optionalEmail,
  phone: optionalPhone,
};

function requireContactMethod<T extends z.ZodTypeAny>(schema: T) {
  return schema.superRefine((values: z.infer<T>, context) => {
    const contact = values as { email?: string; phone?: string };
    if (!contact.email) context.addIssue({ code: "custom", path: ["email"], message: "Please provide your email address." });
    if (!contact.phone) context.addIssue({ code: "custom", path: ["phone"], message: "Please provide your phone number." });
  });
}

export const contactEnquirySchema = requireContactMethod(
  z.object({
    ...contactDetails,
    message: z.string().min(1, "Please tell us a little about your plans.").max(4000, "Message is too long."),
  }),
);

export const eventsEnquirySchema = requireContactMethod(
  z.object({
    ...contactDetails,
    eventType: z.enum(EVENT_TYPES),
    message: z.string().max(4000, "Message is too long."),
  }),
);

export type ContactEnquiryValues = z.infer<typeof contactEnquirySchema>;
export type EventsEnquiryValues = z.infer<typeof eventsEnquirySchema>;