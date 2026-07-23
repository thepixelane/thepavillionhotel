import Link from "next/link";
import { bookingEngineUrl } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
      <div>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Contact & Book</p>
        <h1 className="mt-4 text-5xl text-forest-deep sm:text-6xl">Plan your stay or event</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
          Use this page for reservations, WhatsApp, directions, and all direct booking paths.
        </p>

        <div className="mt-10 space-y-5 rounded-[2rem] border border-beige bg-offwhite p-7 shadow-[0_18px_50px_rgba(20,38,30,0.06)]">
          {[
            ["Reservations", "+91 96073 23737", "tel:+919607323737"],
            ["Banquet Enquiries", "0231 – 2654742 / 2652751", "tel:02312654742"],
            ["Email", "info@hotelpavillion.co.in", "mailto:info@hotelpavillion.co.in"],
            ["WhatsApp", "Chat with us instantly", "https://wa.me/919607323737"],
          ].map(([label, value, href]) => (
            <div key={label} className="flex items-start justify-between gap-6 border-b border-beige pb-4 last:border-b-0 last:pb-0">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-gold">{label}</p>
                <p className="mt-2 text-base text-forest-deep">{value}</p>
              </div>
              <Link href={href} target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.3em] text-olive transition hover:text-gold">
                Open
              </Link>
            </div>
          ))}
        </div>
      </div>

      <form className="rounded-[2rem] bg-beige/70 p-7 shadow-[0_18px_50px_rgba(20,38,30,0.06)]">
        <h2 className="text-3xl text-forest-deep">Send an Enquiry</h2>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          Tell us your dates or requirements and we’ll respond shortly.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <input className="rounded-2xl border border-beige bg-offwhite px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-stone-400 focus:border-gold" placeholder="Full name" />
          <input className="rounded-2xl border border-beige bg-offwhite px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-stone-400 focus:border-gold" placeholder="Phone" />
          <input className="rounded-2xl border border-beige bg-offwhite px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-stone-400 focus:border-gold sm:col-span-2" placeholder="Email" />
          <textarea className="min-h-32 rounded-2xl border border-beige bg-offwhite px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-stone-400 focus:border-gold sm:col-span-2" placeholder="Tell us more about your plans" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={bookingEngineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-forest px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:bg-gold">
            Book Now
          </Link>
          <Link href="https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-forest/15 px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-forest-deep transition hover:border-gold hover:text-gold">
            Directions
          </Link>
        </div>
      </form>
    </main>
  );
}