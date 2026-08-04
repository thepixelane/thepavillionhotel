import {SparklesIcon} from '@sanity/icons/Sparkles'
import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'guestName',
      title: 'Guest name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          {title: 'Google', value: 'google'},
          {title: 'Booking.com', value: 'booking'},
          {title: 'Direct', value: 'direct'},
        ],
        layout: 'radio',
      },
      initialValue: 'google',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Link to original review profile or listing page.',
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review date',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
    }),
    defineField({
      name: 'guestImage',
      title: 'Guest image (optional)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Show this testimonial on homepage and key sections.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first among featured testimonials.',
    }),
  ],
  orderings: [
    {
      title: 'Featured first',
      name: 'featuredFirst',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'order', direction: 'asc'},
        {field: 'reviewDate', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'guestName',
      subtitle: 'review',
      rating: 'rating',
      media: 'guestImage',
    },
    prepare(selection) {
      const {title, subtitle, rating} = selection
      const clipped = typeof subtitle === 'string' ? subtitle.slice(0, 72) : ''
      return {
        title: title || 'Testimonial',
        subtitle: `${'★'.repeat(Math.max(0, Math.min(5, Number(rating) || 0)))} ${clipped}`,
        media: selection.media,
      }
    },
  },
})
