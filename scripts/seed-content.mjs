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
      "Warm interiors and garden views set the tone for a restful stay in our most-loved room category.",
    details: ["320 sq.ft", "2 Guests", "King Bed"],
    amenities: ["Wi-Fi", "AC", "Mini Bar", "Garden View"],
    nightlyRate: 9800,
    capacity: 2,
  },
  {
    _type: "room",
    name: "Executive Room",
    slug: { _type: "slug", current: "executive-room" },
    order: 2,
    description:
      "Generous living space with a work nook and lounge area for extended stays and business guests.",
    details: ["420 sq.ft", "2 Guests", "King Bed"],
    amenities: ["Wi-Fi", "Work Desk", "Lounger", "Rain Shower"],
    nightlyRate: 12400,
    capacity: 2,
  },
  {
    _type: "room",
    name: "The Suite",
    slug: { _type: "slug", current: "the-suite" },
    order: 3,
    description:
      "Our signature suite is expansive, luminous, and framed by a private balcony overlooking the gardens.",
    details: ["640 sq.ft", "3 Guests", "King + Lounge"],
    amenities: ["Balcony", "Bathtub", "Lounge", "Butler"],
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
      "Our largest venue is a sweeping open-air lawn for landmark weddings and grand receptions under the stars.",
    suitableFor: ["Grand Weddings", "Receptions", "Corporate Galas"],
    facilities: ["Stage & Lighting", "Valet Parking", "Catering Kitchens"],
  },
  {
    _type: "venue",
    name: "Madhusudan Hall",
    slug: { _type: "slug", current: "madhusudan-hall" },
    order: 2,
    capacity: "Up to 600 Guests",
    description:
      "A grand indoor banquet hall with elegant décor, ideal for weddings, conferences, and cultural events.",
    suitableFor: ["Banquets", "Conferences", "Celebrations"],
    facilities: ["Air-Conditioned", "AV Setup", "Pre-Function Area"],
  },
  {
    _type: "venue",
    name: "Conference Hall",
    slug: { _type: "slug", current: "conference-hall" },
    order: 3,
    capacity: "Up to 100 Guests",
    description:
      "A professional conference space for board meetings, workshops, and small corporate gatherings.",
    suitableFor: ["Meetings", "Workshops", "Corporate Sessions"],
    facilities: ["Projector & Screen", "Wi-Fi", "Flexible Seating"],
  },
  {
    _type: "venue",
    name: "Areca Lawns",
    slug: { _type: "slug", current: "areca-lawns" },
    order: 4,
    capacity: "100–200 Guests",
    description:
      "An intimate garden setting framed by areca palms, perfect for smaller weddings and cocktail evenings.",
    suitableFor: ["Sangeets", "Cocktails", "Intimate Weddings"],
    facilities: ["Outdoor Dining", "Ambient Lighting", "Bar Setup"],
  },
  {
    _type: "venue",
    name: "Gazebo",
    slug: { _type: "slug", current: "gazebo" },
    order: 5,
    capacity: "Private parties and dinners",
    description:
      "A charming garden gazebo for proposals, intimate dinners, and small gatherings under fairy lights.",
    suitableFor: ["Private Dining", "Birthdays", "Proposals"],
    facilities: ["Bespoke Menu", "Live Music", "Floral Decor"],
  },
];

const diningVenues = [
  {
    _type: "diningVenue",
    name: "Pakhtoon",
    slug: { _type: "slug", current: "pakhtoon" },
    order: 1,
    intro: "Bold North-West Frontier cuisine in a warm, candle-lit setting.",
    timing: "7:00 PM – 11:30 PM",
    dishes: ["Peshawari Kebab", "Raan-e-Pakhtoon", "Dum Biryani", "Sheermal"],
  },
  {
    _type: "diningVenue",
    name: "Areca Café",
    slug: { _type: "slug", current: "areca-cafe" },
    order: 2,
    intro:
      "A breezy garden-side café for slow mornings, fresh brews, and light seasonal dishes.",
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
