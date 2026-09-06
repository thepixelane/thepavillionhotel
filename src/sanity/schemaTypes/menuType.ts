import { defineField, defineType } from "sanity";

const MENU_PATH = "/menu/";

// Editors often paste a full URL; keep only the final segment.
const toSlug = (input: string) =>
  input
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^.*\/menu\//i, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);

export const menuType = defineType({
  name: "menu",
  title: "Menu (PDF)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Shown as the heading on the menu page, e.g. \"Pakhtoon Restaurant\".",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description:
        `The menu page lives at ${MENU_PATH}<slug>. Do not change this once a QR code has been printed.`,
      options: { source: "title", maxLength: 96, slugify: toSlug },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "file",
      title: "Menu PDF",
      type: "file",
      description: "Upload a new PDF here to update the menu. The URL stays the same.",
      options: { accept: "application/pdf" },
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
      description: "Turn off to show a \"Menu coming soon\" message instead of the PDF.",
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
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug ? `${MENU_PATH}${slug}` : "No URL set",
    }),
  },
});
