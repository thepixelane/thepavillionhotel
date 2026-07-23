"use client";

import { useMemo, useState } from "react";
import { rooms } from "@/lib/site-data";

type BookingStep = "details" | "availability" | "review";

type RoomName = (typeof rooms)[number]["name"];

type BookingState = {
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  roomType: RoomName | "";
  specialRequests: string;
};

const initialState: BookingState = {
  checkIn: "",
  checkOut: "",
  adults: "2",
  children: "0",
  roomType: "",
  specialRequests: "",
};

const inventory = {
  "Deluxe Room": 4,
  "Executive Room": 3,
  "The Suite": 2,
} as const;

function getGuestCount(adults: string, children: string) {
  return Number(adults) + Number(children);
}

function getNightCount(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) {
    return 1;
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return Number.isFinite(nights) && nights > 0 ? nights : 1;
}

function getRecommendedRooms(guestCount: number) {
  return rooms
    .map((room) => {
      const capacity =
        room.name === "The Suite"
          ? 4
          : room.name === "Executive Room"
            ? 3
            : 2;

      const baseAvailable = inventory[room.name];
      const fitsGuests = guestCount <= capacity;
      const availableCount = fitsGuests ? baseAvailable : Math.max(0, baseAvailable - 1);

      return {
        ...room,
        capacity,
        nightlyRate: room.nightlyRate,
        availableCount,
        isAvailable: availableCount > 0,
        fitsGuests,
      };
    })
    .filter((room) => room.isAvailable);
}

