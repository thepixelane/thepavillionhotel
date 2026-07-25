import { type SchemaTypeDefinition } from 'sanity'

import { siteSettingsType } from './siteSettingsType'
import { roomType } from './roomType'
import { venueType } from './venueType'
import { diningVenueType } from './diningVenueType'
import { galleryImageType } from './galleryImageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettingsType, roomType, venueType, diningVenueType, galleryImageType],
}
