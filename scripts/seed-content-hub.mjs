/**
 * Seed script for Content Hub documents:
 * - categories
 * - tags
 * - authors
 * - posts
 * - testimonials
 *
 * Usage:
 *   node scripts/seed-content-hub.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

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
  // ignore: env vars may still come from process.env
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || envVars.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || envVars.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN || envVars.SANITY_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing required Sanity env vars (projectId, dataset, token).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function upsertBySlug(type, slug, data) {
  const existing = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]{_id}`,
    { type, slug }
  );

  if (existing?._id) {
    await client.patch(existing._id).set(data).commit();
    return existing._id;
  }

  const created = await client.create({ _type: type, ...data });
  return created._id;
}

async function upsertByGuestName(guestName, data) {
  const existing = await client.fetch(
    `*[_type == "testimonial" && guestName == $guestName][0]{_id}`,
    { guestName }
  );

  if (existing?._id) {
    await client.patch(existing._id).set(data).commit();
    return existing._id;
  }

  const created = await client.create({ _type: "testimonial", ...data });
  return created._id;
}

function block(text) {
  return {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text }],
  };
}

async function run() {
  console.log(`Seeding Content Hub for ${projectId}/${dataset}...`);

  const categories = [
    {
      title: "Travel Guide",
      slug: { _type: "slug", current: "travel-guide" },
      description: "Local attractions, planning tips, and seasonal itineraries around Kolhapur.",
    },
    {
      title: "Wedding",
      slug: { _type: "slug", current: "wedding" },
      description: "Venue planning ideas, checklists, and celebration inspiration.",
    },
    {
      title: "Offers",
      slug: { _type: "slug", current: "offers" },
      description: "Seasonal packages, festive deals, and limited-time experiences.",
    },
    {
      title: "Restaurant",
      slug: { _type: "slug", current: "restaurant" },
      description: "Dining highlights from Pakhtoon and Areca Cafe.",
    },
  ];

  const tags = [
    { title: "Kolhapur", slug: { _type: "slug", current: "kolhapur" } },
    { title: "Wedding", slug: { _type: "slug", current: "wedding" } },
    { title: "Family", slug: { _type: "slug", current: "family" } },
    { title: "Food", slug: { _type: "slug", current: "food" } },
    { title: "Festival", slug: { _type: "slug", current: "festival" } },
  ];

  const authors = [
    {
      name: "Pavillion Editorial Team",
      slug: { _type: "slug", current: "pavillion-editorial-team" },
      bio: [
        block("The in-house editorial team curates local travel, celebration planning, and hospitality stories from Kolhapur."),
      ],
    },
  ];

  const categoryIds = new Map();
  for (const category of categories) {
    const id = await upsertBySlug("category", category.slug.current, category);
    categoryIds.set(category.slug.current, id);
    console.log(`  category: ${category.title}`);
  }

  const tagIds = new Map();
  for (const tag of tags) {
    const id = await upsertBySlug("tag", tag.slug.current, tag);
    tagIds.set(tag.slug.current, id);
    console.log(`  tag: ${tag.title}`);
  }

  const authorIds = new Map();
  for (const author of authors) {
    const id = await upsertBySlug("author", author.slug.current, author);
    authorIds.set(author.slug.current, id);
    console.log(`  author: ${author.name}`);
  }

  const posts = [
    {
      title: "Top 10 Places to Visit in Kolhapur During Your Weekend Stay",
      slug: { _type: "slug", current: "top-10-places-to-visit-in-kolhapur" },
      status: "published",
      featured: true,
      excerpt:
        "From Mahalaxmi Temple to local markets and sunset viewpoints, here is a practical Kolhapur itinerary for a memorable weekend.",
      author: { _type: "reference", _ref: authorIds.get("pavillion-editorial-team") },
      categories: [{ _type: "reference", _ref: categoryIds.get("travel-guide") }],
      tags: [
        { _type: "reference", _ref: tagIds.get("kolhapur") },
        { _type: "reference", _ref: tagIds.get("family") },
      ],
      publishedAt: "2026-08-01T09:00:00.000Z",
      estimatedReadTime: 5,
      body: [
        block("Kolhapur blends heritage, food, and green open spaces in a way that works beautifully for short getaways."),
        block("Start your day early at Mahalaxmi Temple, then explore Rankala Lake and finish with authentic local cuisine in the evening."),
        block("If you are staying at The Pavillion, our team can help you sequence visits to avoid crowds and optimize travel time."),
      ],
      seo: {
        title: "Top 10 Places to Visit in Kolhapur | The Pavillion",
        description:
          "A practical weekend guide to Kolhapur attractions near The Pavillion, including temples, lakes, markets, and dining spots.",
      },
    },
    {
      title: "How to Plan a Garden Wedding in Kolhapur: Venue and Timeline Guide",
      slug: { _type: "slug", current: "how-to-plan-a-garden-wedding-in-kolhapur" },
      status: "published",
      featured: false,
      excerpt:
        "A simple wedding planning framework covering venue choice, guest flow, decor windows, and weather-friendly scheduling.",
      author: { _type: "reference", _ref: authorIds.get("pavillion-editorial-team") },
      categories: [{ _type: "reference", _ref: categoryIds.get("wedding") }],
      tags: [
        { _type: "reference", _ref: tagIds.get("wedding") },
        { _type: "reference", _ref: tagIds.get("festival") },
      ],
      publishedAt: "2026-08-02T10:30:00.000Z",
      estimatedReadTime: 6,
      body: [
        block("Great wedding outcomes come from planning guest movement and service windows before finalizing decor."),
        block("For outdoor venues, lock your ceremony and reception timings with weather and lighting in mind."),
        block("At The Pavillion, Bahar Lawns and Areca Lawns can be paired with indoor backup options to reduce risk."),
      ],
      seo: {
        title: "Garden Wedding Planning Guide in Kolhapur | The Pavillion",
        description:
          "Plan your Kolhapur wedding with venue, timeline, and guest-flow tips from The Pavillion events team.",
      },
    },
    {
      title: "Monsoon Stay Offers: Best Time to Book for Families and Couples",
      slug: { _type: "slug", current: "monsoon-stay-offers-best-time-to-book" },
      status: "published",
      featured: false,
      excerpt:
        "Discover the best booking windows for monsoon stays, including weekday advantages and package combinations.",
      author: { _type: "reference", _ref: authorIds.get("pavillion-editorial-team") },
      categories: [{ _type: "reference", _ref: categoryIds.get("offers") }],
      tags: [
        { _type: "reference", _ref: tagIds.get("family") },
        { _type: "reference", _ref: tagIds.get("kolhapur") },
      ],
      publishedAt: "2026-08-03T08:00:00.000Z",
      estimatedReadTime: 4,
      body: [
        block("Monsoon months are ideal for guests who prefer quieter travel and softer pricing windows."),
        block("Families often benefit from weekday combinations that include dining and local sightseeing support."),
        block("Check package inclusions closely and compare transfer convenience when selecting your stay.")
      ],
      seo: {
        title: "Monsoon Stay Offers in Kolhapur | The Pavillion",
        description:
          "A quick guide to monsoon booking windows, package value, and stay planning tips for The Pavillion.",
      },
    },
    {
      title: "A Food Lover's Evening in Kolhapur: From Street Bites to Signature Dining",
      slug: { _type: "slug", current: "food-lovers-evening-in-kolhapur" },
      status: "published",
      featured: false,
      excerpt:
        "Plan a balanced evening of local street food exploration followed by a refined dining experience at The Pavillion.",
      author: { _type: "reference", _ref: authorIds.get("pavillion-editorial-team") },
      categories: [{ _type: "reference", _ref: categoryIds.get("restaurant") }],
      tags: [
        { _type: "reference", _ref: tagIds.get("food") },
        { _type: "reference", _ref: tagIds.get("kolhapur") },
      ],
      publishedAt: "2026-08-04T09:15:00.000Z",
      estimatedReadTime: 5,
      body: [
        block("Kolhapur's evening rhythm is perfect for travelers who enjoy both local flavor and elegant dining."),
        block("Start with classic snacks in the city, then reserve a relaxed dinner table for a slower, curated meal."),
        block("Our dining team can recommend pairings based on whether you prefer traditional spice-forward or lighter contemporary plates."),
      ],
      seo: {
        title: "Kolhapur Food Guide: Street Bites to Fine Dining | The Pavillion",
        description:
          "An easy evening food itinerary in Kolhapur with local snacks, timing tips, and signature dining suggestions.",
      },
    },
    {
      title: "Corporate Retreat Checklist: Meetings by Day, Celebration by Night",
      slug: { _type: "slug", current: "corporate-retreat-checklist-kolhapur" },
      status: "published",
      featured: false,
      excerpt:
        "A practical checklist for planning smooth corporate offsites with productive sessions and meaningful team engagement.",
      author: { _type: "reference", _ref: authorIds.get("pavillion-editorial-team") },
      categories: [{ _type: "reference", _ref: categoryIds.get("offers") }],
      tags: [
        { _type: "reference", _ref: tagIds.get("family") },
        { _type: "reference", _ref: tagIds.get("festival") },
      ],
      publishedAt: "2026-08-04T12:00:00.000Z",
      estimatedReadTime: 6,
      body: [
        block("Great corporate retreats start with clear meeting objectives and room setups matched to each session format."),
        block("Build light buffers between sessions, include one shared dining moment, and reserve an outdoor engagement slot."),
        block("At The Pavillion, teams often combine Conference Hall planning sessions with evening networking in lawn spaces."),
      ],
      seo: {
        title: "Corporate Retreat Planning Checklist | The Pavillion Kolhapur",
        description:
          "Plan a productive and enjoyable corporate retreat in Kolhapur with this practical venue and schedule checklist.",
      },
    },
    {
      title: "Festive Weekend Itinerary: Culture, Shopping, and Slow Mornings",
      slug: { _type: "slug", current: "festive-weekend-itinerary-kolhapur" },
      status: "published",
      featured: false,
      excerpt:
        "A festive-season weekend plan that blends temple visits, shopping streets, and relaxed hospitality moments.",
      author: { _type: "reference", _ref: authorIds.get("pavillion-editorial-team") },
      categories: [{ _type: "reference", _ref: categoryIds.get("travel-guide") }],
      tags: [
        { _type: "reference", _ref: tagIds.get("festival") },
        { _type: "reference", _ref: tagIds.get("kolhapur") },
      ],
      publishedAt: "2026-08-05T07:30:00.000Z",
      estimatedReadTime: 5,
      body: [
        block("Festive weekends in Kolhapur are vibrant, so planning your movement windows helps avoid crowd pressure."),
        block("Prioritize one cultural visit each morning and keep evenings open for food, shopping, and family time."),
        block("When staying with us, our front desk can help sequence routes for temple, market, and dining clusters."),
      ],
      seo: {
        title: "Festive Weekend Plan in Kolhapur | The Pavillion",
        description:
          "Explore a balanced festive itinerary with culture, markets, and comfort-first stay planning in Kolhapur.",
      },
    },
  ];

  for (const post of posts) {
    await upsertBySlug("post", post.slug.current, post);
    console.log(`  post: ${post.title}`);
  }

  const testimonials = [
    {
      guestName: "Rohan Mehta",
      rating: 5,
      review:
        "Excellent service and beautiful lawns. The team handled our family celebration with great attention to detail.",
      source: "google",
      sourceUrl: "https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur",
      reviewDate: "2026-07-20",
      featured: true,
      order: 1,
    },
    {
      guestName: "Ananya Kulkarni",
      rating: 5,
      review:
        "Rooms were comfortable, food was excellent, and the location made city visits very easy. Highly recommended.",
      source: "direct",
      reviewDate: "2026-07-12",
      featured: true,
      order: 2,
    },
    {
      guestName: "Siddharth Jain",
      rating: 4,
      review:
        "Conference setup was smooth and professional. Staff support was responsive throughout our event day.",
      source: "booking",
      reviewDate: "2026-06-28",
      featured: true,
      order: 3,
    },
    {
      guestName: "Neha Patil",
      rating: 5,
      review:
        "We hosted a pre-wedding function here and everything from decor coordination to service timing was seamless.",
      source: "google",
      sourceUrl: "https://maps.google.com/?q=The+Pavillion+Hotel,+Shahupuri,+Kolhapur",
      reviewDate: "2026-07-04",
      featured: true,
      order: 4,
    },
    {
      guestName: "Amit Deshpande",
      rating: 5,
      review:
        "Excellent location, clean rooms, and genuinely helpful staff. The dining experience was a standout for our group.",
      source: "direct",
      reviewDate: "2026-07-18",
      featured: true,
      order: 5,
    },
  ];

  for (const testimonial of testimonials) {
    await upsertByGuestName(testimonial.guestName, testimonial);
    console.log(`  testimonial: ${testimonial.guestName}`);
  }

  console.log("\nDone. Seeded Content Hub dummy data.");
}

run().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
