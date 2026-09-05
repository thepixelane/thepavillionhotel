import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { RoomFeatureIcon } from "@/components/room-feature-icon";
import { RoomImageCarousel } from "@/components/room-image-carousel";
import { getRooms, getSiteSettings, stayHeroImage as resolveStayHeroImage } from "@/lib/sanity-content";
import { createPageMetadata, roomsJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Rooms & Suites in Kolhapur",
  description:
    "Explore Deluxe, Executive, and Suite accommodation at The Pavillion Hotel in Kolhapur, with direct booking and amenities for a comfortable stay.",
  path: "/stay",
});

export default async function StayPage() {
  const [rooms, settings] = await Promise.all([getRooms(), getSiteSettings()]);
  const stayHero = resolveStayHeroImage(settings) ?? (rooms[0]?.images[0] ? { src: rooms[0].images[0], alt: rooms[0].imageAlts[0] || "A room at The Pavillion Hotel" } : null);
  const phone = settings?.contactPhone ?? "0231 265 4742";
  const email = settings?.contactEmail ?? "info@hotelpavillion.co.in";
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <main>
      <JsonLd data={roomsJsonLd} />
      <section className="relative min-h-[100svh] overflow-hidden bg-forest-deep">
        {stayHero ? <Image src={stayHero.src} alt={stayHero.alt} fill priority sizes="100vw" className="object-cover opacity-80" /> : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-black/30" />
      </section>

      <section className="mx-auto max-w-7xl 4xl:max-w-[90rem] px-5 py-14 sm:py-20 lg:px-8">
        <h1 className="max-w-4xl text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Our rooms and suites are designed to make your stay comfortable and relaxed.</h1>
        <div className="mt-10 grid border-y border-line lg:grid-cols-2">
          <div className="py-8 lg:border-r lg:border-line lg:pr-10">
            <h2 className="text-3xl text-fg">Book your stay directly with us.</h2>
            <p className="mt-2 text-fg-muted">Get in touch</p>
            <div className="mt-6 space-y-3 text-lg"><a href={telHref} className="block text-emerald hover:underline">Call: {phone}</a><a href={`mailto:${email}`} className="block text-emerald hover:underline">Email: {email}</a></div>
          </div>
          <div className="py-8 lg:pl-10">
            <h2 className="text-3xl text-fg">Prefer to book online?</h2>
            <p className="mt-3 max-w-xl text-lg leading-8 text-fg-muted">Compare rates and availability on our booking partners.</p>
            <Link href="/booking-options" className="mt-6 inline-flex bg-forest px-5 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:bg-emerald">View Booking Options →</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl 4xl:max-w-[90rem] px-5 pb-20 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald">Discover our rooms</p>
        <div className="mt-8 grid gap-8">
          {rooms.map((room) => (
            <article id={room.slug} key={room.name} className="scroll-mt-28 grid overflow-hidden border border-line bg-surface lg:grid-cols-2">
              <RoomImageCarousel images={room.images} roomName={room.name} />
              <div className="p-6 sm:p-9 lg:p-10">
                <h2 className="text-4xl text-fg sm:text-5xl">{room.name}</h2>
                <p className="mt-4 text-base leading-8 text-fg-muted">{room.description}</p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">{room.amenities.map((amenity) => <RoomFeatureIcon key={amenity} label={amenity} />)}</div>
                <Link href="/contact" className="mt-8 inline-flex border border-forest px-5 py-3 text-xs uppercase tracking-[0.24em] text-forest transition hover:bg-forest hover:text-white dark:border-fresh dark:text-fresh">Book Now</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}