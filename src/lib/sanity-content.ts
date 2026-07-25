import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  diningVenues as staticDiningVenues,
  galleryImages as staticGalleryImages,
  rooms as staticRooms,
  venues as staticVenues,
} from "@/lib/site-data";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type SiteSettings = {
  siteName?: string;
  tagline?: string;
  description?: string;
  bookingEngineUrl?: string;
  contactPhone?: string;
  contactPhoneAlt?: string;
  contactEmail?: string;
  whatsappNumber?: string;
  address?: string;
  googleMapsUrl?: string;
  instagramUrl?: string;
  tripAdvisorUrl?: string;
  heroImage?: SanityImage | null;
};

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
};

export type Room = {
  name: string;
  description: string;
  details: string[];
  amenities: string[];
  nightlyRate?: number;
  capacity?: number;
  images: string[];
  imageAlts: string[];
};

export type Venue = {
  name: string;
  capacity?: string;
  description: string;
  suitableFor: string[];
  facilities: string[];
  image: string;
  imageAlt: string;
};

export type DiningVenue = {
  name: string;
  intro: string;
  timing?: string;
  dishes: string[];
  image: string;
  imageAlt: string;
};

export type GalleryImage = {
  category: string;
  caption: string;
  src: string;
  alt: string;
};

/* -------------------------------------------------------------------------- */
/*  GROQ queries                                                              */
/* -------------------------------------------------------------------------- */

const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  description,
  bookingEngineUrl,
  contactPhone,
  contactPhoneAlt,
  contactEmail,
  whatsappNumber,
  address,
  googleMapsUrl,
  instagramUrl,
  tripAdvisorUrl,
  heroImage
}`;

const roomsQuery = groq`*[_type == "room"] | order(order asc, name asc){
  "name": name,
  "description": description,
  "details": coalesce(details, []),
  "amenities": coalesce(amenities, []),
  nightlyRate,
  capacity,
  "images": images[]{ asset, alt, hotspot, crop }
}`;

const venuesQuery = groq`*[_type == "venue"] | order(order asc, name asc){
  name,
  capacity,
  description,
  "suitableFor": coalesce(suitableFor, []),
  "facilities": coalesce(facilities, []),
  image
}`;

const diningQuery = groq`*[_type == "diningVenue"] | order(order asc, name asc){
  name,
  intro,
  timing,
  "dishes": coalesce(dishes, []),
  image
}`;

const galleryQuery = groq`*[_type == "galleryImage"] | order(order asc, _createdAt asc){
  category,
  caption,
  image
}`;

/* -------------------------------------------------------------------------- */
/*  Fetch helpers                                                             */
/* -------------------------------------------------------------------------- */

// One hour of ISR by default so editors see fresh content quickly without
// hammering the Sanity API on every request.
const REVALIDATE = 60 * 60;

async function safeFetch<T>(query: string): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, {}, { next: { revalidate: REVALIDATE } });
  } catch (error) {
    console.warn("[sanity] fetch failed, falling back to static data:", error);
    return null;
  }
}

function imageUrl(source: SanityImageSource | undefined, width = 1600): string | null {
  if (!source) return null;
  try {
    return urlFor(source).width(width).quality(80).auto("format").url();
  } catch {
    return null;
  }
}

function altOf(source: unknown): string {
  return (source as { alt?: string } | undefined)?.alt ?? "";
}

/* -------------------------------------------------------------------------- */
/*  Public getters (Sanity first, static fallback)                            */
/* -------------------------------------------------------------------------- */

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch<SiteSettings>(siteSettingsQuery);
}

export async function getRooms(): Promise<Room[]> {
  type Raw = {
    name: string;
    description: string;
    details?: string[];
    amenities?: string[];
    nightlyRate?: number;
    capacity?: number;
    images?: (SanityImage & { alt?: string })[];
  };
  const data = await safeFetch<Raw[]>(roomsQuery);
  if (!data || data.length === 0) {
    return staticRooms.map((room) => ({
      name: room.name,
      description: room.description,
      details: [...room.details],
      amenities: [...room.amenities],
      nightlyRate: room.nightlyRate,
      images: [...room.images],
      imageAlts: room.images.map(() => room.name),
    }));
  }
  return data.map((room) => ({
    name: room.name,
    description: room.description,
    details: room.details ?? [],
    amenities: room.amenities ?? [],
    nightlyRate: room.nightlyRate,
    capacity: room.capacity,
    images:
      (room.images ?? [])
        .map((img) => imageUrl(img, 1400))
        .filter((url): url is string => Boolean(url)),
    imageAlts: (room.images ?? []).map((img) => img.alt ?? room.name),
  }));
}

export async function getVenues(): Promise<Venue[]> {
  type Raw = {
    name: string;
    capacity?: string;
    description: string;
    suitableFor?: string[];
    facilities?: string[];
    image?: SanityImage & { alt?: string };
  };
  const data = await safeFetch<Raw[]>(venuesQuery);
  if (!data || data.length === 0) {
    return staticVenues.map((venue) => ({
      name: venue.name,
      capacity: venue.capacity,
      description: venue.description,
      suitableFor: [...venue.suitableFor],
      facilities: [...venue.facilities],
      image: venue.image,
      imageAlt: venue.name,
    }));
  }
  return data.map((venue) => ({
    name: venue.name,
    capacity: venue.capacity,
    description: venue.description,
    suitableFor: venue.suitableFor ?? [],
    facilities: venue.facilities ?? [],
    image: imageUrl(venue.image, 1400) ?? "",
    imageAlt: altOf(venue.image) || venue.name,
  }));
}

export async function getDiningVenues(): Promise<DiningVenue[]> {
  type Raw = {
    name: string;
    intro: string;
    timing?: string;
    dishes?: string[];
    image?: SanityImage & { alt?: string };
  };
  const data = await safeFetch<Raw[]>(diningQuery);
  if (!data || data.length === 0) {
    return staticDiningVenues.map((place) => ({
      name: place.name,
      intro: place.intro,
      timing: place.timing,
      dishes: [...place.dishes],
      image: place.image,
      imageAlt: place.name,
    }));
  }
  return data.map((place) => ({
    name: place.name,
    intro: place.intro,
    timing: place.timing,
    dishes: place.dishes ?? [],
    image: imageUrl(place.image, 1400) ?? "",
    imageAlt: altOf(place.image) || place.name,
  }));
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  type Raw = {
    category: string;
    caption: string;
    image?: SanityImage & { alt?: string };
  };
  const data = await safeFetch<Raw[]>(galleryQuery);
  if (!data || data.length === 0) {
    return staticGalleryImages.map((image) => ({ ...image }));
  }
  return data.map((entry) => ({
    category: entry.category,
    caption: entry.caption,
    src: imageUrl(entry.image, 1600) ?? "",
    alt: altOf(entry.image) || entry.caption,
  }));
}

export function heroImageUrl(settings: SiteSettings | null): string | null {
  return settings?.heroImage ? imageUrl(settings.heroImage, 1800) : null;
}
