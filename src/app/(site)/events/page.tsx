import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { VenueTabs, type Venue as VenueTabsVenue } from "@/components/venue-tabs";
import { getSiteSettings, getVenues } from "@/lib/sanity-content";
import { createPageMetadata, eventVenuesJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Wedding & Event Venues in Kolhapur",
  description:
    "Plan weddings, receptions, conferences, and celebrations at The Pavillion Hotel's lawns and banquet venues in central Kolhapur.",
  path: "/events",
});

export default async function EventsPage() {
  const [venues, settings] = await Promise.all([getVenues(), getSiteSettings()]);
  const banquetPhone = settings?.contactPhoneAlt ?? "0231 265 2751";
  const email = settings?.contactEmail ?? "info@hotelpavillion.co.in";
  const tabsVenues: VenueTabsVenue[] = venues.map((venue) => ({
    name: venue.name,
    capacity: venue.capacity ?? "",
    description: venue.description,
    suitableFor: venue.suitableFor,
    facilities: venue.facilities,
    image: venue.image,
  }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      <JsonLd data={eventVenuesJsonLd} />
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Events</p>
        <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Weddings &amp; Events</h1>
        <p className="mt-5 text-base leading-8 text-fg-muted sm:text-lg">
          From weddings and celebrations to corporate events and intimate gatherings, we have spaces to suit every occasion. Come to us for the complete experience.
        </p>
        <div className="mt-6 flex flex-wrap gap-3"><a href={`tel:${banquetPhone.replace(/[^+\d]/g, "")}`} className="bg-forest px-5 py-3 text-xs uppercase tracking-[0.22em] text-white">Call Us</a><a href={`mailto:${email}`} className="border border-forest px-5 py-3 text-xs uppercase tracking-[0.22em] text-forest dark:border-fresh dark:text-fresh">Email Us</a></div>
      </header>

      <div className="mt-10 sm:mt-12">
        <VenueTabs venues={tabsVenues} />
      </div>
      <p className="mt-6 text-sm italic text-fg-muted">Capacity varies by seating and event format. Our events team can help plan the layout for your occasion.</p>

      <div id="contact" className="mt-12 grid gap-6 rounded-3xl bg-forest-deep p-6 text-offwhite sm:mt-14 sm:rounded-4xl sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold/90">Event Enquiry</p>
          <h2 className="mt-3 text-2xl text-offwhite sm:text-3xl">Tell us about your event</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-offwhite/75">
            Weddings, banquets, conferences, and intimate dinners can all be handled from here.
          </p>
        </div>
        <form className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold sm:col-span-1" placeholder="Full name" />
          <input className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold sm:col-span-1" placeholder="Phone" />

          <div className="relative sm:col-span-2">
            <select className="w-full appearance-none rounded-2xl border border-offwhite/20 bg-white/10 px-4 py-3 pr-11 text-sm text-offwhite outline-none transition focus:border-gold focus:bg-white/15">
              <option className="bg-forest-deep text-offwhite">Wedding / Event</option>
              <option className="bg-forest-deep text-offwhite">Corporate Meeting</option>
              <option className="bg-forest-deep text-offwhite">Private Dinner</option>
              <option className="bg-forest-deep text-offwhite">General Enquiry</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-4 grid place-items-center text-gold/85">▾</span>
          </div>

          <textarea className="min-h-28 rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold sm:col-span-2" placeholder="Share your date, capacity, and requirements" />
          <button type="submit" className="inline-flex rounded-full bg-offwhite px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-forest-deep transition hover:bg-gold hover:text-offwhite sm:col-span-2">
            Enquire Now
          </button>
        </form>
      </div>
    </main>
  );
}