import { defineField, defineType } from "sanity";

export const roomType = defineType({
  name: "room",
  title: "Room",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "details",
      title: "Details (size, guests, bed)",
      type: "array",
      of: [{ type: "string" }],
      description: 'Short tags like "320 sq.ft", "2 Guests", "King Bed".',
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "nightlyRate",
      title: "Nightly rate (INR)",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "capacity",
      title: "Max guests",
      type: "number",
      initialValue: 2,
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
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
      validation: (rule) => rule.min(1),
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "nightlyRate", media: "images.0" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? `\u20B9${subtitle.toLocaleString("en-IN")} / night` : undefined,
      media,
    }),
  },
});
