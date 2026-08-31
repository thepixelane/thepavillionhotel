"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { GalleryImage } from "@/lib/sanity-content";

export function PropertyGalleryPreview({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const slides = images.length > 0 ? images : [];
  const move = (direction: number) => setActive((current) => (current + direction + slides.length) % slides.length);

  if (slides.length === 0) return null;
  const image = slides[active];
  if (!image) return null;

  return (
    <div className="relative min-h-96 overflow-hidden bg-forest-deep sm:min-h-120">
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/70 to-transparent p-5 text-white sm:p-7">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/75">Property gallery</p>
          <p className="mt-2 font-serif text-2xl">{image.caption}</p>
          <Link href="/gallery" className="mt-3 inline-block text-xs uppercase tracking-[0.2em] underline-offset-4 hover:underline">View gallery</Link>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} aria-label="Previous gallery image" className="grid h-11 w-11 place-items-center border border-white/60 bg-black/20 text-lg">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next gallery image" className="grid h-11 w-11 place-items-center border border-white/60 bg-black/20 text-lg">→</button>
        </div>
      </div>
    </div>
  );
}