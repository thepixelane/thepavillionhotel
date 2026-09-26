import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  // Private dataset reads stay server-only and use the least-privileged token.
  token: process.env.SANITY_READ_TOKEN ?? process.env.SANITY_WRITE_TOKEN,
})
