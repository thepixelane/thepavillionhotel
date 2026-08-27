import Link from "next/link";
import type { Metadata } from "next";
import { bookingEngineUrl as defaultBookingUrl } from "@/lib/booking-engine";
import { getSiteSettings } from "@/lib/sanity-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Book Your Stay",
  description:
    "Book a room at The Pavillion Hotel in Kolhapur directly or compare available online booking options.",
  path: "/booking-options",
});

export default async function BookingOptionsPage() {
  const settings = await getSiteSettings();
  const directUrl = settings?.bookingEngineUrl?.trim() || defaultBookingUrl;
  const partners = settings?.bookingPartners ?? [];

  return (
    <main className="mx-auto min-h-[65svh] max-w-5xl px-5 py-14 sm:py-20 lg:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-emerald">Stay</p>
      <h1 className="mt-4 text-5xl text-fg sm:text-6xl">Compare booking options</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-fg-muted">Book directly with The Pavillion or compare rates and availability with our booking partners.</p>
      <div className="mt-10 divide-y divide-line border-y border-line">
        <BookingLink name="Book directly with The Pavillion" href={directUrl} emphasis />
        {partners.map((partner) => <BookingLink key={`${partner.name}-${partner.url}`} name={partner.name} href={partner.url} />)}
      </div>
      <Link href="/stay" className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-emerald">← Back to rooms</Link>
    </main>
  );
}

function BookingLink({ name, href, emphasis = false }: { name: string; href: string; emphasis?: boolean }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 py-6 text-lg text-fg transition hover:text-emerald"><span className={emphasis ? "font-semibold" : undefined}>{name}</span><span aria-hidden="true">↗</span></a>;
}