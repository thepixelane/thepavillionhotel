import { defineField, defineType } from "sanity";

export const diningVenueType = defineType({
  name: "diningVenue",
  title: "Dining venue",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "timing", title: "Timing", type: "string" }),
    defineField({
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
});
