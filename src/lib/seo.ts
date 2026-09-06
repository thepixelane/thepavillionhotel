import type { Metadata } from "next";
import { FALLBACK_IMAGES } from "@/lib/constants";
import { siteUrl } from "@/lib/public-env";
import { diningVenues, rooms, siteSettings, venues, SHARED_MENU_SLUG } from "@/lib/site-data";

export const defaultSocialImage = FALLBACK_IMAGES.social;

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image?: typeof defaultSocialImage;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultSocialImage,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteSettings.siteName,
      locale: "en_IN",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

const sameAs = [
  siteSettings.instagramUrl,
  siteSettings.facebookUrl,
  siteSettings.tripAdvisorUrl,
].filter((url): url is string => Boolean(url));

export const hotelJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "@id": `${siteUrl}/#hotel`,
  name: siteSettings.siteName,
  description: siteSettings.description,
  url: siteUrl,
  image: siteSettings.homeHeroImages.map((image) => image.src),
  telephone: siteSettings.contactPhone,
  email: siteSettings.contactEmail,
  priceRange: "INR",
  hasMap: siteSettings.googleMapsUrl,
  address: {
    "@type": "PostalAddress",
    streetAddress: "392 E, Assembly Road, Near Basant-Bahar Theatre, Opp. Railway Station",
    addressLocality: "Kolhapur",
    addressRegion: "Maharashtra",
    postalCode: "416001",
    addressCountry: "IN",
  },
  amenityFeature: Array.from(
    new Set(rooms.flatMap((room) => room.amenities)),
    (name) => ({ "@type": "LocationFeatureSpecification", name, value: true }),
  ),
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteSettings.siteName,
  description: siteSettings.description,
  inLanguage: "en-IN",
  publisher: { "@id": `${siteUrl}/#hotel` },
};

export const roomsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Rooms and suites at The Pavillion Hotel",
  itemListElement: rooms.map((room, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "HotelRoom",
      name: room.name,
      description: room.description,
      image: room.images,
      url: `${siteUrl}/stay#${room.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
      amenityFeature: room.amenities.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
      offers: {
        "@type": "Offer",
        price: room.nightlyRate,
        priceCurrency: "INR",
        url: `${siteUrl}/booking-options`,
      },
    },
  })),
};

export const eventVenuesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Wedding and event venues at The Pavillion Hotel",
  itemListElement: venues.map((venue, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "EventVenue",
      name: venue.name,
      description: venue.description,
      image: venue.image,
      address: { "@id": `${siteUrl}/#hotel` },
      url: `${siteUrl}/events`,
    },
  })),
};

// One restaurant with three seating areas, so this is a single entity rather
// than one Restaurant per seating area.
export const diningJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "The Pavillion Restaurant",
  description:
    "The Pavillion Restaurant serves Mughlai, Afghani, Chinese and Continental cuisine across three seating areas: Pakhtoon, Walkway and Areca Bistro.",
  image: diningVenues.map((venue) => venue.image),
  telephone: siteSettings.contactPhone,
  url: `${siteUrl}/dining`,
  hasMenu: `${siteUrl}/menu/${SHARED_MENU_SLUG}`,
  parentOrganization: { "@id": `${siteUrl}/#hotel` },
  address: hotelJsonLd.address,
  containsPlace: diningVenues.map((venue) => ({
    "@type": "Place",
    name: venue.name,
    description: venue.intro,
    image: venue.image,
  })),
};