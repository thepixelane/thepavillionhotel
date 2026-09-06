import { groq } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FALLBACK_IMAGES } from "@/lib/constants";
import { menus as staticMenus } from "@/lib/menus";
import {
  diningVenues as staticDiningVenues,
  galleryImages as staticGalleryImages,
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

type PortableTextSpan = {
  _type: "span";
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: PortableTextSpan[];
};

export type BlogAuthor = {
  name: string;
  slug?: string;
  image?: string;
};

export type BlogCategory = {
  title: string;
  slug: string;
  description?: string;
  postCount?: number;
};

export type BlogTag = {
  title: string;
  slug: string;
};

export type BlogPost = {
  contentType: "blog" | "offer" | "festival" | "restaurantUpdate" | "announcement";
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  categories: BlogCategory[];
  tags: BlogTag[];
  author?: BlogAuthor;
  publishedAt?: string;
  featured: boolean;
  status?: "draft" | "published";
  estimatedReadTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  body: PortableTextBlock[];
};

export type BlogPostsResult = {
  posts: BlogPost[];
  total: number;
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

export type OfferItem = BlogPost;

export type MenuDocument = {
  slug: string;
  title: string;
  /** Absolute Sanity CDN URL, or a /public path when falling back to a bundled PDF. */
  fileUrl: string | null;
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

const galleryQuery = groq`*[_type == "galleryImage"] | order(order asc, _createdAt asc){
  category,
  caption,
  image
}`;

const blogPostsQuery = groq`*[
  _type == "post" &&
  defined(slug.current) &&
  (!defined(status) || status == "published") &&
  (!defined(contentType) || contentType == "blog") &&
  ($categorySlug == null || $categorySlug in categories[]->slug.current) &&
  ($tagSlug == null || $tagSlug in tags[]->slug.current)
] | order(featured desc, publishedAt desc)[$offset...$end]{
  contentType,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  categories[]->{
    title,
    "slug": slug.current,
    description
  },
  tags[]->{
    title,
    "slug": slug.current
  },
  author->{
    name,
    "slug": slug.current,
    image
  },
  publishedAt,
  featured,
  status,
  estimatedReadTime,
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "canonicalUrl": seo.canonicalUrl,
  "ogImage": seo.ogImage,
  body
}`;

const blogPostCountQuery = groq`count(*[
  _type == "post" &&
  defined(slug.current) &&
  (!defined(status) || status == "published") &&
  (!defined(contentType) || contentType == "blog") &&
  ($categorySlug == null || $categorySlug in categories[]->slug.current) &&
  ($tagSlug == null || $tagSlug in tags[]->slug.current)
])`;

const blogPostBySlugQuery = groq`*[
  _type == "post" &&
  slug.current == $slug &&
  (!defined(status) || status == "published") &&
  (!defined(contentType) || contentType == "blog")
][0]{
  contentType,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  categories[]->{
    title,
    "slug": slug.current,
    description
  },
  tags[]->{
    title,
    "slug": slug.current
  },
  author->{
    name,
    "slug": slug.current,
    image
  },
  publishedAt,
  featured,
  status,
  estimatedReadTime,
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "canonicalUrl": seo.canonicalUrl,
  "ogImage": seo.ogImage,
  body
}`;

const blogCategoriesQuery = groq`*[_type == "category" && defined(slug.current)] | order(title asc){
  title,
  "slug": slug.current,
  description,
  "postCount": count(*[
    _type == "post" &&
    references(^._id) &&
    defined(slug.current) &&
    (!defined(status) || status == "published") &&
    (!defined(contentType) || contentType == "blog")
  ])
}`;

const relatedPostsQuery = groq`*[
  _type == "post" &&
  defined(slug.current) &&
  slug.current != $slug &&
  (!defined(status) || status == "published") &&
  (!defined(contentType) || contentType == "blog") &&
  count((categories[]->slug.current)[@ in $categorySlugs]) > 0
] | order(publishedAt desc)[0...$limit]{
  contentType,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  categories[]->{
    title,
    "slug": slug.current,
    description
  },
  tags[]->{
    title,
    "slug": slug.current
  },
  author->{
    name,
    "slug": slug.current,
    image
  },
  publishedAt,
  featured,
  status,
  estimatedReadTime,
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "canonicalUrl": seo.canonicalUrl,
  "ogImage": seo.ogImage,
  body
}`;

const offersQuery = groq`*[
  _type == "post" &&
  defined(slug.current) &&
  (!defined(status) || status == "published") &&
  contentType in ["offer", "festival", "restaurantUpdate", "announcement"] &&
  (!defined(validFrom) || validFrom <= $now) &&
  (!defined(validTo) || validTo >= $now)
] | order(featured desc, publishedAt desc)[$offset...$end]{
  contentType,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  categories[]->{
    title,
    "slug": slug.current,
    description
  },
  tags[]->{
    title,
    "slug": slug.current
  },
  author->{
    name,
    "slug": slug.current,
    image
  },
  publishedAt,
  featured,
  status,
  estimatedReadTime,
  "seoTitle": seo.title,
  "seoDescription": seo.description,
  "canonicalUrl": seo.canonicalUrl,
  "ogImage": seo.ogImage,
  body
}`;

const offersCountQuery = groq`count(*[
  _type == "post" &&
  defined(slug.current) &&
  (!defined(status) || status == "published") &&
  contentType in ["offer", "festival", "restaurantUpdate", "announcement"] &&
  (!defined(validFrom) || validFrom <= $now) &&
  (!defined(validTo) || validTo >= $now)
])`;

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

function validImageUrl(value?: string | null, fallback?: string | null): string {
  const candidate = value?.trim();
  if (candidate) return candidate;
  return fallback && fallback.trim().length > 0 ? fallback : FALLBACK_IMAGES.content;
}

function altOf(source: unknown): string {
  return (source as { alt?: string } | undefined)?.alt ?? "";
}

function plainTextFromBody(body: PortableTextBlock[] = []): string {
  return (Array.isArray(body) ? body.filter(Boolean) : [])
    .filter((block): block is PortableTextBlock => Boolean(block) && block._type === "block")
    .map((block) => (Array.isArray(block.children) ? block.children : [])
      .map((child) => child?.text ?? "")
      .join(""))
    .join(" ")
    .trim();
}

function readTimeFromBody(body: PortableTextBlock[] = []): number {
  const words = plainTextFromBody(body).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225));
}

type RawBlogPost = {
  contentType?: "blog" | "offer" | "festival" | "restaurantUpdate" | "announcement";
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage & { alt?: string };
  categories?: { title: string; slug: string; description?: string }[];
  tags?: { title: string; slug: string }[];
  author?: {
    name: string;
    slug?: string;
    image?: SanityImage & { alt?: string };
  };
  publishedAt?: string;
  featured?: boolean;
  status?: "draft" | "published";
  estimatedReadTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: SanityImage & { alt?: string };
  body?: PortableTextBlock[];
};

function normalizeBlogPost(raw: RawBlogPost): BlogPost {
  const safeBody = Array.isArray(raw.body) ? raw.body.filter(Boolean) as PortableTextBlock[] : [];
  const safeCategories = Array.isArray(raw.categories) ? raw.categories.filter(Boolean) : [];
  const safeTags = Array.isArray(raw.tags) ? raw.tags.filter(Boolean) : [];
  const bodyPlain = plainTextFromBody(safeBody);
  const coverImage = imageUrl(raw.mainImage, 1600) ?? FALLBACK_IMAGES.blog;
  return {
    contentType: raw.contentType ?? "blog",
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt?.trim() || bodyPlain.slice(0, 180),
    coverImage,
    coverImageAlt: altOf(raw.mainImage) || raw.title,
    categories: safeCategories.map((category) => ({
      title: category.title,
      slug: category.slug,
      description: category.description,
    })),
    tags: safeTags.map((tag) => ({ title: tag.title, slug: tag.slug })),
    author: raw.author
      ? {
          name: raw.author.name,
          slug: raw.author.slug,
          image: imageUrl(raw.author.image, 320) ?? undefined,
        }
      : undefined,
    publishedAt: raw.publishedAt,
    featured: Boolean(raw.featured),
    status: raw.status,
    estimatedReadTime: raw.estimatedReadTime ?? readTimeFromBody(safeBody),
    seoTitle: raw.seoTitle,
    seoDescription: raw.seoDescription,
    canonicalUrl: raw.canonicalUrl,
    ogImage: imageUrl(raw.ogImage, 1600) ?? coverImage,
    body: safeBody,
  };
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
    gallery: [{ src: place.image, alt: place.name }],
    menuPages: [],
  }));
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
    src: validImageUrl(imageUrl(entry.image, 1600), staticGalleryImages[0]?.src),
    alt: altOf(entry.image) || entry.caption,
  }));
}

