import {HomeIcon} from '@sanity/icons/Home'
import {defineField, defineType} from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(20).max(180),
    }),
    defineField({
      name: 'icon',
      title: 'Icon keyword',
      type: 'string',
      options: {
        list: [
          {title: 'Car', value: 'car'},
          {title: 'Clock', value: 'clock'},
          {title: 'Shield', value: 'shield'},
          {title: 'Sparkles', value: 'sparkles'},
          {title: 'Bell', value: 'bell'},
          {title: 'Phone', value: 'phone'},
        ],
      },
      initialValue: 'sparkles',
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      initialValue: 'Enquire now',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
      description: 'Optional external or tel/wa link for this service.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
      available: 'available',
    },
    prepare(selection) {
      const {title, subtitle, available} = selection
      return {
        title: `${title || 'Service'}${available === false ? ' (Unavailable)' : ''}`,
        subtitle,
      }
    },
  },
})
