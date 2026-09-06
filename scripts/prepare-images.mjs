/**
 * One-off image preparation for the real property photography.
 *
 * Reads the delivered folders under public/images/, renames to kebab-case,
 * resizes to a web-sane width and writes a tidy structure. Source folders are
 * left untouched so the originals stay available.
 *
 * Usage:
 *   node scripts/prepare-images.mjs
 */

import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Originals are archived outside the repo so they are never committed or deployed.
const SOURCE = resolve(__dirname, "../../_assets-originals/_delivered");
const IMAGES = resolve(__dirname, "../public/images");
const MAX_WIDTH = 2400;
const QUALITY = 80;

// sourceFolder -> [destinationFolder, basename]
const GROUPS = [
  ["Hotel Ambience", "property", "ambience"],
  ["Hotel Reception and interiors", "property", "interior"],
  ["Pakhtoon Restaurant Images", "dining/pakhtoon", "pakhtoon"],
  ["Walkway Restaurant and Areca Cafe Images", "dining/walkway", "walkway"],
  ["Areca Bistro", "dining/areca-bistro", "areca-bistro"],
  ["Areca Lawns Images", "venues/areca-lawns", "areca-lawns"],
  ["Madhusudan Hall Images", "venues/madhusudan-hall", "madhusudan-hall"],
  ["Central Conference Hall Images", "venues/conference-hall", "conference-hall"],
  ["Gazebo Images", "venues/gazebo", "gazebo"],
];

const OBSOLETE = ["home-hero-2.1.jpg"];

// "Want to Use this Photo.JPG" is the client's preferred shot — sort it first.
const preferredFirst = (files) =>
  [...files].sort((a, b) => {
    const score = (name) =>
      /want to use/i.test(name) ? 0 : /key photo/i.test(name) ? 1 : 2;
    return score(a) - score(b) || a.localeCompare(b, undefined, { numeric: true });
  });

const isImage = (name) => /\.(jpe?g|png|webp)$/i.test(name);

async function run() {
  const mapping = [];

  for (const [sourceName, destFolder, base] of GROUPS) {
    const sourceDir = join(SOURCE, sourceName);
    if (!existsSync(sourceDir)) {
      console.log(`skip     ${sourceName} (not found)`);
      continue;
    }

    const destDir = join(IMAGES, destFolder);
    mkdirSync(destDir, { recursive: true });

    const files = preferredFirst(readdirSync(sourceDir).filter(isImage));
    let index = 1;

    for (const file of files) {
      const outName = `${base}-${String(index).padStart(2, "0")}.jpg`;
      const outPath = join(destDir, outName);
      const inPath = join(sourceDir, file);

      await sharp(inPath)
        .rotate()
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toFile(outPath);

      const before = statSync(inPath).size / 1048576;
      const after = statSync(outPath).size / 1048576;
      mapping.push({
        from: `${sourceName}/${file}`,
        to: `/images/${destFolder}/${outName}`,
      });
      console.log(
        `${`/images/${destFolder}/${outName}`.padEnd(46)} ${before.toFixed(2)}MB -> ${after.toFixed(2)}MB   (${file})`,
      );
      index += 1;
    }
  }

  for (const name of OBSOLETE) {
    const target = join(IMAGES, name);
    if (existsSync(target)) {
      rmSync(target, { recursive: true, force: true });
      console.log(`removed  ${name}`);
    }
  }

  console.log(`\n${mapping.length} images prepared.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