export function homeHeroImages(settings: SiteSettings | null): ContentImage[] {
  return settings?.homeHeroImages.map((image) => ({ ...image })) ?? [];
}

export function stayHeroImage(settings: SiteSettings | null): ContentImage | null {
  return settings?.stayHeroImage ? { ...settings.stayHeroImage } : null;
}

export async function getBlogPosts(options?: {
  categorySlug?: string;
  tagSlug?: string;
  limit?: number;
  offset?: number;
}): Promise<BlogPostsResult> {
  const limit = options?.limit ?? 12;
  const offset = options?.offset ?? 0;
  const params = {
    categorySlug: options?.categorySlug ?? null,
    tagSlug: options?.tagSlug ?? null,
    offset,
    end: offset + limit,
  };

  const [rows, total] = await Promise.all([
    safeFetch<RawBlogPost[]>(blogPostsQuery, params),
    safeFetch<number>(blogPostCountQuery, params),
  ]);

  return {
    posts: (rows ?? []).map(normalizeBlogPost),
    total: total ?? 0,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await safeFetch<RawBlogPost | null>(blogPostBySlugQuery, { slug });
  return post ? normalizeBlogPost(post) : null;
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const categorySlugs = post.categories.map((category) => category.slug).filter(Boolean);
  if (categorySlugs.length === 0) return [];
  const rows = await safeFetch<RawBlogPost[]>(relatedPostsQuery, {
    slug: post.slug,
    categorySlugs,
    limit,
  });
  return (rows ?? []).map(normalizeBlogPost);
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const rows = await safeFetch<BlogCategory[]>(blogCategoriesQuery);
  return rows ?? [];
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

export async function getOffers(options?: {
  limit?: number;
  offset?: number;
}): Promise<BlogPostsResult> {
  const limit = options?.limit ?? 12;
  const offset = options?.offset ?? 0;
  const params = {
    now: new Date().toISOString(),
    offset,
    end: offset + limit,
  };

  const [rows, total] = await Promise.all([
    safeFetch<RawBlogPost[]>(offersQuery, params),
    safeFetch<number>(offersCountQuery, params),
  ]);

  return {
    posts: (rows ?? []).map(normalizeBlogPost),
    total: total ?? 0,
  };
}

