"use client";

import { usePathname } from "next/navigation";

const HERO_ROUTES = new Set<string>(["/", "/stay"]);

export function HeaderSpacer() {
  const pathname = usePathname();
  if (HERO_ROUTES.has(pathname)) return null;
  return <div aria-hidden="true" className="h-20 md:h-24" />;
}
