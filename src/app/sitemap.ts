import type { MetadataRoute } from "next";
import { getMenus } from "@/lib/sanity-content";
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
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/booking-options", changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const menus = await getMenus();

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, siteUrl).toString(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...menus
      .filter((menu) => menu.fileUrl)
      .map((menu) => ({
        url: new URL(`/menu/${menu.slug}`, siteUrl).toString(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
  ];
}