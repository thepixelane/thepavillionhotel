import Link from "next/link";
import type { Metadata } from "next";
import { getServices, getSiteSettings } from "@/lib/sanity-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover guest services at The Pavillion, including airport pickup, concierge support, and celebration assistance.",
};

function iconForService(icon?: string): string {
  switch (icon) {
    case "car":
      return "[CAR]";
    case "clock":
      return "[TIME]";
    case "shield":
      return "[SAFE]";
    case "bell":
      return "[DESK]";
    case "phone":
      return "[CALL]";
    default:
      return "[PLUS]";
  }
}

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);
  const mapsUrl =
    settings?.googleMapsUrl ||
    "https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur";

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Services</p>
        <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Comfort, coordinated</h1>
        <p className="mt-5 text-base leading-8 text-fg-muted sm:text-lg">
          Practical services designed to make every stay smoother, from arrival to departure.
        </p>
      </header>

      {services.length > 0 ? (
        <section className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="rounded-3xl border border-line bg-surface p-6 shadow-[0_20px_60px_rgba(20,38,30,0.08)]"
            >
              <p className="text-2xl" aria-hidden="true">{iconForService(service.icon)}</p>
              <h2 className="mt-4 text-2xl text-fg">{service.title}</h2>
              <p className="mt-3 text-sm leading-7 text-fg-muted">{service.shortDescription}</p>
              <div className="mt-5 h-2" aria-hidden="true" />
            </article>
          ))}
        </section>
      ) : (
        <section className="mt-10 rounded-3xl border border-dashed border-line bg-surface p-8 text-center sm:mt-12">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">No Services Added</p>
          <p className="mt-3 text-sm text-fg-muted">
            Add service documents in Studio to populate this section.
          </p>
        </section>
      )}

      <section className="mt-10 overflow-hidden rounded-3xl bg-forest-deep text-offwhite shadow-[0_24px_70px_rgba(20,38,30,0.12)] sm:mt-12">
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold/90">Need assistance?</p>
            <h2 className="mt-3 text-2xl leading-tight text-offwhite sm:text-3xl lg:text-4xl">
              Planning a stay or special request?
            </h2>
            <p className="mt-3 text-sm leading-7 text-offwhite/75 sm:text-base">
              Our team can help with personalised arrangements, arrivals, celebrations, and guest support.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-offwhite px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-forest-deep transition hover:bg-gold hover:text-offwhite"
            >
              Reach out to the team
            </Link>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-offwhite/35 px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-offwhite transition hover:border-gold hover:text-gold"
            >
              Open Maps
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
