import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import logo from "@/assets/logo.svg";
import { HomeHero } from "@/components/home-hero";
import { PropertyGalleryPreview } from "@/components/property-gallery-preview";
import { bookingEngineUrl as defaultBookingUrl, sanitizeBookingUrl } from "@/lib/booking-engine";
import { FALLBACK_IMAGES } from "@/lib/constants";
import {
  getFeaturedTestimonials,
  getGalleryImages,
  getHighlight,
  getRooms,
  getSiteSettings,
  getVenues,
  homeHeroImages as resolveHomeHeroImages,
} from "@/lib/sanity-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "The Pavillion Hotel | Kolhapur",
  description:
    "Stay at The Pavillion Hotel in Shahupuri, Kolhapur, with comfortable rooms, restaurants, gardens, and wedding venues opposite Kolhapur Railway Station.",
  path: "/",
});

export default async function Home() {
  const [settings, rooms, gallery, testimonials, venues, highlight] = await Promise.all([
    getSiteSettings(), getRooms(), getGalleryImages(), getFeaturedTestimonials(), getVenues(), getHighlight(),
  ]);
  const heroImages = resolveHomeHeroImages(settings);
  const bookingUrl = sanitizeBookingUrl(settings?.bookingEngineUrl?.trim() || defaultBookingUrl);
  const phone = settings?.contactPhone ?? "0231 265 4742";
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const galleryPreview = gallery.filter((item) => item.category === "Property").concat(gallery).slice(0, 6);

  return (
    <main>
      <HomeHero images={heroImages.length > 0 ? heroImages : [...FALLBACK_IMAGES.hero]} />

      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
        <div className="relative mx-auto h-48 w-52 overflow-hidden rounded-sm border border-line bg-[#f6f6f6] shadow-[0_14px_45px_rgba(20,38,30,0.10)] sm:h-56 sm:w-60"><Image src={logo} alt="The Pavillion Hotel - Nestled in Nature" fill className="object-contain p-3 sm:p-4" sizes="(max-width: 640px) 208px, 240px" /></div>
        <p className="mx-auto mt-9 max-w-3xl text-lg leading-8 text-fg sm:mt-10 sm:text-2xl sm:leading-10">Nestled in the heart of Kolhapur, The Pavillion is a Portuguese-style resort surrounded by nature, offering a peaceful escape within the city. From comfortable stays to weddings, celebrations and events, there&apos;s space here to slow down, come together and make memories.</p>
      </section>

      <section className="grid bg-surface lg:grid-cols-[1.35fr_0.65fr]">
        <PropertyGalleryPreview images={galleryPreview} />
        <div className="flex flex-col justify-center bg-emerald px-6 py-12 text-white dark:bg-fresh dark:text-forest-deep sm:px-10 lg:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-offwhite dark:text-forest-deep">Pavillion Highlights</p>
            <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">{highlight.title}</h2>
            <p className="mt-5 text-lg leading-8 text-white/85 dark:text-forest-deep">{highlight.description}</p>
          <a href={telHref} className="mt-8 inline-flex w-fit border border-white px-5 py-3 text-xs uppercase tracking-[0.25em] transition hover:bg-white hover:text-emerald dark:border-forest-deep dark:hover:bg-forest-deep dark:hover:text-fresh">{highlight.ctaLabel}</a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl 4xl:max-w-[90rem] px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-xs uppercase tracking-[0.3em] text-emerald">Accommodations</p><h2 className="mt-3 text-4xl text-fg sm:text-5xl">Discover our rooms</h2></div>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-forest px-5 py-3 text-xs uppercase tracking-[0.25em] text-white transition hover:bg-emerald">Book Now</a>
        </div>
        <div className="mt-9 grid gap-6 lg:grid-cols-3">
          {rooms.slice(0, 3).map((room) => (
            <article key={room.name} className="group border border-line bg-surface">
              <div className="relative aspect-4/3 overflow-hidden bg-forest-deep">{room.images[0] ? <Image src={room.images[0]} alt={room.imageAlts[0] || room.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" /> : null}</div>
              <div className="p-6"><h3 className="text-3xl text-fg">{room.name}</h3><p className="mt-3 text-sm leading-7 text-fg-muted">{room.description}</p><Link href={`/stay#${room.slug}`} className="mt-5 inline-block text-xs uppercase tracking-[0.22em] text-emerald underline-offset-4 hover:underline">View Room →</Link></div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-forest-deep text-white">
        <div className="mx-auto grid max-w-7xl 4xl:max-w-[90rem] gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div><p className="text-xs uppercase tracking-[0.3em] text-beige">Celebrate With Us</p><h2 className="mt-4 text-4xl leading-tight sm:text-6xl">Plan Your Next Event.</h2><div className="mt-8 flex gap-3"><Link href="/events" className="bg-white px-5 py-3 text-xs uppercase tracking-[0.22em] text-forest-deep">Events</Link><Link href="/contact" className="border border-white/50 px-5 py-3 text-xs uppercase tracking-[0.22em] text-white">Contact Us</Link></div></div>
          <div><p className="font-serif text-3xl italic leading-relaxed text-fresh sm:text-4xl">{venues.slice(0, 5).map((venue) => venue.name).join(". ")}.</p><p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">From wedding celebrations, gatherings, and corporate events. We have a space for every occasion.</p></div>
        </div>
      </section>

      <section className="border-b border-line bg-offwhite">
        <div className="mx-auto max-w-7xl 4xl:max-w-[90rem] px-5 py-16 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald">Guest Stories</p>
            <h2 className="mt-3 text-4xl leading-tight text-forest-deep sm:text-5xl">A stay worth remembering</h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {(testimonials.length > 0 ? testimonials.slice(0, 3) : [{ guestName: "Guest review", rating: 5, review: "A peaceful stay in the heart of Kolhapur." }]).map((item, index) => (
              <blockquote key={`${item.guestName}-${index}`} className={`group relative flex min-h-56 flex-col overflow-hidden rounded-sm border border-forest-deep/15 border-t-4 bg-white p-6 shadow-[0_12px_30px_rgba(37,59,46,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(37,59,46,0.14)] sm:min-h-64 sm:p-8 ${index === 0 ? "border-t-terracotta" : index === 1 ? "border-t-emerald" : "border-t-fresh"}`}>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm tracking-[0.16em] text-terracotta" aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(item.rating)}</p>
                  <span className="font-serif text-5xl leading-7 text-terracotta/45 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">&ldquo;</span>
                </div>
                <p className="mt-6 flex-1 font-serif text-2xl leading-9 text-forest-deep">&ldquo;{item.review}&rdquo;</p>
                <footer className="mt-8 border-t border-forest-deep/10 pt-5 text-xs uppercase tracking-[0.2em] text-emerald dark:text-forest-deep">{item.guestName}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}