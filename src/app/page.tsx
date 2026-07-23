import Image from "next/image";
import Link from "next/link";
import { bookingEngineUrl } from "@/lib/booking-engine";
import { diningVenues, galleryImages, rooms } from "@/lib/site-data";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-forest-deep text-offwhite shadow-[0_20px_60px_rgba(20,38,30,0.18)]">
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85"
          alt="The Pavillion Hotel property in a resort-style setting"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/25 via-forest-deep/45 to-forest-deep/68" />
        <div className="relative flex min-h-[76svh] items-center px-6 py-20 lg:px-14">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.45em] text-gold/90">
              Boutique Hotel · Kolhapur · Since 1995
            </p>
            <h1 className="mt-5 max-w-2xl text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Escape the ordinary,
              <span className="block text-gold">rediscover the calm</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-offwhite/80 sm:text-lg">
              A boutique retreat in Kolhapur wrapped in gardens, gazebos, rooms, celebrations,
              and refined dining.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/stay" className="rounded-full bg-offwhite px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-forest-deep transition hover:bg-gold hover:text-offwhite">
                Explore Stay
              </Link>
              <Link href="/events" className="rounded-full border border-offwhite/60 px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-offwhite transition hover:border-gold hover:text-gold">
                Plan an Event
              </Link>
              <Link href={bookingEngineUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/60 px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-gold transition hover:bg-gold hover:text-offwhite">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl py-20 lg:py-24">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-gold">Welcome</p>
        <h2 className="text-4xl text-forest-deep sm:text-5xl">A quiet retreat in the heart of Kolhapur</h2>
        <p className="mt-6 text-base leading-8 text-stone-600 sm:text-lg">
          Tucked away in Shahupuri, The Pavillion brings together lush lawns, mature trees, and
          calm hospitality.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        {[
          ["Stay", "Three room categories with photo galleries and booking paths.", "/stay"],
          ["Events", "Five venues, tabbed details, and enquiry support.", "/events"],
          ["Dining", "Pakhtoon and Areca Café with quick reservation access.", "/dining"],
        ].map(([title, description, href]) => (
          <Link key={title} href={href} className="rounded-[2rem] bg-offwhite p-8 shadow-[0_20px_60px_rgba(20,38,30,0.08)] transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(20,38,30,0.12)]">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold">{title}</p>
            <h3 className="mt-3 text-3xl text-forest-deep">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-stone-600">{description}</p>
          </Link>
        ))}
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-2">
        {diningVenues.map((place) => (
          <article key={place.name} className="overflow-hidden bg-offwhite shadow-[0_20px_60px_rgba(20,38,30,0.08)]">
            <div className="relative h-[24rem]">
              <Image src={place.image} alt={place.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="p-7">
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Signature Dining</p>
              <h3 className="mt-2 text-3xl text-forest-deep">{place.name}</h3>
              <p className="mt-4 text-sm leading-7 text-stone-600">{place.intro}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Stay Preview</p>
          <div className="mt-6 grid gap-4">
            {rooms.map((room) => (
              <Link key={room.name} href="/stay" className="rounded-3xl border border-beige bg-beige/40 p-5 transition hover:bg-beige">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl text-forest-deep">{room.name}</h3>
                    <p className="mt-2 text-sm text-stone-600">{room.description}</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-gold">View</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Gallery Preview</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {galleryImages.slice(0, 4).map((image) => (
              <Link key={image.caption} href="/gallery" className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-forest-deep">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover transition duration-700 hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 rounded-[2rem] bg-forest-deep p-8 text-offwhite lg:p-12">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold/90">Events</p>
        <h2 className="mt-4 text-4xl sm:text-5xl">Weddings, conferences, and private gatherings</h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-offwhite/75">
          The estate includes Bahar Lawns, Madhusudan Hall, Conference Hall, Areca Lawns, and the Gazebo.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/events" className="inline-flex rounded-full bg-offwhite px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-forest-deep transition hover:bg-gold hover:text-offwhite">
            Explore Venues
          </Link>
          <Link href="/contact" className="inline-flex rounded-full border border-offwhite/30 px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-offwhite transition hover:border-gold hover:text-gold">
            Contact & Book
          </Link>
        </div>
      </section>
    </main>
  );
}