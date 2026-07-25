import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "bookingEngineUrl",
      title: "Booking engine URL",
      type: "url",
      description:
        "External booking engine used by all 'Book Now' buttons.",
    }),
    defineField({ name: "contactPhone", title: "Contact phone", type: "string" }),
    defineField({
      name: "contactPhoneAlt",
      title: "Contact phone (alternate)",
      type: "string",
    }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number (E.164, no plus)",
      type: "string",
      description: 'e.g. "919607323737"',
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "googleMapsUrl", title: "Google Maps URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "tripAdvisorUrl", title: "TripAdvisor URL", type: "url" }),
    defineField({
      name: "heroImage",
      title: "Home hero image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
  preview: {
    select: { title: "siteName", subtitle: "tagline" },
    prepare: ({ title, subtitle }) => ({
      title: title ?? "Site Settings",
      subtitle: subtitle ?? undefined,
    }),
  },
});
