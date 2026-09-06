import type { StructureResolver } from 'sanity/structure'
import { SparklesIcon as TestimonialIcon } from '@sanity/icons/Sparkles'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { DocumentPdfIcon } from '@sanity/icons/DocumentPdf'
import { StarIcon } from '@sanity/icons/Star'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('The Pavillion')
    .items([
      S.documentTypeListItem('menu').title('Menus (PDF)').icon(DocumentPdfIcon),
      S.documentTypeListItem('highlight').title('Highlights').icon(StarIcon),
      S.documentTypeListItem('testimonial').title('Reviews').icon(TestimonialIcon),
      S.divider(),
      S.listItem()
        .title('Enquiries')
        .icon(EnvelopeIcon)
        .child(
          S.documentList()
            .title('Enquiries')
            .schemaType('enquiry')
            .filter('_type == "enquiry"')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }]),
        ),
    ])
