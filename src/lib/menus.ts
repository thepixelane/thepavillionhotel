// Fallback registry for /menu/[slug] routes.
// Menus are normally managed in Sanity Studio under "Menus (PDF)"; entries here
// only serve slugs that have no matching Sanity document yet, so printed QR
// codes keep working. Files live in public/menus/.
export type MenuDefinition = {
  slug: string;
  title: string;
  /** Path relative to /public, e.g. "/menus/PakhtoonMenu.pdf" */
  file: string;
};

export const menus: readonly MenuDefinition[] = [
  { slug: "pakhtoon", title: "Pakhtoon Restaurant", file: "/menus/PakhtoonMenu.pdf" },
  { slug: "walkway", title: "Walkway Restaurant & Areca Cafe", file: "/menus/WalkwayMenu.pdf" },
  { slug: "bar", title: "Bar Menu", file: "/menus/BarMenu.pdf" },
  { slug: "room-service", title: "In-Room Dining", file: "/menus/RoomMenu.pdf" },
] as const;

export function getMenu(slug: string): MenuDefinition | undefined {
  return menus.find((menu) => menu.slug === slug);
}
