import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  // Required: dataset is private — token is server-only (no NEXT_PUBLIC_ prefix)
  token: process.env.SANITY_WRITE_TOKEN,
})
