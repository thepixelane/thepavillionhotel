import { type SchemaTypeDefinition } from 'sanity'

import { testimonialType } from './testimonialType'
import { enquiryType } from './enquiryType'
import { menuType } from './menuType'
import { highlightType } from './highlightType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [menuType, testimonialType, highlightType, enquiryType],
}
