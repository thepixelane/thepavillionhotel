import Link from "next/link";
import { bookingEngineUrl, siteNavItems } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="pb-28 pt-20 lg:pb-20">
      <div className="mx-auto grid max-w-7xl gap-12 border-t border-forest-deep/10 px-5 pt-16 lg:grid-cols-[1.35fr_0.75fr_0.9fr] lg:px-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The Pavillion</p>
          <h2 className="mt-4 text-4xl text-forest-deep">
            Boutique calm for stays, celebrations, and dining.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">
            The site is being rebuilt to stay elegant, concise, and easy to update through CMS
            content later.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Explore</p>
          <ul className="mt-5 space-y-3 text-base text-forest-deep/80">
            {siteNavItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Contact</p>
          <ul className="mt-5 space-y-3 text-base text-forest-deep/80">
            <li><a href="tel:+919607323737" target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">+91 96073 23737</a></li>
            <li><a href="tel:02312654742" target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">0231 – 2654742</a></li>
            <li><a href="mailto:info@hotelpavillion.co.in" target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">info@hotelpavillion.co.in</a></li>
            <li>Shahupuri, Kolhapur – 416 001</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em]">
            <a href="https://wa.me/919607323737" target="_blank" rel="noopener noreferrer" className="rounded-full border border-forest-deep/15 px-4 py-2 text-forest-deep transition hover:border-gold hover:text-gold">
              WhatsApp
            </a>
            <a href="https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur" target="_blank" rel="noopener noreferrer" className="rounded-full border border-forest-deep/15 px-4 py-2 text-forest-deep transition hover:border-gold hover:text-gold">
              Directions
            </a>
            <a href={bookingEngineUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-forest-deep/15 px-4 py-2 text-forest-deep transition hover:border-gold hover:text-gold">
              Book Now
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em]">
            {[
              ["Instagram", "https://www.instagram.com/thepavillionhotel/"],
              ["TripAdvisor", "https://www.tripadvisor.in/Hotel_Review-g737166-d3175530-Reviews-The_Pavillion_Hotel-Kolhapur_Kolhapur_District_Maharashtra.html"],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-forest-deep/15 px-4 py-2 text-forest-deep transition hover:border-gold hover:text-gold">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-forest-deep/10 px-5 pt-6 text-sm text-stone-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 The Pavillion Hotel · Kolhapur.</p>
        <p>Direct bookings, event enquiries, and guest experiences.</p>
      </div>
    </footer>
  );
}