export function StayBookingFlow() {
  const [step, setStep] = useState<BookingStep>("details");
  const [formState, setFormState] = useState<BookingState>(initialState);
  const [requestedRoom, setRequestedRoom] = useState<RoomName | "">("");
  const [submitted, setSubmitted] = useState(false);

  const guestCount = getGuestCount(formState.adults, formState.children);
  const nightCount = getNightCount(formState.checkIn, formState.checkOut);

  const availableRooms = useMemo(() => {
    if (step === "details") {
      return [];
    }

    return getRecommendedRooms(guestCount);
  }, [guestCount, step]);

  const selectedRoom = useMemo(
    () => availableRooms.find((room) => room.name === requestedRoom) ?? null,
    [availableRooms, requestedRoom],
  );

  const stepItems = [
    { label: "1. Stay Details", active: step === "details" || step === "availability" || step === "review" },
    { label: "2. Availability & Pricing", active: step === "availability" || step === "review" },
    { label: "3. Review", active: step === "review" },
  ] as const;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleFetchAvailability = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.checkIn || !formState.checkOut) {
      return;
    }

    setStep("availability");
    setRequestedRoom("");
    setSubmitted(false);
  };

  const handleRoomSelection = (roomName: RoomName) => {
    setRequestedRoom(roomName);
    setFormState((current) => ({
      ...current,
      roomType: roomName,
    }));
    setStep("review");
  };

  const handleFinalizeBooking = () => {
    setSubmitted(true);
  };

  const resetFlow = () => {
    setStep("details");
    setRequestedRoom("");
    setSubmitted(false);
    setFormState(initialState);
  };

  return (
    <section className="rounded-[2rem] bg-forest-deep p-7 text-offwhite shadow-[0_20px_60px_rgba(20,38,30,0.18)] lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold/90">Book Your Stay</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Booking flow</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-offwhite/75">
            Enter your dates and guest count, view room availability with pricing, select a room, and add any special request.
          </p>
        </div>

        <button
          type="button"
          onClick={resetFlow}
          className="rounded-full border border-offwhite/20 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:border-gold hover:text-gold"
        >
          Reset
        </button>
      </div>

      <div className="mt-8 grid gap-3 text-[11px] uppercase tracking-[0.3em] sm:grid-cols-3">
        {stepItems.map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl border px-4 py-3 ${item.active ? "border-gold bg-white/5 text-gold" : "border-offwhite/10 text-offwhite/45"}`}
          >
            {item.label}
          </div>
        ))}
      </div>

      {step === "details" ? (
        <form className="mt-8 grid gap-4 lg:grid-cols-2" onSubmit={handleFetchAvailability}>
          <label className="grid gap-2 text-[11px] uppercase tracking-[0.3em] text-gold/90">
            Check-in
            <input
              type="date"
              name="checkIn"
              value={formState.checkIn}
              onChange={handleChange}
              required
              className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold"
            />
          </label>

          <label className="grid gap-2 text-[11px] uppercase tracking-[0.3em] text-gold/90">
            Check-out
            <input
              type="date"
              name="checkOut"
              value={formState.checkOut}
              onChange={handleChange}
              required
              className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold"
            />
          </label>

          <label className="grid gap-2 text-[11px] uppercase tracking-[0.3em] text-gold/90">
            Adults
            <select
              name="adults"
              value={formState.adults}
              onChange={handleChange}
              className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold"
            >
              {Array.from({ length: 6 }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count} className="text-forest-deep">
                  {count}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-[11px] uppercase tracking-[0.3em] text-gold/90">
            Children
            <select
              name="children"
              value={formState.children}
              onChange={handleChange}
              className="rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold"
            >
              {Array.from({ length: 5 }, (_, index) => index).map((count) => (
                <option key={count} value={count} className="text-forest-deep">
                  {count}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
            <button
              type="submit"
              className="inline-flex rounded-full bg-offwhite px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-forest-deep transition hover:bg-gold hover:text-offwhite"
            >
              Fetch Availability
            </button>
            <p className="text-xs text-offwhite/60">
              Rooms are filtered in the booking flow based on your guest count.
            </p>
          </div>
        </form>
      ) : null}

      {step !== "details" ? (
        <div className="mt-8 rounded-[2rem] bg-white/5 p-6">
          <div className="grid gap-3 text-sm text-offwhite/80 sm:grid-cols-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">Dates</p>
              <p className="mt-2">{formState.checkIn || "Check-in not set"}</p>
              <p>{formState.checkOut || "Check-out not set"}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">Guests</p>
              <p className="mt-2">{guestCount} total guests</p>
              <p>{formState.adults} adults, {formState.children} children</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">Selected Room</p>
              <p className="mt-2">{requestedRoom || "None selected yet"}</p>
            </div>
          </div>
        </div>
      ) : null}

      {step !== "details" ? (
        <div className="mt-8">
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold/90">Availability</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {availableRooms.map((room) => (
              <button
                key={room.name}
                type="button"
                onClick={() => handleRoomSelection(room.name)}
                className={`rounded-[1.75rem] border p-5 text-left transition ${
                  requestedRoom === room.name
                    ? "border-gold bg-white/10"
                    : "border-offwhite/10 bg-white/5 hover:border-gold/60 hover:bg-white/8"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl text-offwhite">{room.name}</h3>
                    <p className="mt-2 text-sm text-offwhite/70">Fits up to {room.capacity} guests</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em]">
                  <span className="rounded-full bg-gold/15 px-3 py-1 text-gold">
                    {room.availableCount} available
                  </span>
                  <span className="rounded-full bg-white/8 px-3 py-1 text-offwhite/80">
                    ₹{room.nightlyRate.toLocaleString("en-IN")} / night
                  </span>
                  <span className="rounded-full bg-white/8 px-3 py-1 text-offwhite/80">
                    Est. ₹{(room.nightlyRate * nightCount).toLocaleString("en-IN")} total
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-offwhite/70">{room.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span key={amenity} className="rounded-full bg-white/8 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-offwhite/75">
                      {amenity}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === "review" && selectedRoom ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[1.75rem] bg-white/5 p-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold/90">Add Request</p>
            <label className="mt-4 grid gap-2 text-[11px] uppercase tracking-[0.3em] text-gold/90">
              Special requests
              <textarea
                name="specialRequests"
                value={formState.specialRequests}
                onChange={handleChange}
                placeholder="Arrival time, bed preference, or any special note"
                className="min-h-32 rounded-2xl border border-offwhite/10 bg-white/5 px-4 py-3 text-sm text-offwhite outline-none placeholder:text-offwhite/40 focus:border-gold"
              />
            </label>

            <button
              type="button"
              onClick={handleFinalizeBooking}
              className="mt-6 inline-flex rounded-full bg-offwhite px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-forest-deep transition hover:bg-gold hover:text-offwhite"
            >
              Continue to Booking Summary
            </button>
          </div>

          <aside className="rounded-[1.75rem] border border-offwhite/10 bg-white/5 p-6">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold/90">Booking Summary</p>
            <h3 className="mt-3 text-3xl text-offwhite">{selectedRoom.name}</h3>
            <div className="mt-4 space-y-3 text-sm text-offwhite/75">
              <p>{formState.checkIn} to {formState.checkOut}</p>
              <p>{guestCount} guests total · {nightCount} night{nightCount > 1 ? "s" : ""}</p>
              <p>₹{selectedRoom.nightlyRate.toLocaleString("en-IN")} per night</p>
              <p className="text-gold/90">Estimated total: ₹{(selectedRoom.nightlyRate * nightCount).toLocaleString("en-IN")}</p>
              <p>{formState.specialRequests || "No special requests added"}</p>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm text-gold/90">
                Booking summary saved. Connect this flow to a booking engine when the final URL is ready.
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setStep("availability")}
              className="mt-6 inline-flex rounded-full border border-offwhite/20 px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-offwhite transition hover:border-gold hover:text-gold"
            >
              Change Room
            </button>
          </aside>
        </div>
      ) : null}
    </section>
  );
}