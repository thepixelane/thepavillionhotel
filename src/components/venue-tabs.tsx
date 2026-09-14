"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

export type Venue = {
  name: string;
  capacity: string;
  description: string;
  suitableFor: readonly string[];
  facilities: readonly string[];
  image: string;
  images: readonly string[];
};

type VenueTabsProps = {
  venues: readonly Venue[];
};

export function VenueTabs({ venues }: VenueTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeVenue = venues[activeIndex] ?? venues[0];

  if (!activeVenue) {
    return (
      <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-fg-muted">
        Venue details will appear here soon.
      </p>
    );
  }

  const venueImages = activeVenue.images.length > 0 ? activeVenue.images : [activeVenue.image];
  const activeImage = venueImages[activeImageIndex] ?? venueImages[0] ?? activeVenue.image;
  const moveImage = useCallback((direction: number) => {
    setActiveImageIndex((current) => (current + direction + venueImages.length) % venueImages.length);
  }, [venueImages.length]);
  const selectVenue = (index: number) => {
    setActiveIndex(index);
    setActiveImageIndex(0);
  };

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto scroll-smooth border-b border-line pb-4 [scroll-snap-type:x_mandatory] [-webkit-overflow-scrolling:touch]">
        {venues.map((venue, index) => (
          <button
            key={venue.name}
            type="button"
            onClick={() => selectVenue(index)}
            className={`shrink-0 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition [scroll-snap-align:center] ${
              index === activeIndex
                ? "bg-terracotta text-white"
                : "border border-line text-fg/70 hover:text-fg"
            }`}
          >
            {venue.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 rounded-4xl border border-line bg-surface p-6 text-fg shadow-[0_20px_60px_rgba(20,38,30,0.08)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-8">
        <div className="relative min-h-88 overflow-hidden rounded-4xl">
          <Image src={activeImage} alt={`${activeVenue.name} image ${activeImageIndex + 1} of ${venueImages.length}`} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
          {venueImages.length > 1 ? (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-forest-deep/85 to-transparent p-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-offwhite/80" aria-live="polite">
                {activeImageIndex + 1} / {venueImages.length}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => moveImage(-1)} aria-label={`Previous image for ${activeVenue.name}`} className="image-nav-button">←</button>
                <button type="button" onClick={() => moveImage(1)} aria-label={`Next image for ${activeVenue.name}`} className="image-nav-button">→</button>
              </div>
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Venue</p>
          <h3 className="mt-3 text-4xl text-fg">{activeVenue.name}</h3>
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-olive">{activeVenue.capacity}</p>
          <p className="mt-6 text-base leading-8 text-fg-muted">{activeVenue.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface-2 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Suitable For</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeVenue.suitableFor.map((item) => (
                  <span key={item} className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-fg">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface-2 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Facilities</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeVenue.facilities.map((item) => (
                  <span key={item} className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-fg">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#contact"
            className="mt-7 inline-flex rounded-full bg-forest px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:bg-gold hover:text-offwhite"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </div>
  );
}