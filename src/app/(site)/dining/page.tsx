import Image from "next/image";
import Link from "next/link";
import { getDiningVenues, getSiteSettings } from "@/lib/sanity-content";

export default async function DiningPage() {
  const [diningVenues, settings] = await Promise.all([
    getDiningVenues(),
    getSiteSettings(),
  ]);

  const phone = settings?.contactPhone ?? "+919607323737";
  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Dining</p>
        <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Dining at The Pavillion</h1>
        <p className="mt-5 text-base leading-8 text-fg-muted sm:text-lg">
          The Pavillion Hotel offers relaxed dining in Kolhapur with Pakhtoon Restaurant and WalkaWay Restaurant &amp; Cafe for guests, families, and visitors.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2">
        {diningVenues.map((place) => (
          <article key={place.name} className="group overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_20px_60px_rgba(20,38,30,0.08)] transition hover:-translate-y-1 hover:border-gold/50">
            <div className="relative h-64 sm:h-80 lg:h-112">
              {place.image ? (
                <Image src={place.image} alt={place.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              ) : null}
            </div>
            <div className="p-6 sm:p-7">
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Signature Dining</p>
              <h2 className="mt-2 text-2xl text-fg sm:text-3xl">{place.name}</h2>
              <p className="mt-4 text-sm leading-7 text-fg-muted">{place.intro}</p>
              {place.timing ? (
                <div className="mt-5 flex flex-wrap gap-2 text-sm text-fg-muted sm:mt-6 sm:gap-3">
                  <span className="rounded-full bg-surface-2 px-4 py-2">{place.timing}</span>
                </div>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {place.dishes.map((dish) => (
                  <span key={dish} className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-fg/75">
                    {dish}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                {place.menuUrl ? (
                  <a
                    href={place.menuUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full bg-forest px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:bg-gold"
                  >
                    View Menu
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex cursor-not-allowed select-none rounded-full border border-line/80 bg-line/30 px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-fg/40 blur-[0.3px] opacity-80"
                  >
                    View Menu
                  </span>
                )}
                <Link href={telHref} className="inline-flex rounded-full border border-line px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-fg transition hover:border-gold hover:text-gold">
                  Call for Booking
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}