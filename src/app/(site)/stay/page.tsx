import Link from "next/link";
import { StayBookingFlow, type BookingRoom } from "@/components/stay-booking-flow";
import { RoomImageCarousel } from "@/components/room-image-carousel";
import { getRooms } from "@/lib/sanity-content";

export default async function StayPage() {
  const rooms = await getRooms();
  const bookingRooms: BookingRoom[] = rooms.map((room) => ({
    name: room.name,
    description: room.description,
    amenities: room.amenities,
    nightlyRate: room.nightlyRate,
    capacity: room.capacity,
  }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Stay</p>
        <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Rooms & Suites in Kolhapur</h1>
        <p className="mt-5 text-base leading-8 text-fg-muted sm:text-lg">
          Stay at The Pavillion Hotel in Shahupuri, Kolhapur with comfortable accommodation for business travellers, families, and leisure guests.
        </p>
      </header>

      <div className="mt-10 sm:mt-12">
        <StayBookingFlow rooms={bookingRooms} />
      </div>

      <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8">
        {rooms.map((room) => (
          <section key={room.name} className="grid gap-0 overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_20px_60px_rgba(20,38,30,0.08)] lg:grid-cols-[1fr_1fr]">
            <RoomImageCarousel images={room.images} roomName={room.name} />
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Category</p>
              <h2 className="mt-2 text-3xl text-fg sm:text-4xl">{room.name}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-fg-muted">{room.description}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-fg/70 sm:gap-3">
                {room.details.map((detail) => (
                  <span key={detail} className="rounded-full bg-surface-2 px-3 py-2">{detail}</span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span key={amenity} className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-fg/75">
                    {amenity}
                  </span>
                ))}
              </div>
              <Link href="/contact" className="mt-7 inline-flex rounded-full bg-forest px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:bg-gold sm:mt-8">
                Book Now
              </Link>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}