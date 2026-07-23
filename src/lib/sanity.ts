import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID;

export const sanityDataset = process.env.SANITY_DATASET ?? "production";
export const sanityApiVersion = process.env.SANITY_API_VERSION ?? "2024-01-01";

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
    })
  : null;

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch<T>(query, params);
}
