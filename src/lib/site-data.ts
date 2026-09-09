import { bookingEngineUrl } from "@/lib/booking-engine";

export type ContentImage = {
  src: string;
  alt: string;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  description: string;
  bookingEngineUrl: string;
  contactPhone: string;
  contactPhoneAlt: string;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
  googleMapsUrl: string;
  instagramUrl?: string;
  facebookUrl?: string;
  tripAdvisorUrl?: string;
  homeHeroImages: ContentImage[];
  stayHeroImage: ContentImage;
  bookingPartners: { name: string; url: string; order: number }[];
};

export const siteSettings: SiteSettings = {
  siteName: "The Pavillion Hotel",
  tagline: "Nestled in Nature",
  description:
    "A Portuguese-style hotel in Shahupuri, Kolhapur offering comfortable rooms, restaurants, wedding venues, and event facilities near Kolhapur Railway Station.",
  bookingEngineUrl,
  contactPhone: "0231 265 4742",
  contactPhoneAlt: "0231 265 2751",
  contactEmail: "info@hotelpavillion.co.in",
  whatsappNumber: "919607323737",
  instagramUrl: "https://www.instagram.com/thepavillionhotel",
  facebookUrl: "https://www.facebook.com/thepavillionhotel/",
  address:
    "The Pavillion Hotel\n392 E, Assembly Road, Near Basant-Bahar Theatre, Opp. Railway Station, Shahupuri, Kolhapur, Maharashtra - 416001",
  googleMapsUrl:
    "https://maps.google.com/?q=392+E,+Assembly+Road,+Near+Basant-Bahar+Theatre,+Opp.+Railway+Station,+Shahupuri,+Kolhapur,+Maharashtra+416001",
  homeHeroImages: [
    {
      src: "/images/home-hero-1.jpg",
      alt: "The colonnaded entrance and fountain courtyard at The Pavillion Hotel in Kolhapur",
    },
    {
      src: "/images/home-hero-2.jpg",
      alt: "Palm-lined lawns and lit garden facade at The Pavillion Hotel at dusk",
    },
  ],
  stayHeroImage: {
    src: "/images/stay/deluxe-room/deluxe-room-1.jpeg",
    alt: "Deluxe room at The Pavillion Hotel in Kolhapur",
  },
  bookingPartners: [],
};

