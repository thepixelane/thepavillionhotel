"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HotelIcon, ImagesIcon, LocationPinIcon } from "@/components/action-icons";
import type { ContentImage } from "@/lib/site-data";

type HomeHeroProps = {
  images: ContentImage[];
  bookingUrl: string;
  mapsUrl: string;
  locationLabel: string;
  fromPrice: number | null;
};

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function HomeHero({ images, bookingUrl, mapsUrl, locationLabel, fromPrice }: HomeHeroProps) {
  const slides = images.slice(0, 2);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const priceLabel = fromPrice ? `${priceFormatter.format(fromPrice)} / night` : "See our rooms";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="The Pavillion Hotel"
      className="relative isolate min-h-[100svh] overflow-hidden bg-forest-deep text-white"
    >
      {slides.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${index === active ? "opacity-85" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/45" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl 4xl:max-w-[90rem] flex-col items-start justify-end px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20">
        <p className="text-[10px] uppercase tracking-[0.42em] text-white/85 sm:text-[11px] sm:tracking-[0.5em]">
          Kolhapur · Boutique Hotel · Since 1995
        </p>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] text-white sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl 4xl:text-8xl">
          Nestled in nature, a stay worth remembering.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:mt-6 sm:text-lg sm:leading-8">
          Portuguese-style rooms, three restaurants, and garden venues for weddings &mdash; opposite
          Kolhapur Railway Station, minutes from Rankala Lake.
        </p>

        <ul className="mt-8 grid w-full max-w-3xl gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          <li>
            <Link
              href="/stay"
              className="group flex h-full items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-md transition hover:border-gold hover:bg-white/15 focus-visible:border-gold"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-gold transition group-hover:bg-white/20">
                <HotelIcon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.28em] text-white/70">Rooms from</span>
                <span className="block truncate text-sm font-medium text-white sm:text-base">{priceLabel}</span>
              </span>
            </Link>
          </li>
          <li>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-md transition hover:border-gold hover:bg-white/15 focus-visible:border-gold"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-gold transition group-hover:bg-white/20">
                <LocationPinIcon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.28em] text-white/70">Where we are</span>
                <span className="block truncate text-sm font-medium text-white sm:text-base">{locationLabel}</span>
              </span>
            </a>
          </li>
          <li>
            <Link
              href="/gallery"
              className="group flex h-full items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-4 py-3 backdrop-blur-md transition hover:border-gold hover:bg-white/15 focus-visible:border-gold"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 text-gold transition group-hover:bg-white/20">
                <ImagesIcon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.28em] text-white/70">Photo tour</span>
                <span className="block truncate text-sm font-medium text-white sm:text-base">Explore the property</span>
              </span>
            </Link>
          </li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.3em] text-forest-deep transition hover:bg-gold hover:text-offwhite"
          >
            Book Direct
          </a>
          <Link
            href="/stay"
            className="inline-flex items-center justify-center rounded-full border border-white/50 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.3em] text-white transition hover:border-white hover:bg-white/10"
          >
            View rooms
          </Link>
        </div>
      </div>
    </section>
  );
}
