import type { Metadata } from "next";
import { EventsEnquiryForm } from "@/components/events-enquiry-form";
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
    <main className="mx-auto max-w-7xl 4xl:max-w-[90rem] px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
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
        <EventsEnquiryForm />
      </div>
    </main>
  );
}