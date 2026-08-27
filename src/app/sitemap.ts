import type { MetadataRoute } from "next";
import { getBlogCategories, getBlogPosts } from "@/lib/sanity-content";
import { siteUrl } from "@/lib/public-env";

const staticRoutes: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/stay", changeFrequency: "monthly", priority: 0.9 },
  { path: "/events", changeFrequency: "monthly", priority: 0.9 },
  { path: "/dining", changeFrequency: "monthly", priority: 0.8 },
  { path: "/gallery", changeFrequency: "weekly", priority: 0.7 },
  { path: "/offers", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/booking-options", changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ posts }, categories] = await Promise.all([
    getBlogPosts({ limit: 1000 }),
    getBlogCategories(),
  ]);
  const tags = Array.from(
    new Map(
      posts.flatMap((post) => post.tags).map((tag) => [tag.slug, tag]),
    ).values(),
  );

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, siteUrl).toString(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
      lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.8 : 0.6,
    })),
    ...categories.map((category) => ({
      url: new URL(`/blog/category/${category.slug}`, siteUrl).toString(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...tags.map((tag) => ({
      url: new URL(`/blog/tag/${tag.slug}`, siteUrl).toString(),
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  ];
}