import { defineField, defineType } from "sanity";

export const highlightType = defineType({
  name: "highlight",
  title: "Highlight",
  type: "document",
  description: "The featured banner shown on the home page.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. \"Shravan Festival\"",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "e.g. \"Unlimited Buffet. 22nd August to 9th September 2026\"",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "Button label",
      type: "string",
      initialValue: "Call Now",
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "active",
      title: "Published",
      type: "boolean",
      description: "Only the first published highlight appears on the home page.",
      initialValue: true,
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
    select: { title: "title", subtitle: "description", active: "active" },
    prepare: ({ title, subtitle, active }) => ({
      title,
      subtitle: active === false ? `(hidden) ${subtitle ?? ""}` : subtitle,
    }),
  },
});
