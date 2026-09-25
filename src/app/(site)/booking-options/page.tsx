import Link from "next/link";
import type { Metadata } from "next";
import { sanitizeBookingUrl } from "@/lib/booking-engine";
import { getSiteSettings } from "@/lib/sanity-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Book Your Stay",
  description:
    "Call or email The Pavillion Hotel in Kolhapur to book directly, or book through our online travel partners.",
  path: "/booking-options",
});

export default async function BookingOptionsPage() {
  const settings = await getSiteSettings();
  const phone = settings?.contactPhone ?? "0231 265 4742";
  const email = settings?.contactEmail ?? "info@hotelpavillion.co.in";
  const partners = [...(settings?.bookingPartners ?? [])].sort((a, b) => a.order - b.order);

  return (
    <main className="mx-auto min-h-[65svh] max-w-5xl px-5 py-14 sm:py-20 lg:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-emerald">Stay</p>
      <h1 className="mt-4 text-4xl text-fg sm:text-5xl lg:text-6xl">Book your stay</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-fg-muted">The Pavillion Hotel doesn't take bookings directly through this website — call or email us, or book through one of our online travel partners below.</p>
      <div className="mt-10 divide-y divide-line border-y border-line">
        <BookingLink name={`Call to book — ${phone}`} href={`tel:${phone.replace(/[^+\d]/g, "")}`} emphasis />
        <BookingLink name={`Email to book — ${email}`} href={`mailto:${email}`} emphasis />
        {partners.map((partner) => (
          <BookingLink
            key={`${partner.name}-${partner.url}`}
            name={partner.name}
            href={sanitizeBookingUrl(partner.url)}
            external
          />
        ))}
      </div>
      <Link href="/stay" className="mt-8 inline-block text-xs uppercase tracking-[0.22em] text-emerald">← Back to rooms</Link>
    </main>
  );
}

function BookingLink({ name, href, emphasis = false, external = false }: { name: string; href: string; emphasis?: boolean; external?: boolean }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="flex items-center justify-between gap-4 py-6 text-lg text-fg transition hover:text-emerald"><span className={emphasis ? "font-semibold" : undefined}>{name}</span><span aria-hidden="true">↗</span></a>;
}