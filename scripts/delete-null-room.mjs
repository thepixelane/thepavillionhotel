/**
 * One-off: delete the null room document (name: null, details: null).
 * Run: node scripts/delete-null-room.mjs
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
} catch {}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || envVars.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || envVars.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN || envVars.SANITY_WRITE_TOKEN;

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

const nullDocs = await client.fetch(`*[_type == "room" && !defined(name)]{_id}`);
if (nullDocs.length === 0) {
  console.log("No null documents found.");
} else {
  for (const doc of nullDocs) {
    await client.delete(doc._id);
    console.log(`Deleted: ${doc._id}`);
  }
  console.log("Done.");
}
