"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ContentImage } from "@/lib/site-data";

export function MenuLightbox({ pages, restaurant, pdf }: { pages: ContentImage[]; restaurant: string; pdf?: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [scale, setScale] = useState(1);
  const touchStart = useRef<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = () => { setOpen(false); setScale(1); window.setTimeout(() => trigger.current?.focus(), 0); };
  const move = (direction: number) => { setActive((current) => (current + direction + pages.length) % pages.length); setScale(1); };

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    document.body.style.overflow = "hidden";
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", keydown); };
  });

  if (pages.length === 0 && !pdf) return <span className="inline-flex border border-line px-5 py-3 text-xs uppercase tracking-[0.22em] text-fg-muted" aria-disabled="true">Menu images coming soon</span>;
  const page = pages[active];

  return (
    <>
      <button ref={trigger} type="button" onClick={() => setOpen(true)} className="bg-forest px-5 py-3 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-emerald">View Menu</button>
      {open ? (
        <div role="dialog" aria-modal="true" aria-label={`${restaurant} menu`} className="fixed inset-0 z-70 flex flex-col bg-charcoal text-white">
          <div className="flex min-h-16 items-center justify-between gap-4 border-b border-white/15 px-4 py-3 sm:px-6">
            <p className="truncate font-serif text-xl">{restaurant}{pdf ? null : <span className="ml-2 font-sans text-xs text-white/60">{active + 1} / {pages.length}</span>}</p>
            <div className="flex items-center gap-2">{pdf ? <a href={pdf} target="_blank" rel="noopener noreferrer" className="hidden h-10 items-center border border-white/30 px-4 text-xs uppercase tracking-[0.18em] sm:inline-flex">Open PDF</a> : <><button type="button" onClick={() => setScale((value) => Math.max(1, value - 0.25))} aria-label="Zoom out" className="grid h-10 w-10 place-items-center border border-white/30">−</button><button type="button" onClick={() => setScale((value) => Math.min(3, value + 0.25))} aria-label="Zoom in" className="grid h-10 w-10 place-items-center border border-white/30">+</button></>}<button ref={closeButton} type="button" onClick={close} className="h-10 border border-white px-4 text-xs uppercase tracking-[0.18em]">Close</button></div>
          </div>
          {pdf ? <div className="flex flex-1 items-center justify-center p-3 sm:p-6"><iframe src={pdf} title={`${restaurant} menu PDF`} className="h-full min-h-[75svh] w-full max-w-6xl bg-white" /></div> : <div className="relative flex-1 overflow-auto" onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientX; if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 50) move(end < touchStart.current ? 1 : -1); touchStart.current = null; }}>
            <div className="relative mx-auto h-full min-h-[70svh] w-full origin-top transition-transform" style={{ transform: `scale(${scale})` }}><Image src={page.src} alt={page.alt} fill sizes="100vw" className="object-contain" /></div>
            {pages.length > 1 ? <><button type="button" onClick={() => move(-1)} aria-label="Previous menu page" className="fixed left-3 top-1/2 grid h-12 w-12 place-items-center bg-white text-forest shadow-lg">←</button><button type="button" onClick={() => move(1)} aria-label="Next menu page" className="fixed right-3 top-1/2 grid h-12 w-12 place-items-center bg-white text-forest shadow-lg">→</button></> : null}
          </div>}
        </div>
      ) : null}
    </>
  );
}