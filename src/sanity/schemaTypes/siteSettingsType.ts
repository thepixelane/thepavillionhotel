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
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "tripAdvisorUrl", title: "TripAdvisor URL", type: "url" }),
    defineField({
      name: "homeHeroImages",
      title: "Home hero images",
      type: "array",
      description: "Upload exactly two landscape images for the home crossfade.",
      validation: (rule) => rule.max(2),
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "stayHeroImage",
      title: "Stay hero image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "bookingPartners",
      title: "Booking partners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "url", title: "Property URL", type: "url", validation: (rule) => rule.required() }),
            defineField({ name: "order", title: "Sort order", type: "number", initialValue: 0 }),
          ],
          preview: { select: { title: "name", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Legacy home hero image",
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
