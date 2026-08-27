import Link from "next/link";
import { HotelIcon, LocationPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/action-icons";
import { bookingEngineUrl as defaultBookingUrl } from "@/lib/booking-engine";
import { getSiteSettings } from "@/lib/sanity-content";

export async function QuickActions() {
  const settings = await getSiteSettings();
  const phone = settings?.contactPhone ?? "0231 265 4742";
  const whatsapp = settings?.whatsappNumber ?? "919607323737";
  const bookingUrl = settings?.bookingEngineUrl?.trim() || defaultBookingUrl;
  const mapsUrl = settings?.googleMapsUrl ?? "https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur";
  const actions = [
    { label: "Call", shortLabel: "Call", href: `tel:${phone.replace(/[^+\d]/g, "")}`, icon: PhoneIcon, external: false },
    { label: "Book a stay", shortLabel: "Book", href: bookingUrl, icon: HotelIcon, external: true },
    { label: "Find us on Google Maps", shortLabel: "Maps", href: mapsUrl, icon: LocationPinIcon, external: true },
    { label: "WhatsApp", shortLabel: "WA", href: `https://wa.me/${whatsapp}`, icon: WhatsAppIcon, external: true },
  ];

  return (
    <>
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {actions.map(({ label, href, icon: Icon, external }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            title={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group grid h-14 w-14 place-items-center rounded-2xl border border-line bg-surface text-fg shadow-[0_14px_35px_rgba(20,38,30,0.18)] transition hover:-translate-x-1 hover:border-gold hover:bg-gold hover:text-offwhite"
          >
            <Icon className="h-5 w-5 transition group-hover:scale-110" />
          </Link>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/30 bg-forest-deep px-4 py-3 lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2 text-center text-[10px] uppercase tracking-[0.2em] text-offwhite">
          {actions.map(({ label, href, icon: Icon, shortLabel, external }) => (
            <Link key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={label} title={label} className="rounded-xl bg-offwhite px-2 py-2 text-forest-deep transition hover:bg-gold hover:text-offwhite">
              <span className="flex flex-col items-center gap-1">
                <Icon className="h-5 w-5" />
                <span className="leading-none">{shortLabel}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}