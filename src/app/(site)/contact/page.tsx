import Link from "next/link";
import { WhatsAppIcon } from "@/components/action-icons";
import { bookingEngineUrl as defaultBookingUrl } from "@/lib/booking-engine";
import { getSiteSettings } from "@/lib/sanity-content";

type ContactRow = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const primaryPhone = settings?.contactPhone ?? "+91 96073 23737";
  const primaryPhoneHref = `tel:${primaryPhone.replace(/[^+\d]/g, "")}`;
  const banquetPhone = settings?.contactPhoneAlt ?? "0231 – 2654742 / 2652751";
  const banquetPhoneHref = `tel:${banquetPhone.replace(/[^+\d]/g, "").split(/[^\d]/).filter(Boolean)[0] ?? ""}`;
  const email = settings?.contactEmail ?? "info@hotelpavillion.co.in";
  const whatsapp = settings?.whatsappNumber ?? "919607323737";
  const mapsUrl =
    settings?.googleMapsUrl ??
    "https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur";
  const bookingUrl = settings?.bookingEngineUrl?.trim() || defaultBookingUrl;
  const address =
    settings?.address ??
    "The Pavillion Hotel\nShahupuri, Kolhapur – 416 001\nMaharashtra, India";

  const rows: ContactRow[] = [
    { label: "Reservations", value: primaryPhone, href: primaryPhoneHref },
    { label: "Banquet Enquiries", value: banquetPhone, href: banquetPhoneHref },
    { label: "Email", value: email, href: `mailto:${email}` },
    {
      label: "WhatsApp",
      value: "Chat with us instantly",
      href: `https://wa.me/${whatsapp}`,
      external: true,
    },
  ];

  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-10 sm:px-5 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
      <div>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Contact & Book</p>
        <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Plan your stay or event</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-fg-muted sm:text-lg">
          Use this page for reservations, WhatsApp, directions, and all direct booking paths.
        </p>

        <div className="mt-8 space-y-5 rounded-3xl border border-line bg-surface p-6 shadow-[0_18px_50px_rgba(20,38,30,0.06)] sm:mt-10 sm:p-7">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4 last:border-b-0 last:pb-0 sm:gap-6">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.35em] text-gold">{row.label}</p>
                <p className="mt-2 wrap-break-word text-base text-fg">{row.value}</p>
              </div>
              <Link
                href={row.href}
                target={row.external ? "_blank" : undefined}
                rel={row.external ? "noopener noreferrer" : undefined}
                className="inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-olive transition hover:text-gold"
              >
                {row.label === "WhatsApp" ? <WhatsAppIcon className="h-4 w-4" /> : null}
                <span>Open</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-line bg-surface-2 p-6 sm:p-7">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Address</p>
          <p className="mt-3 whitespace-pre-line text-base leading-7 text-fg">{address}</p>
        </div>
      </div>

      <form className="rounded-3xl border border-line bg-surface-2 p-6 shadow-[0_18px_50px_rgba(20,38,30,0.06)] sm:p-7">
        <h2 className="text-2xl text-fg sm:text-3xl">Send an Enquiry</h2>
        <p className="mt-3 text-sm leading-7 text-fg-muted">
          Tell us your dates or requirements and we’ll respond shortly.
        </p>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
          <input className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none ring-0 transition placeholder:text-fg-muted focus:border-gold" placeholder="Full name" />
          <input className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none ring-0 transition placeholder:text-fg-muted focus:border-gold" placeholder="Phone" />
          <input className="rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none ring-0 transition placeholder:text-fg-muted focus:border-gold sm:col-span-2" placeholder="Email" />
          <textarea className="min-h-32 rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-fg outline-none ring-0 transition placeholder:text-fg-muted focus:border-gold sm:col-span-2" placeholder="Tell us more about your plans" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:bg-gold sm:px-6">
            Book Now
          </Link>
          <Link href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-fg transition hover:border-gold hover:text-gold sm:px-6">
            Directions
          </Link>
        </div>
      </form>
    </main>
  );
}