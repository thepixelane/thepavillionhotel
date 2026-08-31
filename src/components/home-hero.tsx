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
    <section aria-roledescription="carousel" aria-label="The Pavillion Hotel" className="relative isolate min-h-[78svh] overflow-hidden bg-forest-deep text-white lg:min-h-[88svh]">
      {slides.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${index === active ? "opacity-75" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-black/15" />
      <div className="relative mx-auto flex min-h-[78svh] max-w-7xl 4xl:max-w-[90rem] items-end px-5 pb-16 pt-24 sm:px-8 lg:min-h-[88svh] lg:px-12 lg:pb-20">
        <p className="font-serif text-4xl text-white sm:text-5xl 4xl:text-6xl">Since 1995</p>
      </div>
    </section>
  );
}
