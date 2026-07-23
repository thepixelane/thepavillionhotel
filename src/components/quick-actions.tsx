import Link from "next/link";

export function QuickActions() {
  return (
    <>
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {[
          ["Book", "#contact"],
          ["Plan", "/events"],
          ["Call", "tel:+919607323737"],
          ["WhatsApp", "https://wa.me/919607323737"],
        ].map(([label, href]) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-14 w-14 place-items-center rounded-2xl bg-offwhite text-center text-[10px] uppercase tracking-[0.2em] text-forest-deep shadow-[0_14px_35px_rgba(20,38,30,0.18)] transition hover:-translate-x-1 hover:bg-gold hover:text-offwhite"
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/30 bg-forest-deep px-4 py-3 lg:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2 text-center text-[10px] uppercase tracking-[0.2em] text-offwhite">
          {[
            ["Call", "tel:+919607323737"],
            ["WhatsApp", "https://wa.me/919607323737"],
            ["Book", "#contact"],
            ["Directions", "https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur"],
          ].map(([label, href]) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-offwhite px-2 py-3 text-forest-deep transition hover:bg-gold hover:text-offwhite">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}