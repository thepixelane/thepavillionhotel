import Link from "next/link";
import { CalendarIcon, MapIcon, PhoneIcon, WhatsAppIcon } from "@/components/action-icons";

export function QuickActions() {
  return (
    <>
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {[
          { label: "Book", href: "/contact" as const, icon: MapIcon, external: false },
          { label: "Plan", href: "/events" as const, icon: CalendarIcon, external: false },
          { label: "Call", href: "tel:+919607323737" as const, icon: PhoneIcon, external: false },
          { label: "WhatsApp", href: "https://wa.me/919607323737" as const, icon: WhatsAppIcon, external: true },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            title={label}
            className="group grid h-14 w-14 place-items-center rounded-2xl border border-line bg-surface text-fg shadow-[0_14px_35px_rgba(20,38,30,0.18)] transition hover:-translate-x-1 hover:border-gold hover:bg-gold hover:text-offwhite"
          >
            <Icon className="h-5 w-5 transition group-hover:scale-110" />
          </Link>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/30 bg-forest-deep px-4 py-3 lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2 text-center text-[10px] uppercase tracking-[0.2em] text-offwhite">
          {[
            { label: "Call", href: "tel:+919607323737" as const, icon: PhoneIcon, shortLabel: "Call", external: false },
            { label: "WhatsApp", href: "https://wa.me/919607323737" as const, icon: WhatsAppIcon, shortLabel: "WA", external: true },
            { label: "Book", href: "#contact" as const, icon: MapIcon, shortLabel: "Book", external: false },
            { label: "Directions", href: "https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur" as const, icon: MapIcon, shortLabel: "Maps", external: true },
          ].map(({ label, href, icon: Icon, shortLabel, external }) => (
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