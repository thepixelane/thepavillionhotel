"use client";

import Image from "next/image";
import { useState } from "react";
import type { ContentImage } from "@/lib/site-data";

export function DiningGallery({ images, name }: { images: ContentImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const move = (direction: number) => setActive((current) => (current + direction + images.length) % images.length);
  const image = images[active];
  if (!image) return <div className="min-h-72 bg-forest-deep" />;

  return (
    <div className="relative min-h-72 overflow-hidden bg-forest-deep sm:min-h-96">
      <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      {images.length > 1 ? <div className="absolute bottom-4 right-4 flex gap-2"><button type="button" onClick={() => move(-1)} aria-label={`Previous ${name} photograph`} className="grid h-10 w-10 place-items-center bg-white text-forest">←</button><button type="button" onClick={() => move(1)} aria-label={`Next ${name} photograph`} className="grid h-10 w-10 place-items-center bg-white text-forest">→</button></div> : null}
    </div>
  );
}