const FALLBACK_BOOKING_URL = "https://www.hotelpavillion.co.in/";

export function sanitizeBookingUrl(candidate: string | undefined | null): string {
  if (!candidate) return FALLBACK_BOOKING_URL;
  const trimmed = candidate.trim();
  if (!trimmed) return FALLBACK_BOOKING_URL;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return FALLBACK_BOOKING_URL;
    }
    return parsed.toString();
  } catch {
    return FALLBACK_BOOKING_URL;
  }
}

export const bookingEngineUrl: string = sanitizeBookingUrl(process.env.BOOKING_ENGINE_URL);
