import Image from "next/image";
import Link from "next/link";
import { diningVenues } from "@/lib/site-data";

export default function DiningPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Dining</p>
      <h1 className="mt-4 text-5xl text-forest-deep sm:text-6xl">Dining Experiences</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
        Two relaxed destinations: Pakhtoon for signature cuisine and Areca Café for all-day dining.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {diningVenues.map((place) => (
          <article key={place.name} className="overflow-hidden bg-offwhite shadow-[0_20px_60px_rgba(20,38,30,0.08)]">
            <div className="relative h-[28rem]">
              <Image src={place.image} alt={place.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="p-7">
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Signature Dining</p>
              <h2 className="mt-2 text-3xl text-forest-deep">{place.name}</h2>
              <p className="mt-4 text-sm leading-7 text-stone-600">{place.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-600">
                <span className="rounded-full bg-beige px-4 py-2">{place.timing}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {place.dishes.map((dish) => (
                  <span key={dish} className="rounded-full border border-beige px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-forest-deep/75">
                    {dish}
                  </span>
                ))}
              </div>
              <Link href="tel:+919607323737" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-full bg-forest px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:bg-gold">
                Reserve a Table
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}