export const siteNavItems = [
  { label: "Home", href: "/" },
  { label: "Stay", href: "/stay" },
  { label: "Events", href: "/events" },
  { label: "Dining", href: "/dining" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const rooms = [
  {
    name: "Deluxe Room",
    description:
      "Comfortable accommodation with warm interiors, perfect for a relaxed stay.",
    details: ["2 Guests", "Queen or Twin Beds"],
    amenities: ["Queen or Twin Beds", "Free Wi-Fi and Car Park", "In-Room Dining"],
    nightlyRate: 9800,
    images: [
      "/images/stay/deluxe-room/deluxe-room-1.jpeg",
      "/images/stay/deluxe-room/deluxe-room-2.jpeg",
      "/images/stay/deluxe-room/deluxe-room-3.jpeg",
    ],
  },
  {
    name: "Executive Room",
    description:
      "Spacious rooms with a private sit-out, offering a calm and comfortable stay.",
    details: ["2 Guests", "Queen or Twin Beds"],
    amenities: ["Queen or Twin Beds", "Garden Sit-out", "Free Wi-Fi and Car Park", "In-Room Dining"],
    nightlyRate: 12400,
    images: [
      "/images/stay/executive-room/executive-room-1.jpeg",
      "/images/stay/executive-room/executive-room-2.jpeg",
      "/images/stay/executive-room/executive-room-3.jpeg",
    ],
  },
  {
    name: "The Suite",
    description:
      "Our signature suite with a private balcony or sit-out, generous living space, and a relaxed atmosphere.",
    details: ["3 Guests", "King Bed"],
    amenities: ["King Bed", "Garden or Balcony Sit-out", "LED TV", "Free Wi-Fi and Car Park", "In-Room Dining"],
    nightlyRate: 18900,
    images: [
      "/images/stay/suite-room/suite-room-1.JPG",
      "/images/stay/suite-room/suite-room-2.JPG",
      "/images/stay/suite-room/suite-room-3.JPG",
      "/images/stay/suite-room/suite-room-4.JPG",
      "/images/stay/suite-room/suite-room-5.JPG",
    ],
  },
] as const;

export const venues = [
  {
    name: "Bahar Lawns",
    capacity: "Up to 2,000 Guests",
    description:
      "Grand open-air celebrations for up to 2,000 guests.",
    suitableFor: ["Grand Weddings", "Receptions", "Corporate Galas"],
    facilities: ["Stage & Lighting", "Valet Parking", "Catering Kitchens"],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  },
  {
    name: "Madhusudan Hall",
    capacity: "Up to 800 Guests",
    description:
      "A versatile indoor and outdoor venue for up to 800 guests, with an air-conditioned hall, changing rooms, in-built stage and sound system.",
    suitableFor: ["Banquets", "Conferences", "Celebrations"],
    facilities: ["Air-Conditioned", "AV Setup", "Pre-Function Area"],
    image: "/images/venues/madhusudan-hall/madhusudan-hall-01.jpg",
  },
  {
    name: "Central Conference Hall",
    capacity: "Up to 175 Guests",
    description:
      "A comfortable space for corporate events and smaller celebrations for up to 175 guests, with outdoor dining and restrooms.",
    suitableFor: ["Meetings", "Workshops", "Corporate Sessions"],
    facilities: ["Projector & Screen", "Wi-Fi", "Flexible Seating"],
    image: "/images/venues/conference-hall/conference-hall-01.jpg",
  },
  {
    name: "Areca Lawns",
    capacity: "Up to 650 Guests",
    description:
      "An open-to-sky setting for celebrations of up to 650 guests including the gazebo area.",
    suitableFor: ["Sangeets", "Cocktails", "Intimate Weddings"],
    facilities: ["Outdoor Dining", "Ambient Lighting", "Bar Setup"],
    image: "/images/venues/areca-lawns/areca-lawns-01.jpg",
  },
  {
    name: "Gazebo",
    capacity: "Up to 50 Guests",
    description:
      "A private setting overlooking the lawns, ideal for dinner parties and intimate celebrations for up to 50 guests.",
    suitableFor: ["Private Dining", "Birthdays", "Proposals"],
    facilities: ["Bespoke Menu", "Live Music", "Floral Decor"],
    image: "/images/venues/gazebo/gazebo-01.jpg",
  },
] as const;

export const galleryImages = [
  {
    category: "Rooms",
    caption: "Deluxe room interior",
    src: "/images/stay/deluxe-room/deluxe-room-1.jpeg",
    alt: "Deluxe room interior at The Pavillion Hotel",
  },
  {
    category: "Rooms",
    caption: "Deluxe room with warm wood accents",
    src: "/images/stay/deluxe-room/deluxe-room-2.jpeg",
    alt: "Deluxe room with warm wood accents and natural light",
  },
  {
    category: "Rooms",
    caption: "Deluxe room details",
    src: "/images/stay/deluxe-room/deluxe-room-3.jpeg",
    alt: "Close look at a deluxe room at The Pavillion Hotel",
  },
  {
    category: "Rooms",
    caption: "Executive room bedroom",
    src: "/images/stay/executive-room/executive-room-1.jpeg",
    alt: "Executive room bedroom at The Pavillion Hotel",
  },
  {
    category: "Rooms",
    caption: "Executive room bathroom",
    src: "/images/stay/executive-room/executive-room-2.jpeg",
    alt: "Executive room bathroom at The Pavillion Hotel",
  },
  {
    category: "Rooms",
    caption: "Executive room with lounge setup",
    src: "/images/stay/executive-room/executive-room-3.jpeg",
    alt: "Executive room with lounge seating and warm lighting",
  },
  {
    category: "Rooms",
    caption: "Suite room evening view",
    src: "/images/stay/suite-room/suite-room-1.JPG",
    alt: "Suite room interior at The Pavillion Hotel",
  },
  {
    category: "Rooms",
    caption: "Suite room bedroom",
    src: "/images/stay/suite-room/suite-room-2.JPG",
    alt: "Suite room with king bed and lounge styling",
  },
  {
    category: "Rooms",
    caption: "Suite room with warm beige styling",
    src: "/images/stay/suite-room/suite-room-3.JPG",
    alt: "Suite room with warm beige styling and spacious layout",
  },
  {
    category: "Rooms",
    caption: "Suite room with seating area",
    src: "/images/stay/suite-room/suite-room-4.JPG",
    alt: "Suite room seating area and bedroom layout",
  },
  {
    category: "Rooms",
    caption: "Suite room details",
    src: "/images/stay/suite-room/suite-room-5.JPG",
    alt: "Suite room details and decor at The Pavillion Hotel",
  },
  {
    category: "Property",
    caption: "The Pavillion framed by greenery",
    src: "/images/property/ambience-01.jpg",
    alt: "The Pavillion Hotel framed by tropical greenery",
  },
  {
    category: "Property",
    caption: "Garden pathways through the estate",
    src: "/images/property/ambience-03.jpg",
    alt: "Garden pathways winding through the grounds of The Pavillion Hotel",
  },
  {
    category: "Property",
    caption: "The property lit up after dark",
    src: "/images/property/ambience-06.jpg",
    alt: "The Pavillion Hotel lit up after dark",
  },
  {
    category: "Property",
    caption: "Quiet corners around the grounds",
    src: "/images/property/ambience-08.jpg",
    alt: "A quiet seating corner in the grounds of The Pavillion Hotel",
  },
  {
    category: "Property",
    caption: "Reception and lobby",
    src: "/images/property/interior-01.jpg",
    alt: "Reception desk and lobby at The Pavillion Hotel",
  },
  {
    category: "Property",
    caption: "Lobby seating and interiors",
    src: "/images/property/interior-04.jpg",
    alt: "Lobby seating area at The Pavillion Hotel",
  },
  {
    category: "Gardens",
    caption: "Areca Lawns under open sky",
    src: "/images/venues/areca-lawns/areca-lawns-01.jpg",
    alt: "Areca Lawns open-air venue at The Pavillion Hotel",
  },
  {
    category: "Gardens",
    caption: "Areca Lawns lit for an evening event",
    src: "/images/venues/areca-lawns/areca-lawns-03.jpg",
    alt: "Areca Lawns lit up for an evening celebration",
  },
  {
    category: "Gardens",
    caption: "The Gazebo overlooking the lawns",
    src: "/images/venues/gazebo/gazebo-01.jpg",
    alt: "The Gazebo overlooking the lawns at The Pavillion Hotel",
  },
  {
    category: "Events",
    caption: "Madhusudan Hall set for a celebration",
    src: "/images/venues/madhusudan-hall/madhusudan-hall-01.jpg",
    alt: "Madhusudan Hall set up for a celebration",
  },
  {
    category: "Events",
    caption: "Madhusudan Hall pre-function area",
    src: "/images/venues/madhusudan-hall/madhusudan-hall-03.jpg",
    alt: "Pre-function area outside Madhusudan Hall",
  },
  {
    category: "Events",
    caption: "Central Conference Hall",
    src: "/images/venues/conference-hall/conference-hall-01.jpg",
    alt: "Central Conference Hall arranged for a corporate session",
  },
  {
    category: "Dining",
    caption: "Pakhtoon indoor dining",
    src: "/images/dining/pakhtoon/pakhtoon-01.jpg",
    alt: "Indoor dining at the Pakhtoon seating area",
  },
  {
    category: "Dining",
    caption: "Table settings at Pakhtoon",
    src: "/images/dining/pakhtoon/pakhtoon-03.jpg",
    alt: "Table settings at the Pakhtoon seating area",
  },
  {
    category: "Dining",
    caption: "Walkway open-air seating",
    src: "/images/dining/walkway/walkway-06.jpg",
    alt: "Open-air seating along the Walkway at The Pavillion Hotel",
  },
  {
    category: "Dining",
    caption: "Areca Bistro",
    src: "/images/dining/areca-bistro/areca-bistro-02.jpg",
    alt: "Areca Bistro seating area at The Pavillion Hotel",
  },
] as const;

// Pakhtoon, Walkway and Areca Bistro are one restaurant with three seating
// areas, so they all share a single food menu.
export const SHARED_MENU_SLUG = "pakhtoon";

export const homeHighlight = {
  title: "Shravan Festival",
  description: "Unlimited Buffet. 22nd August to 9th September 2026",
  ctaLabel: "Call Now",
} as const;

export const diningVenues = [
  {
    name: "Pakhtoon",
    intro:
      "Our air-conditioned indoor seating, and a favourite for Mughlai and Afghani cuisine with tandoor specialities, kebabs and curries alongside multi-cuisine dishes.",
    image: "/images/dining/pakhtoon/pakhtoon-01.jpg",
    gallery: [
      "/images/dining/pakhtoon/pakhtoon-01.jpg",
      "/images/dining/pakhtoon/pakhtoon-03.jpg",
      "/images/dining/pakhtoon/pakhtoon-05.jpg",
      "/images/dining/pakhtoon/pakhtoon-07.jpg",
    ],
    timing: "7:00 PM \u2013 11:30 PM",
    menuUrl: "https://www.hotelpavillion.co.in/",
    menuSlug: SHARED_MENU_SLUG,
    dishes: ["Peshawari Kebab", "Raan-e-Pakhtoon", "Dum Biryani", "Sheermal"],
  },
  {
    name: "Walkway",
    intro:
      "Open-air seating along the garden walkway, relaxed through the day for breakfast, coffee and unhurried dinners under the trees.",
    image: "/images/dining/walkway/walkway-06.jpg",
    gallery: [
      "/images/dining/walkway/walkway-06.jpg",
      "/images/dining/walkway/walkway-02.jpg",
      "/images/dining/walkway/walkway-03.jpg",
      "/images/dining/walkway/walkway-05.jpg",
    ],
    timing: "7:00 AM \u2013 10:00 PM",
    menuUrl: "https://www.hotelpavillion.co.in/",
    menuSlug: SHARED_MENU_SLUG,
    dishes: ["Estate Coffee", "Garden Salads", "Wood-Fired Pizza", "Sourdough Bakes"],
  },
  {
    name: "Areca Bistro",
    intro:
      "A casual bistro setting beside the Areca Lawns, suited to long conversations over coffee, snacks and desserts.",
    image: "/images/dining/areca-bistro/areca-bistro-02.jpg",
    gallery: [
      "/images/dining/areca-bistro/areca-bistro-02.jpg",
      "/images/dining/areca-bistro/areca-bistro-01.jpg",
    ],
    timing: "7:00 AM \u2013 10:00 PM",
    menuUrl: "https://www.hotelpavillion.co.in/",
    menuSlug: SHARED_MENU_SLUG,
    dishes: ["Filter Coffee", "Small Plates", "Desserts", "Fresh Juices"],
  },
] as const;