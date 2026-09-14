# Pending images

This file tracks the remaining placeholders still needing real photography or a final asset decision.

## Completed / now using real photography

- Deluxe Room photos supplied and wired in under `public/images/stay/deluxe-room/`
- Executive Room photos supplied and wired in under `public/images/stay/executive-room/`
- Suite photos supplied and wired in under `public/images/stay/suite-room/`
- `/stay` hero banner updated to a real room image
- Gallery Rooms category restored using the supplied room photography

## Remaining placeholders

| # | Where it appears | File + location | Needed |
|---|---|---|---|
| 1 | `/events` venue card | `src/lib/site-data.ts` → `venues[0].image` (Bahar Lawns) | Bahar Lawns — no photos supplied |
| 2 | Guest review avatars | `src/lib/constants.ts` → `FALLBACK_IMAGES.testimonial` | Generic avatar, or drop avatars entirely |

## Also missing

- **`/menu/walkway`** has no PDF and is set to `active: false` in Sanity. All
  seating areas currently share the menu at `/menu/pakhtoon`.

## Already using real photography

Home hero, all gallery images, Deluxe Room, Executive Room, Suite Room,
Madhusudan Hall, Central Conference Hall, Areca Lawns, Gazebo, Pakhtoon,
Walkway, Areca Bistro, social/OG image.


## Image downscaling + format conversion instructions

Use this exact workflow to resize and convert existing images for the site:

1. Put the original source files in a separate archive folder outside the repo
   - Example pattern: a folder like `_delivered`
   - Keep the originals untouched

2. Run a conversion script that:
   - reads the source image
   - rotates if needed
   - resizes to web-safe width
   - converts to JPEG
   - writes to the final app folder under `images`

3. Use these rules:
   - hero: max width 1200–1800 px
   - room/gallery: max width 600–1200 px
   - lightbox: max width 1200–1800 px
   - quality target: about 80
   - output format: JPEG for photos
   - use PNG only for transparent assets, rare here

4. Keep naming consistent:
   - kebab-case
   - example:
     - property/ambience-01.jpg
     - stay/deluxe-room/deluxe-room-1.jpeg
     - venues/areca-lawns/areca-lawns-01.jpg

5. Do not use the original large files directly in the app

### Reference script
This is the project’s working example:
- `prepare-images.mjs`

The important part is this logic:
- `resize({ width: MAX_WIDTH, withoutEnlargement: true })`
- `.jpeg({ quality: 80, mozjpeg: true })`

### Exact format requirement
For future image batches, the expected output is:
- final files in `images`
- JPG/JPEG only for real photos
- folders organized by section
- web-safe dimensions and quality
- no oversized originals in the app

If you want, send me the new image folder you want processed and I’ll convert it into the exact required setup format for this site.