import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { DiningGallery } from "@/components/dining-gallery";
import { getDiningVenues, getMenus, getSiteSettings } from "@/lib/sanity-content";
import { createPageMetadata, diningJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Restaurants in Kolhapur",
  description:
    "Dine at Pakhtoon Restaurant and Walkway Restaurant and Areca Cafe at The Pavillion Hotel in Kolhapur. View timings and reserve by phone.",
  path: "/dining",
});

export default async function DiningPage() {
  const [diningVenues, settings, menus] = await Promise.all([
    getDiningVenues(),
    getSiteSettings(),
    getMenus(),
  ]);
  const phone = settings?.contactPhone ?? "0231 265 4742";
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const publishedMenus = new Set(
    menus.filter((menu) => menu.fileUrl).map((menu) => menu.slug),
  );

  return (
    <main className="mx-auto max-w-7xl 4xl:max-w-[90rem] px-5 py-14 sm:py-20 lg:px-8">
      <JsonLd data={diningJsonLd} />
      <header className="max-w-3xl"><p className="text-xs uppercase tracking-[0.3em] text-emerald">Dining</p><h1 className="mt-4 text-4xl text-fg sm:text-5xl lg:text-6xl">Dining at The Pavillion</h1><p className="mt-5 text-lg leading-8 text-fg-muted">Pakhtoon Restaurant and Walkway Restaurant and Areca Cafe welcome hotel guests and visitors in Kolhapur.</p></header>
      <div className="mt-12 grid gap-8 sm:gap-12">
        {diningVenues.map((place, index) => (
          <article key={place.name} className="grid overflow-hidden border border-line bg-surface lg:grid-cols-2">
            <div className={index % 2 ? "lg:order-2" : undefined}><DiningGallery images={place.gallery} name={place.name} /></div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-xs uppercase tracking-[0.28em] text-emerald">Restaurant</p>
              <h2 className="mt-3 text-4xl text-fg sm:text-5xl">{place.name}</h2>
              <p className="mt-5 text-base leading-8 text-fg-muted">{place.intro}</p>
              {place.timing ? <p className="mt-4 text-sm text-fg-muted">{place.timing}</p> : null}
              <div className="mt-7 flex flex-wrap gap-3">{place.menuSlug && publishedMenus.has(place.menuSlug) ? <Link href={`/menu/${place.menuSlug}`} className="bg-forest px-5 py-3 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-emerald">View Menu</Link> : <span className="inline-flex border border-line px-5 py-3 text-xs uppercase tracking-[0.22em] text-fg-muted" aria-disabled="true">Menu coming soon</span>}<a href={telHref} className="border border-forest px-5 py-3 text-xs uppercase tracking-[0.22em] text-forest transition hover:bg-forest hover:text-white dark:border-fresh dark:text-fresh">Call for Booking</a></div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}