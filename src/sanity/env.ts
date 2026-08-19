const getSanityValue = (publicKey: string, legacyKey: string) =>
  process.env[publicKey] || process.env[legacyKey] || undefined

export const apiVersion =
  getSanityValue('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01'

export const dataset =
  getSanityValue('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production'

export const projectId =
  getSanityValue('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID') || 'cnyln2dk'
