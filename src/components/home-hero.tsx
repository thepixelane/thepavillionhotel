"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ContentImage } from "@/lib/site-data";

export function HomeHero({ images }: { images: ContentImage[] }) {
  const slides = images.slice(0, 2);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    // Matches the 3:2 source photos so the full frame shows without cropping.
    // From md up the hero slides under the sticky header so it starts flush at the top.
    <section aria-roledescription="carousel" aria-label="The Pavillion Hotel" className="relative isolate aspect-3/2 w-full overflow-hidden bg-forest-deep text-white md:-mt-22">
      {slides.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-contain transition-opacity duration-1000 ${index === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/10" />
      <div className="absolute inset-0 mx-auto flex max-w-7xl 4xl:max-w-360 items-end px-5 pb-6 sm:px-8 sm:pb-10 lg:px-12 lg:pb-16">
        <p className="font-serif text-2xl text-white drop-shadow-md sm:text-4xl lg:text-5xl 4xl:text-6xl">Since 1995</p>
      </div>
    </section>
  );
}
