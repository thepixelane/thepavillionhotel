import { type SchemaTypeDefinition } from 'sanity'

import { siteSettingsType } from './siteSettingsType'
import { roomType } from './roomType'
import { venueType } from './venueType'
import { diningVenueType } from './diningVenueType'
import { galleryImageType } from './galleryImageType'
import { blockContentType } from './blockContentType'
import { authorType } from './authorType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { tagType } from './tagType'
import { testimonialType } from './testimonialType'
import { serviceType } from './serviceType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettingsType,
    roomType,
    venueType,
    diningVenueType,
    galleryImageType,
    blockContentType,
    authorType,
    categoryType,
    tagType,
    postType,
    testimonialType,
    serviceType,
  ],
}
