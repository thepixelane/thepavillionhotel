import { VenueTabs, type Venue } from "@/components/venue-tabs";
import { venues } from "@/lib/site-data";

export default function EventsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Events</p>
      <h1 className="mt-4 text-5xl text-forest-deep sm:text-6xl">Weddings & Events</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
        Five distinct venues with a focused tabbed layout and an enquiry form for planning.
      </p>

      <div className="mt-12">
        <VenueTabs venues={venues as readonly Venue[]} />
      </div>

      <div className="mt-12 grid gap-6 rounded-[2rem] bg-forest-deep p-7 text-offwhite lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold/90">Event Enquiry</p>
          <h2 className="mt-3 text-3xl text-offwhite">Tell us about your event</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-offwhite/75">
            Weddings, banquets, conferences, and intimate dinners can all be handled from here.
          </p>
        </div>
        <form className="grid gap-3 sm:grid-cols-2">
          <input className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold sm:col-span-1" placeholder="Full name" />
          <input className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold sm:col-span-1" placeholder="Phone" />
          <select className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold sm:col-span-2">
            <option>Wedding / Event</option>
            <option>Corporate Meeting</option>
            <option>Private Dinner</option>
            <option>General Enquiry</option>
          </select>
          <textarea className="min-h-28 rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold sm:col-span-2" placeholder="Share your date, capacity, and requirements" />
          <button type="submit" className="inline-flex rounded-full bg-offwhite px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-forest-deep transition hover:bg-gold hover:text-offwhite sm:col-span-2">
            Enquire Now
          </button>
        </form>
      </div>
    </main>
  );
}