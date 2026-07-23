import Link from "next/link";
import { StayBookingFlow } from "@/components/stay-booking-flow";
import { RoomImageCarousel } from "@/components/room-image-carousel";
import { rooms } from "@/lib/site-data";

export default function StayPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Stay</p>
      <h1 className="mt-4 text-5xl text-forest-deep sm:text-6xl">Rooms & Suites</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
        Three room categories, each crafted for calm, natural light, and easy booking.
      </p>

      <div className="mt-12">
        <StayBookingFlow />
      </div>

      <div className="mt-12 grid gap-8">
        {rooms.map((room) => (
          <section key={room.name} className="grid gap-0 overflow-hidden bg-offwhite shadow-[0_20px_60px_rgba(20,38,30,0.08)] lg:grid-cols-[1fr_1fr]">
            <RoomImageCarousel images={room.images} roomName={room.name} />
            <div className="p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Category</p>
              <h2 className="mt-2 text-4xl text-forest-deep">{room.name}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">{room.description}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.2em] text-forest-deep/70">
                {room.details.map((detail) => (
                  <span key={detail} className="rounded-full bg-beige px-3 py-2">{detail}</span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span key={amenity} className="rounded-full border border-beige px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-forest-deep/75">
                    {amenity}
                  </span>
                ))}
              </div>
              <Link href="/contact" className="mt-8 inline-flex rounded-full bg-forest px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:bg-gold">
                Book Now
              </Link>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}