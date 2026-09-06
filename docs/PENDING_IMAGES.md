# Pending images

Placeholders still using stock (Unsplash) photography. Replace the paths listed
below once real photography is supplied, then delete the corresponding row.

| # | Where it appears | File + location | Needed |
|---|---|---|---|
| 1 | `/stay` + home "Discover our rooms" | `src/lib/site-data.ts` → `rooms[0].images` (3 URLs) | Deluxe Room — 3 photos |
| 2 | `/stay` + home "Discover our rooms" | `src/lib/site-data.ts` → `rooms[1].images` (3 URLs) | Executive Room — 3 photos |
| 3 | `/stay` + home "Discover our rooms" | `src/lib/site-data.ts` → `rooms[2].images` (3 URLs) | The Suite — 3 photos |
| 4 | `/stay` hero banner | `src/lib/site-data.ts` → `siteSettings.stayHeroImage` | One wide room/property shot |
| 5 | `/events` venue card | `src/lib/site-data.ts` → `venues[0].image` (Bahar Lawns) | Bahar Lawns — no photos supplied |
| 6 | Guest review avatars | `src/lib/constants.ts` → `FALLBACK_IMAGES.testimonial` | Generic avatar, or drop avatars entirely |

## Also missing

- **Gallery has no "Rooms" category.** The category was dropped because there is
  no real room photography. It returns automatically once item 1–3 are supplied.
- **`/menu/walkway`** has no PDF and is set to `active: false` in Sanity. All
  seating areas currently share the menu at `/menu/pakhtoon`.

## Already using real photography

Home hero, all gallery images, Madhusudan Hall, Central Conference Hall,
Areca Lawns, Gazebo, Pakhtoon, Walkway, Areca Bistro, social/OG image.
