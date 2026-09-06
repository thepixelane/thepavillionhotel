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
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=88",
      alt: "The Pavillion Hotel surrounded by greenery in Kolhapur",
    },
    {
      src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=2000&q=88",
      alt: "Peaceful courtyard at The Pavillion Hotel in Kolhapur",
    },
  ],
  stayHeroImage: {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=2000&q=88",
    alt: "Guest room at The Pavillion Hotel in Kolhapur",
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
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
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
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
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
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
  },
  {
    name: "Central Conference Hall",
    capacity: "Up to 175 Guests",
    description:
      "A comfortable space for corporate events and smaller celebrations for up to 175 guests, with outdoor dining and restrooms.",
    suitableFor: ["Meetings", "Workshops", "Corporate Sessions"],
    facilities: ["Projector & Screen", "Wi-Fi", "Flexible Seating"],
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
  },
  {
    name: "Areca Lawns",
    capacity: "Up to 650 Guests",
    description:
      "An open-to-sky setting for celebrations of up to 650 guests including the gazebo area.",
    suitableFor: ["Sangeets", "Cocktails", "Intimate Weddings"],
    facilities: ["Outdoor Dining", "Ambient Lighting", "Bar Setup"],
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
  },
  {
    name: "Gazebo",
    capacity: "Up to 50 Guests",
    description:
      "A private setting overlooking the lawns, ideal for dinner parties and intimate celebrations for up to 50 guests.",
    suitableFor: ["Private Dining", "Birthdays", "Proposals"],
    facilities: ["Bespoke Menu", "Live Music", "Floral Decor"],
    image:
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=1200&q=80",
  },
] as const;

export const galleryImages = [
  {
    category: "Property",
    caption: "The Pavillion framed by greenery",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85",
    alt: "The Pavillion property framed by greenery",
  },
  {
    category: "Rooms",
    caption: "A calm room interior with soft natural light",
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=85",
    alt: "A calm room interior with soft natural light",
  },
  {
    category: "Gardens",
    caption: "Gardens and open spaces around the estate",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=85",
    alt: "Gardens and open spaces around the estate",
  },
  {
    category: "Events",
    caption: "A large event setup under warm ambient lighting",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85",
    alt: "A large event setup under warm ambient lighting",
  },
  {
    category: "Dining",
    caption: "Dining with a refined, intimate atmosphere",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85",
    alt: "Dining with a refined, intimate atmosphere",
  },
  {
    category: "Dining",
    caption: "A relaxed cafe setting with warm table styling",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=85",
    alt: "A relaxed cafe setting with warm table styling",
  },
] as const;

export const diningVenues = [
  {
    name: "Pakhtoon Restaurant",
    intro: "A favourite for Mughlai and Afghani cuisine, with tandoor specialities, kebabs, curries and more, alongside a selection of multi-cuisine dishes.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    timing: "7:00 PM – 11:30 PM",
    menuUrl: "https://www.hotelpavillion.co.in/",
    menuSlug: "pakhtoon",
    dishes: ["Peshawari Kebab", "Raan-e-Pakhtoon", "Dum Biryani", "Sheermal"],
  },
  {
    name: "Walkway Restaurant and Areca Cafe",
    intro:
      "An open-air cafe and restaurant with something for everyone, from Mughlai, Chinese and Continental dishes to refreshing drinks and desserts.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
    timing: "7:00 AM – 10:00 PM",
    menuUrl: "https://www.hotelpavillion.co.in/",
    menuSlug: "walkway",
    dishes: ["Estate Coffee", "Garden Salads", "Wood-Fired Pizza", "Sourdough Bakes"],
  },
] as const;