import Image from "next/image";
import Link from "next/link";
import { bookingEngineUrl as defaultBookingUrl } from "@/lib/booking-engine";
import {
  getFeaturedTestimonials,
  getLatestBlogPosts,
  getDiningVenues,
  getGalleryImages,
  getRooms,
  getSiteSettings,
  heroImageUrl,
} from "@/lib/sanity-content";

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1800&q=85";

export default async function Home() {
  const [settings, rooms, diningVenues, gallery, latestArticles, testimonials] = await Promise.all([
    getSiteSettings(),
    getRooms(),
    getDiningVenues(),
    getGalleryImages(),
    getLatestBlogPosts(3),
    getFeaturedTestimonials(),
  ]);

  const bookingUrl = settings?.bookingEngineUrl?.trim() || defaultBookingUrl;
  const heroSrc = heroImageUrl(settings) ?? FALLBACK_HERO;
  const galleryPreview = gallery.slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      {/* HERO */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-forest-deep text-offwhite shadow-[0_20px_60px_rgba(20,38,30,0.18)] sm:rounded-4xl">
        <Image
          src={heroSrc}
          alt="The Pavillion Hotel property in a resort-style setting"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-b from-forest-deep/30 via-forest-deep/50 to-forest-deep/75" />
        <div className="relative flex min-h-[64svh] items-center px-5 py-14 sm:min-h-[70svh] sm:px-8 sm:py-20 lg:min-h-[80svh] lg:px-14 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold/90 sm:text-[11px] sm:tracking-[0.45em]">
              Boutique Hotel Â· Kolhapur Â· Since 1995
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl leading-[1.02] sm:mt-5 sm:text-6xl lg:text-7xl">
              Escape the ordinary,
              <span className="block text-gold">rediscover the calm</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-offwhite/80 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              {settings?.description ??
                "A boutique retreat in Kolhapur wrapped in gardens, gazebos, rooms, celebrations, and refined dining."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <Link href="/stay" className="rounded-full bg-offwhite px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-forest-deep transition hover:bg-gold hover:text-offwhite sm:px-6 sm:text-[11px] sm:tracking-[0.35em]">
                Explore Stay
              </Link>
              <Link href="/events" className="rounded-full border border-offwhite/60 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-offwhite transition hover:border-gold hover:text-gold sm:px-6 sm:text-[11px] sm:tracking-[0.35em]">
                Plan an Event
              </Link>
              <Link href={bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-gold/60 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-gold transition hover:bg-gold hover:text-offwhite sm:px-6 sm:text-[11px] sm:tracking-[0.35em]">
                Book Now
              </Link>
            </div>

            <dl className="mt-10 hidden max-w-lg grid-cols-3 gap-4 border-t border-offwhite/15 pt-6 sm:mt-12 sm:grid">
              {[
                ["Est.", "1995"],
                ["Rooms", `${rooms.length || 3} Categories`],
                ["Venues", "5 Spaces"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-gold/80">{label}</dt>
                  <dd className="mt-2 font-serif text-2xl text-offwhite">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="mx-auto max-w-3xl px-1 py-16 text-center sm:py-20 lg:py-24">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Welcome</p>
        <div className="mx-auto mt-4 h-px w-12 bg-gold/60" aria-hidden="true" />
        <h2 className="mt-6 text-3xl leading-tight text-fg sm:text-4xl lg:text-5xl">
          {settings?.tagline ?? "A quiet retreat in the heart of Kolhapur"}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-fg-muted sm:mt-6 sm:text-lg">
          Tucked away in Shahupuri, The Pavillion brings together lush lawns, mature trees, and
          calm hospitality.
        </p>
      </section>

      {/* TEASERS (numbered editorial cards) */}
      <section className="grid gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {[
          ["01", "Stay", "Three room categories with photo galleries and booking paths.", "/stay"],
          ["02", "Events", "Five venues, tabbed details, and enquiry support.", "/events"],
          ["03", "Dining", "Pakhtoon and Areca CafÃ© with quick reservation access.", "/dining"],
        ].map(([num, title, description, href]) => (
          <Link
            key={title}
            href={href}
            className="group flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-[0_20px_60px_rgba(20,38,30,0.08)] transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_26px_70px_rgba(20,38,30,0.12)] sm:p-8"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-serif text-4xl text-gold/40 sm:text-5xl">{num}</span>
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold transition group-hover:translate-x-1">â†’</span>
            </div>
            <h3 className="mt-6 text-2xl text-fg sm:mt-8 sm:text-3xl">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-fg-muted">{description}</p>
          </Link>
        ))}
      </section>

      {/* DINING PREVIEW */}
      <section className="mt-16 grid gap-6 sm:mt-20 sm:gap-8 lg:grid-cols-2">
        {diningVenues.map((place) => (
          <article
            key={place.name}
            className="group overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_20px_60px_rgba(20,38,30,0.08)] transition hover:-translate-y-1 hover:border-gold/50"
          >
            <div className="relative h-56 sm:h-72 lg:h-96">
              {place.image ? (
                <Image
                  src={place.image}
                  alt={place.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              ) : null}
            </div>
            <div className="p-6 sm:p-7">
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Signature Dining</p>
              <h3 className="mt-2 text-2xl text-fg sm:text-3xl">{place.name}</h3>
              <p className="mt-4 text-sm leading-7 text-fg-muted">{place.intro}</p>
            </div>
          </article>
        ))}
      </section>

      {/* STAY + GALLERY PREVIEW */}
      <section className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Stay Preview</p>
          <div className="mt-6 grid gap-4">
            {rooms.map((room) => (
              <Link
                key={room.name}
                href="/stay"
                className="group rounded-3xl border border-line bg-surface-2 p-5 transition hover:border-gold/50 hover:bg-surface sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xl text-fg sm:text-2xl">{room.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-fg-muted">{room.description}</p>
                  </div>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.3em] text-gold transition group-hover:translate-x-1">
                    View â†’
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Gallery Preview</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {galleryPreview.map((image) => (
              <Link
                key={image.caption}
                href="/gallery"
                className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-forest-deep"
              >
                {image.src ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : null}
              </Link>
            ))}
          </div>
          <Link
            href="/gallery"
            className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold transition hover:opacity-80"
          >
            View full gallery <span aria-hidden="true">â†’</span>
          </Link>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="mt-16 sm:mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Latest Articles</p>
            <h2 className="mt-3 text-3xl text-fg sm:text-4xl">From our content hub</h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex rounded-full border border-line px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-fg transition hover:border-gold hover:text-gold"
          >
            View All
          </Link>
        </div>

        {latestArticles.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3">
            {latestArticles.map((post) => (
              <article
                key={post.slug}
                className="rounded-3xl border border-line bg-surface p-6 shadow-[0_20px_60px_rgba(20,38,30,0.08)]"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{post.estimatedReadTime} min read</p>
                <h3 className="mt-3 text-2xl text-fg">
                  <Link href={`/blog/${post.slug}`} className="transition hover:text-gold">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-fg-muted">{post.excerpt}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-line bg-surface p-6 text-sm text-fg-muted">
            Publish your first article in Studio to surface it here.
          </div>
        )}
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 ? (
        <section className="mt-16 sm:mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Guest Stories</p>
              <h2 className="mt-3 text-3xl text-fg sm:text-4xl">What guests say about us</h2>
            </div>
            <Link
              href={settings?.googleMapsUrl || "https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-line px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-fg transition hover:border-gold hover:text-gold"
            >
              Read on Google
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <article
                key={`${item.guestName}-${item.reviewDate ?? "latest"}`}
                className="rounded-3xl border border-line bg-surface p-6 shadow-[0_20px_60px_rgba(20,38,30,0.08)]"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-gold">
                  {"★".repeat(Math.max(1, Math.min(5, item.rating)))}
                </p>
                <p className="mt-4 text-sm leading-7 text-fg-muted">“{item.review}”</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-fg/80">{item.guestName}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* EVENTS CTA */}
      <section className="mt-16 rounded-3xl bg-forest-deep p-6 text-offwhite sm:mt-20 sm:rounded-4xl sm:p-8 lg:p-12">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold/90">Events</p>
        <h2 className="mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
          Weddings, conferences, and private gatherings
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-offwhite/75 sm:text-base sm:leading-8">
          The estate includes Bahar Lawns, Madhusudan Hall, Conference Hall, Areca Lawns, and the Gazebo.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
          <Link href="/events" className="inline-flex rounded-full bg-offwhite px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-forest-deep transition hover:bg-gold hover:text-offwhite sm:px-6 sm:text-[11px] sm:tracking-[0.35em]">
            Explore Venues
          </Link>
          <Link href="/contact" className="inline-flex rounded-full border border-offwhite/30 px-5 py-3 text-[10px] uppercase tracking-[0.3em] text-offwhite transition hover:border-gold hover:text-gold sm:px-6 sm:text-[11px] sm:tracking-[0.35em]">
            Contact & Book
          </Link>
        </div>
      </section>
    </main>
  );
}
