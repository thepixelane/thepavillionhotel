import type { StructureResolver } from 'sanity/structure'
import { ImagesIcon } from '@sanity/icons/Images'
import { DocumentTextIcon } from '@sanity/icons/DocumentText'
import { TagIcon } from '@sanity/icons/Tag'
import { UserIcon } from '@sanity/icons/User'
import { SparklesIcon as TestimonialIcon } from '@sanity/icons/Sparkles'
import { EnvelopeIcon } from '@sanity/icons/Envelope'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('The Pavillion')
    .items([
      S.documentTypeListItem('galleryImage').title('Gallery images').icon(ImagesIcon),
      S.divider(),
      S.listItem()
        .title('Content Hub')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Content Hub')
            .items([
              S.documentTypeListItem('post').title('Posts').icon(DocumentTextIcon),
              S.documentTypeListItem('post')
                .id('offerPosts')
                .title('Offers & Campaigns')
                .icon(TagIcon)
                .child(
                  S.documentList()
                    .title('Offers & Campaigns')
                    .schemaType('post')
                    .filter(
                      '_type == "post" && contentType in ["offer", "festival", "restaurantUpdate", "announcement"]',
                    ),
                ),
              S.documentTypeListItem('category').title('Categories').icon(TagIcon),
              S.documentTypeListItem('tag').title('Tags').icon(TagIcon),
              S.documentTypeListItem('author').title('Authors').icon(UserIcon),
            ]),
        ),
      S.documentTypeListItem('testimonial').title('Testimonials').icon(TestimonialIcon),
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
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'galleryImage',
            'post',
            'category',
            'tag',
            'author',
            'testimonial',
            'enquiry',
          ].includes(item.getId()!),
      ),
    ])
