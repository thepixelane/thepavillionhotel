import Link from "next/link";
import { MapIcon, PhoneIcon, WhatsAppIcon } from "@/components/action-icons";
import { bookingEngineUrl as defaultBookingUrl } from "@/lib/booking-engine";
import { siteNavItems } from "@/lib/site-data";
import { getSiteSettings } from "@/lib/sanity-content";

export async function SiteFooter() {
  const settings = await getSiteSettings();

  const phone = settings?.contactPhone ?? "+91 96073 23737";
  const phoneAlt = settings?.contactPhoneAlt ?? "0231 – 2654742";
  const email = settings?.contactEmail ?? "info@hotelpavillion.co.in";
  const whatsapp = settings?.whatsappNumber ?? "919607323737";
  const address = settings?.address ?? "Shahupuri, Kolhapur – 416 001";
  const mapsUrl =
    settings?.googleMapsUrl ??
    "https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur";
  const bookingUrl = settings?.bookingEngineUrl?.trim() || defaultBookingUrl;
  const instagramUrl = settings?.instagramUrl ?? "https://www.instagram.com/thepavillionhotel/";
  const tripAdvisorUrl =
    settings?.tripAdvisorUrl ??
    "https://www.tripadvisor.in/Hotel_Review-g737166-d3175530-Reviews-The_Pavillion_Hotel-Kolhapur_Kolhapur_District_Maharashtra.html";
  const telHref = (raw: string) => `tel:${raw.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="pb-28 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-line px-4 pt-10 sm:gap-12 sm:px-5 sm:pt-14 lg:grid-cols-[1.35fr_0.75fr_0.9fr] lg:px-8 lg:pt-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
            {settings?.siteName ?? "The Pavillion"}
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-fg sm:text-4xl">
            {settings?.tagline ?? "Boutique calm for stays, celebrations, and dining."}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-fg-muted sm:text-base sm:leading-8">
            {settings?.description ??
              "The site is being rebuilt to stay elegant, concise, and easy to update through CMS content later."}
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Explore</p>
          <ul className="mt-5 space-y-3 text-base text-fg/80">
            {siteNavItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Contact</p>
          <ul className="mt-5 space-y-3 text-base text-fg/80">
            <li className="flex items-center gap-2"><PhoneIcon className="h-4 w-4 shrink-0 text-gold" /><a href={telHref(phone)} className="transition hover:text-gold">{phone}</a></li>
            <li className="flex items-center gap-2"><PhoneIcon className="h-4 w-4 shrink-0 text-gold" /><a href={telHref(phoneAlt)} className="transition hover:text-gold">{phoneAlt}</a></li>
            <li className="flex items-center gap-2"><MapIcon className="h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${email}`} className="transition hover:text-gold">{email}</a></li>
            <li className="whitespace-pre-line text-fg-muted">{address}</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em]">
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-fg transition hover:border-gold hover:text-gold">
              <WhatsAppIcon className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-fg transition hover:border-gold hover:text-gold">
              <MapIcon className="h-4 w-4" />
              Directions
            </a>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-fg transition hover:border-gold hover:text-gold">
              <MapIcon className="h-4 w-4" />
              Book Now
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em]">
            {[
              ["Instagram", instagramUrl],
              ["TripAdvisor", tripAdvisorUrl],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-4 py-2 text-fg transition hover:border-gold hover:text-gold">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-line px-4 pt-6 text-xs text-fg-muted sm:mt-12 sm:gap-4 sm:px-5 sm:text-sm lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 The Pavillion Hotel · Kolhapur.</p>
        <p>Direct bookings, event enquiries, and guest experiences.</p>
      </div>
    </footer>
  );
}