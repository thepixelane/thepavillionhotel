export const siteNavItems = [
  { label: "Home", href: "/" },
  { label: "Stay", href: "/stay" },
  { label: "Events", href: "/events" },
  { label: "Dining", href: "/dining" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const rooms = [
  {
    name: "Deluxe Room",
    description:
      "Warm interiors and garden views set the tone for a restful stay in our most-loved room category.",
    details: ["320 sq.ft", "2 Guests", "King Bed"],
    amenities: ["Wi-Fi", "AC", "Mini Bar", "Garden View"],
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
      "Generous living space with a work nook and lounge area for extended stays and business guests.",
    details: ["420 sq.ft", "2 Guests", "King Bed"],
    amenities: ["Wi-Fi", "Work Desk", "Lounger", "Rain Shower"],
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
      "Our signature suite is expansive, luminous, and framed by a private balcony overlooking the gardens.",
    details: ["640 sq.ft", "3 Guests", "King + Lounge"],
    amenities: ["Balcony", "Bathtub", "Lounge", "Butler"],
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
      "Our largest venue is a sweeping open-air lawn for landmark weddings and grand receptions under the stars.",
    suitableFor: ["Grand Weddings", "Receptions", "Corporate Galas"],
    facilities: ["Stage & Lighting", "Valet Parking", "Catering Kitchens"],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
  },
  {
    name: "Madhusudan Hall",
    capacity: "Up to 600 Guests",
    description:
      "A grand indoor banquet hall with elegant décor, ideal for weddings, conferences, and cultural events.",
    suitableFor: ["Banquets", "Conferences", "Celebrations"],
    facilities: ["Air-Conditioned", "AV Setup", "Pre-Function Area"],
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
  },
  {
    name: "Conference Hall",
    capacity: "Up to 100 Guests",
    description:
      "A professional conference space for board meetings, workshops, and small corporate gatherings.",
    suitableFor: ["Meetings", "Workshops", "Corporate Sessions"],
    facilities: ["Projector & Screen", "Wi-Fi", "Flexible Seating"],
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
  },
  {
    name: "Areca Lawns",
    capacity: "100–200 Guests",
    description:
      "An intimate garden setting framed by areca palms, perfect for smaller weddings and cocktail evenings.",
    suitableFor: ["Sangeets", "Cocktails", "Intimate Weddings"],
    facilities: ["Outdoor Dining", "Ambient Lighting", "Bar Setup"],
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
  },
  {
    name: "Gazebo",
    capacity: "Private parties and dinners",
    description:
      "A charming garden gazebo for proposals, intimate dinners, and small gatherings under fairy lights.",
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
    name: "Pakhtoon",
    intro: "Bold North-West Frontier cuisine in a warm, candle-lit setting.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    timing: "7:00 PM – 11:30 PM",
    dishes: ["Peshawari Kebab", "Raan-e-Pakhtoon", "Dum Biryani", "Sheermal"],
  },
  {
    name: "Areca Café",
    intro:
      "A breezy garden-side café for slow mornings, fresh brews, and light seasonal dishes.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
    timing: "7:00 AM – 10:00 PM",
    dishes: ["Estate Coffee", "Garden Salads", "Wood-Fired Pizza", "Sourdough Bakes"],
  },
] as const;