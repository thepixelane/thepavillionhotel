/**
 * Seed script — populates Rooms, Venues, and Dining Venues in Sanity.
 *
 * Usage:
 *   $env:SANITY_WRITE_TOKEN="sk..."   (PowerShell)
 *   node scripts/seed-content.mjs
 *
 * Get a write token from: https://sanity.io/manage → your project → API → Tokens
 * Choose "Editor" permission level.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Read .env.local so we pick up project ID & dataset without dotenv installed
// ---------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

const envVars = {};
try {
  const raw = readFileSync(envPath, "utf-8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    envVars[key] = val;
  }
} catch {
  // fall through — values may still be in process.env
}

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || envVars.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || envVars.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set.");
  process.exit(1);
}
if (!token) {
  console.error(
    "❌  SANITY_WRITE_TOKEN is not set.\n" +
      "    Get one at https://sanity.io/manage → your project → API → Tokens (Editor level).\n" +
      "    Then run:\n" +
      '      $env:SANITY_WRITE_TOKEN="sk..."\n' +
      "      node scripts/seed-content.mjs"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const rooms = [
  {
    _type: "room",
    name: "Deluxe Room",
    slug: { _type: "slug", current: "deluxe-room" },
    order: 1,
    description:
      "Comfortable accommodation with warm interiors, perfect for a relaxed stay.",
    details: ["2 Guests", "Queen or Twin Beds"],
    amenities: ["Queen or Twin Beds", "Free Wi-Fi and Car Park", "In-Room Dining"],
    nightlyRate: 9800,
    capacity: 2,
  },
  {
    _type: "room",
    name: "Executive Room",
    slug: { _type: "slug", current: "executive-room" },
    order: 2,
    description:
      "Spacious rooms with a private sit-out, offering a calm and comfortable stay.",
    details: ["2 Guests", "Queen or Twin Beds"],
    amenities: ["Queen or Twin Beds", "Garden Sit-out", "Free Wi-Fi and Car Park", "In-Room Dining"],
    nightlyRate: 12400,
    capacity: 2,
  },
  {
    _type: "room",
    name: "The Suite",
    slug: { _type: "slug", current: "the-suite" },
    order: 3,
    description:
      "Our signature suite with a private balcony or sit-out, generous living space, and a relaxed atmosphere.",
    details: ["3 Guests", "King Bed"],
    amenities: ["King Bed", "Garden or Balcony Sit-out", "LED TV", "Free Wi-Fi and Car Park", "In-Room Dining"],
    nightlyRate: 18900,
    capacity: 3,
  },
];

const venues = [
  {
    _type: "venue",
    name: "Bahar Lawns",
    slug: { _type: "slug", current: "bahar-lawns" },
    order: 1,
    capacity: "Up to 2,000 Guests",
    description:
      "Grand open-air celebrations for up to 2,000 guests.",
    suitableFor: ["Grand Weddings", "Receptions", "Corporate Galas"],
    facilities: ["Stage & Lighting", "Valet Parking", "Catering Kitchens"],
  },
  {
    _type: "venue",
    name: "Madhusudan Hall",
    slug: { _type: "slug", current: "madhusudan-hall" },
    order: 2,
    capacity: "Up to 800 Guests",
    description:
      "A versatile indoor and outdoor venue for up to 800 guests, with an air-conditioned hall, changing rooms, in-built stage and sound system.",
    suitableFor: ["Banquets", "Conferences", "Celebrations"],
    facilities: ["Air-Conditioned", "AV Setup", "Pre-Function Area"],
  },
  {
    _type: "venue",
    name: "Central Conference Hall",
    slug: { _type: "slug", current: "central-conference-hall" },
    order: 3,
    capacity: "Up to 175 Guests",
    description:
      "A comfortable space for corporate events and smaller celebrations for up to 175 guests, with outdoor dining and restrooms.",
    suitableFor: ["Meetings", "Workshops", "Corporate Sessions"],
    facilities: ["Projector & Screen", "Wi-Fi", "Flexible Seating"],
  },
  {
    _type: "venue",
    name: "Areca Lawns",
    slug: { _type: "slug", current: "areca-lawns" },
    order: 4,
    capacity: "Up to 650 Guests",
    description:
      "An open-to-sky setting for celebrations of up to 650 guests including the gazebo area.",
    suitableFor: ["Sangeets", "Cocktails", "Intimate Weddings"],
    facilities: ["Outdoor Dining", "Ambient Lighting", "Bar Setup"],
  },
  {
    _type: "venue",
    name: "Gazebo",
    slug: { _type: "slug", current: "gazebo" },
    order: 5,
    capacity: "Up to 50 Guests",
    description:
      "A private setting overlooking the lawns, ideal for dinner parties and intimate celebrations for up to 50 guests.",
    suitableFor: ["Private Dining", "Birthdays", "Proposals"],
    facilities: ["Bespoke Menu", "Live Music", "Floral Decor"],
  },
];

const diningVenues = [
  {
    _type: "diningVenue",
    name: "Pakhtoon Restaurant",
    slug: { _type: "slug", current: "pakhtoon" },
    order: 1,
    intro: "A favourite for Mughlai and Afghani cuisine, with tandoor specialities, kebabs, curries and more, alongside a selection of multi-cuisine dishes.",
    timing: "7:00 PM – 11:30 PM",
    dishes: ["Peshawari Kebab", "Raan-e-Pakhtoon", "Dum Biryani", "Sheermal"],
  },
  {
    _type: "diningVenue",
    name: "Walkway Restaurant and Areca Cafe",
    slug: { _type: "slug", current: "walkway-restaurant-areca-cafe" },
    order: 2,
    intro:
      "An open-air cafe and restaurant with something for everyone, from Mughlai, Chinese and Continental dishes to refreshing drinks and desserts.",
    timing: "7:00 AM – 10:00 PM",
    dishes: ["Estate Coffee", "Garden Salads", "Wood-Fired Pizza", "Sourdough Bakes"],
  },
];

// ---------------------------------------------------------------------------
// Upsert helper — creates or replaces by slug so re-running is safe
// ---------------------------------------------------------------------------
async function upsert(doc) {
  // Use a deterministic _id derived from type + slug so re-runs are idempotent
  const _id = `${doc._type}-${doc.slug.current}`;
  const result = await client.createOrReplace({ ...doc, _id });
  return result;
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------
async function run() {
  console.log(`\nSeeding Sanity project "${projectId}" / dataset "${dataset}"\n`);

  console.log("Rooms:");
  for (const room of rooms) {
    await upsert(room);
    console.log(`  ✓ ${room.name}`);
  }

  console.log("\nVenues:");
  for (const venue of venues) {
    await upsert(venue);
    console.log(`  ✓ ${venue.name}`);
  }

  console.log("\nDining venues:");
  for (const dv of diningVenues) {
    await upsert(dv);
    console.log(`  ✓ ${dv.name}`);
  }

  console.log("\n✅  Done! Open /studio to add images to each entry.\n");
}

run().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
