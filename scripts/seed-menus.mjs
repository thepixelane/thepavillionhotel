/**
 * Seed script for menu (PDF) documents used by the /menu/[slug] routes.
 *
 * Idempotent: re-running updates titles/order and only uploads a PDF when the
 * document does not already have one (so Studio uploads are never overwritten).
 *
 * Usage:
 *   node scripts/seed-menus.mjs
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "fs";
import { basename, resolve, dirname } from "path";
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

// Source PDFs live outside the repo so they are not committed or deployed.
const PDF_SOURCE = "../..";

const MENUS = [
  { slug: "pakhtoon", title: "The Pavillion Restaurant", file: `${PDF_SOURCE}/PakhtoonMenu.pdf`, order: 1, active: true },
  // Retired: all seating areas share the food menu above. Kept so printed QR codes still resolve.
  { slug: "walkway", title: "Walkway Seating", file: `${PDF_SOURCE}/WalkwayMenu.pdf`, order: 2, active: false },
  { slug: "bar", title: "Bar Menu", file: `${PDF_SOURCE}/BarMenu.pdf`, order: 3, active: true },
  { slug: "room-service", title: "In-Room Dining", file: `${PDF_SOURCE}/RoomMenu.pdf`, order: 4, active: true },
];

async function uploadPdf(absPath) {
  const asset = await client.assets.upload("file", createReadStream(absPath), {
    filename: basename(absPath),
    contentType: "application/pdf",
  });
  return asset._id;
}

async function run() {
  for (const menu of MENUS) {
    const existing = await client.fetch(
      `*[_type == "menu" && slug.current == $slug][0]{_id, "hasFile": defined(file.asset)}`,
      { slug: menu.slug }
    );

    const doc = {
      _type: "menu",
      title: menu.title,
      slug: { _type: "slug", current: menu.slug },
      order: menu.order,
      active: menu.active,
    };

    const absPath = resolve(__dirname, "..", menu.file);
    const localPdfExists = existsSync(absPath);

    if (localPdfExists && !existing?.hasFile) {
      const assetId = await uploadPdf(absPath);
      doc.file = { _type: "file", asset: { _type: "reference", _ref: assetId } };
      console.log(`  uploaded ${menu.file}`);
    }

    if (existing?._id) {
      await client.patch(existing._id).set(doc).commit();
      console.log(`updated  menu/${menu.slug}${existing.hasFile ? " (kept existing PDF)" : ""}`);
    } else {
      const created = await client.create({ _id: `menu-${menu.slug}`, ...doc });
      console.log(`created  menu/${menu.slug} -> ${created._id}`);
    }

    if (!localPdfExists && !existing?.hasFile) {
      console.log(`  note: no PDF yet for "${menu.slug}" — upload one in Studio`);
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
