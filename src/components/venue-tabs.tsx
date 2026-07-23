"use client";

import Image from "next/image";
import { useState } from "react";

export type Venue = {
  name: string;
  capacity: string;
  description: string;
  suitableFor: readonly string[];
  facilities: readonly string[];
  image: string;
};

type VenueTabsProps = {
  venues: readonly Venue[];
};

export function VenueTabs({ venues }: VenueTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVenue = venues[activeIndex];

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto border-b border-offwhite/15 pb-4">
        {venues.map((venue, index) => (
          <button
            key={venue.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`shrink-0 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition ${
              index === activeIndex
                ? "bg-gold text-forest-deep"
                : "border border-offwhite/15 text-offwhite/70 hover:text-offwhite"
            }`}
          >
            {venue.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 rounded-[2rem] bg-offwhite p-6 text-forest-deep shadow-[0_20px_60px_rgba(20,38,30,0.08)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-8">
        <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem]">
          <Image src={activeVenue.image} alt={activeVenue.name} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Venue</p>
          <h3 className="mt-3 text-4xl text-forest-deep">{activeVenue.name}</h3>
          <p className="mt-3 text-sm uppercase tracking-[0.3em] text-olive">{activeVenue.capacity}</p>
          <p className="mt-6 text-base leading-8 text-stone-600">{activeVenue.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-beige bg-beige/50 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Suitable For</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeVenue.suitableFor.map((item) => (
                  <span key={item} className="rounded-full bg-offwhite px-3 py-1 text-xs text-forest-deep border border-beige">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-beige bg-beige/50 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Facilities</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeVenue.facilities.map((item) => (
                  <span key={item} className="rounded-full bg-offwhite px-3 py-1 text-xs text-forest-deep border border-beige">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex rounded-full bg-forest px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:bg-gold hover:text-offwhite"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </div>
  );
}