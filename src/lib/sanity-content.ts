import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FALLBACK_IMAGES } from "@/lib/constants";
import { menus as staticMenus } from "@/lib/menus";
import {
  diningVenues as staticDiningVenues,
  galleryImages as staticGalleryImages,
  homeHighlight as staticHighlight,
  rooms as staticRooms,
  siteSettings as staticSiteSettings,
  venues as staticVenues,
  type ContentImage,
  type SiteSettings,
} from "@/lib/site-data";

type QueryParams = Record<string, unknown>;

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  hotspot?: unknown;
  crop?: unknown;
};

export type Room = {
  slug: string;
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
  menuUrl?: string;
  menuFile?: string;
  menuSlug?: string;
  dishes: string[];
  image: string;
  imageAlt: string;
  gallery: ContentImage[];
  menuPages: ContentImage[];
};

export type GalleryImage = {
  category: string;
  caption: string;
  src: string;
  alt: string;
};

export type Testimonial = {
  guestName: string;
  rating: number;
  review: string;
  source: "google" | "booking" | "direct";
  sourceUrl?: string;
  reviewDate?: string;
  featured: boolean;
  image?: string;
  imageAlt: string;
};

export type MenuDocument = {
  slug: string;
  title: string;
  /** Absolute Sanity CDN URL, or a /public path when falling back to a bundled PDF. */
  fileUrl: string | null;
};

export type Highlight = {
  title: string;
  description: string;
  ctaLabel: string;
};

/* -------------------------------------------------------------------------- */
/*  GROQ queries                                                              */
/* -------------------------------------------------------------------------- */

const menusQuery = groq`*[_type == "menu" && defined(slug.current)] | order(order asc, title asc){
  "slug": slug.current,
  title,
  "fileUrl": select(active != false => file.asset->url, null)
}`;

const menuBySlugQuery = groq`*[_type == "menu" && slug.current == $slug][0]{
  "slug": slug.current,
  title,
  "fileUrl": select(active != false => file.asset->url, null)
}`;

const highlightQuery = groq`*[_type == "highlight" && active != false] | order(order asc, _createdAt desc)[0]{
  title,
  description,
  ctaLabel
}`;

const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc, reviewDate desc)[0...6]{
  guestName,
  rating,
  review,
  source,
  sourceUrl,
  reviewDate,
  featured,
  guestImage
}`;

/* -------------------------------------------------------------------------- */
/*  Fetch helpers                                                             */
/* -------------------------------------------------------------------------- */

// One hour of ISR by default so editors see fresh content quickly without
// hammering the Sanity API on every request.
const REVALIDATE = 60 * 60;

async function safeFetch<T>(
  query: string,
  params: QueryParams = {},
  revalidate = REVALIDATE
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate } });
  } catch (error) {
    console.warn("[sanity] fetch failed, falling back to static data:", error);
    return null;
  }
}

function imageUrl(source: SanityImageSource | undefined, width = 1600): string | null {
  if (!source) return null;
  try {
    const resolved = urlFor(source).width(width).quality(80).auto("format").url();
    return resolved && resolved.trim().length > 0 ? resolved : null;
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

export async function getSiteSettings(): Promise<SiteSettings> {
  return staticSiteSettings;
}

export async function getRooms(): Promise<Room[]> {
  return staticRooms.map((room) => ({
    slug: room.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name: room.name,
    description: room.description,
    details: [...room.details],
    amenities: [...room.amenities],
    nightlyRate: room.nightlyRate,
    images: [...room.images],
    imageAlts: room.images.map(() => room.name),
  }));
}

export async function getVenues(): Promise<Venue[]> {
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

export async function getDiningVenues(): Promise<DiningVenue[]> {
  return staticDiningVenues.map((place) => ({
    name: place.name,
    intro: place.intro,
    timing: place.timing,
    menuUrl: place.menuUrl,
    menuSlug: place.menuSlug,
    dishes: [...place.dishes],
    image: place.image,
    imageAlt: place.name,
    gallery: place.gallery.map((src) => ({ src, alt: place.name })),
    menuPages: [],
  }));
}

export async function getHighlight(): Promise<Highlight> {
  const data = await safeFetch<Partial<Highlight> | null>(highlightQuery);
  return {
    title: data?.title?.trim() || staticHighlight.title,
    description: data?.description?.trim() || staticHighlight.description,
    ctaLabel: data?.ctaLabel?.trim() || staticHighlight.ctaLabel,
  };
}

export async function getMenus(): Promise<MenuDocument[]> {
  const data = await safeFetch<MenuDocument[]>(menusQuery);
  const fromSanity = (data ?? []).filter((menu) => menu.slug);
  const seen = new Set(fromSanity.map((menu) => menu.slug));

  // Bundled PDFs stay available so printed QR codes keep working before the
  // matching Sanity document exists.
  const fallbacks = staticMenus
    .filter((menu) => !seen.has(menu.slug))
    .map((menu) => ({ slug: menu.slug, title: menu.title, fileUrl: menu.file }));

  return [...fromSanity, ...fallbacks];
}

export async function getMenuBySlug(slug: string): Promise<MenuDocument | null> {
  const data = await safeFetch<MenuDocument | null>(menuBySlugQuery, { slug });
  if (data?.slug) return data;

  const fallback = staticMenus.find((menu) => menu.slug === slug);
  return fallback
    ? { slug: fallback.slug, title: fallback.title, fileUrl: fallback.file }
    : null;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return staticGalleryImages.map((image) => ({ ...image }));
}

export function homeHeroImages(settings: SiteSettings | null): ContentImage[] {
  return settings?.homeHeroImages.map((image) => ({ ...image })) ?? [];
}

export function stayHeroImage(settings: SiteSettings | null): ContentImage | null {
  return settings?.stayHeroImage ? { ...settings.stayHeroImage } : null;
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  type Raw = {
    guestName: string;
    rating: number;
    review: string;
    source: "google" | "booking" | "direct";
    sourceUrl?: string;
    reviewDate?: string;
    featured: boolean;
    guestImage?: SanityImage & { alt?: string };
  };

  const rows = await safeFetch<Raw[]>(featuredTestimonialsQuery);
  return (rows ?? []).map((entry) => ({
    guestName: entry.guestName,
    rating: entry.rating,
    review: entry.review,
    source: entry.source,
    sourceUrl: entry.sourceUrl,
    reviewDate: entry.reviewDate,
    featured: entry.featured,
    image: imageUrl(entry.guestImage, 300) ?? FALLBACK_IMAGES.testimonial,
    imageAlt: altOf(entry.guestImage) || entry.guestName,
  }));
}

