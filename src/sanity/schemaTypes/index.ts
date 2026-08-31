import { type SchemaTypeDefinition } from 'sanity'

import { galleryImageType } from './galleryImageType'
import { blockContentType } from './blockContentType'
import { authorType } from './authorType'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { tagType } from './tagType'
import { testimonialType } from './testimonialType'
import { enquiryType } from './enquiryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    galleryImageType,
    blockContentType,
    authorType,
    categoryType,
    tagType,
    postType,
    testimonialType,
    enquiryType,
  ],
}
