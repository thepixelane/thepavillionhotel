import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const envRaw = readFileSync(".env.local", "utf8");
const env = {};
for (const line of envRaw.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const i = trimmed.indexOf("=");
  if (i < 0) continue;
  env[trimmed.slice(0, i)] = trimmed.slice(i + 1).replace(/^"|"$/g, "");
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  token: env.SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

for (const type of ["category", "tag", "author", "post", "testimonial"]) {
  const count = await client.fetch("count(*[_type == $type])", { type });
  console.log(`${type}: ${count}`);
}
