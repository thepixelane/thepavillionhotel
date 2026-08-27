import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import logo from "@/assets/logo.svg";
import { HomeHero } from "@/components/home-hero";
import { PropertyGalleryPreview } from "@/components/property-gallery-preview";
import { bookingEngineUrl as defaultBookingUrl } from "@/lib/booking-engine";
import {
  getFeaturedTestimonials,
  getGalleryImages,
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

const FALLBACK_HEROES = [
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=88", alt: "The Pavillion Hotel surrounded by greenery" },
  { src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=2000&q=88", alt: "A peaceful hotel courtyard" },
];

export default async function Home() {
  const [settings, rooms, gallery, testimonials, venues] = await Promise.all([
    getSiteSettings(), getRooms(), getGalleryImages(), getFeaturedTestimonials(), getVenues(),
  ]);
  const heroImages = resolveHomeHeroImages(settings);
  const bookingUrl = settings?.bookingEngineUrl?.trim() || defaultBookingUrl;
  const phone = settings?.contactPhone ?? "0231 265 4742";
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  const galleryPreview = gallery.filter((item) => item.category === "Property").concat(gallery).slice(0, 6);

  return (
    <main>
      <HomeHero images={heroImages.length > 0 ? heroImages : FALLBACK_HEROES} />

      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
        <div className="relative mx-auto h-48 w-52 overflow-hidden rounded-sm border border-line bg-[#f6f6f6] shadow-[0_14px_45px_rgba(20,38,30,0.10)] sm:h-56 sm:w-60"><Image src={logo} alt="The Pavillion Hotel - Nestled in Nature" fill className="object-contain p-3 sm:p-4" sizes="(max-width: 640px) 208px, 240px" /></div>
        <p className="mx-auto mt-9 max-w-3xl text-lg leading-8 text-fg sm:mt-10 sm:text-2xl sm:leading-10">Nestled in the heart of Kolhapur, The Pavillion is a Portuguese-style resort surrounded by nature, offering a peaceful escape within the city. From comfortable stays to weddings, celebrations and events, there&apos;s space here to slow down, come together and make memories.</p>
      </section>

      <section className="grid bg-surface lg:grid-cols-[1.35fr_0.65fr]">
        <PropertyGalleryPreview images={galleryPreview} />
        <div className="flex flex-col justify-center bg-emerald px-6 py-12 text-white sm:px-10 lg:px-12">
          <p className="text-xs uppercase tracking-[0.3em] text-beige">Pavillion Highlights</p>
            <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">Shravan Festival</h2>
            <p className="mt-5 text-lg leading-8 text-white/85">Unlimited Buffet. 22nd August to 9th September 2026</p>
          <a href={telHref} className="mt-8 inline-flex w-fit border border-white px-5 py-3 text-xs uppercase tracking-[0.25em] transition hover:bg-white hover:text-emerald">Call Now</a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-24 lg:px-8">
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
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div><p className="text-xs uppercase tracking-[0.3em] text-beige">Celebrate With Us</p><h2 className="mt-4 text-4xl leading-tight sm:text-6xl">Plan Your Next Event.</h2><div className="mt-8 flex gap-3"><Link href="/events" className="bg-white px-5 py-3 text-xs uppercase tracking-[0.22em] text-forest-deep">Events</Link><Link href="/contact" className="border border-white/50 px-5 py-3 text-xs uppercase tracking-[0.22em] text-white">Contact Us</Link></div></div>
          <div><p className="font-serif text-3xl italic leading-relaxed text-fresh sm:text-4xl">{venues.slice(0, 5).map((venue) => venue.name).join(". ")}.</p><p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">From wedding celebrations, gatherings, and corporate events. We have a space for every occasion.</p></div>
        </div>
      </section>

      <section className="border-b border-line bg-offwhite">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald">Guest Stories</p>
            <h2 className="mt-3 text-4xl leading-tight text-forest-deep sm:text-5xl">A stay worth remembering</h2>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden border border-forest-deep/15 bg-forest-deep/15 md:grid-cols-3">
            {(testimonials.length > 0 ? testimonials.slice(0, 3) : [{ guestName: "Guest review", rating: 5, review: "A peaceful stay in the heart of Kolhapur." }]).map((item, index) => (
              <blockquote key={`${item.guestName}-${index}`} className="flex min-h-64 flex-col bg-white p-7 sm:p-8">
                <p className="text-sm tracking-[0.16em] text-terracotta" aria-label={`${item.rating} out of 5 stars`}>{"★".repeat(item.rating)}</p>
                <p className="mt-7 flex-1 font-serif text-2xl leading-9 text-forest-deep">“{item.review}”</p>
                <footer className="mt-8 border-t border-forest-deep/10 pt-5 text-xs uppercase tracking-[0.2em] text-emerald">{item.guestName}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}