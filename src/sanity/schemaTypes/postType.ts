import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(8).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contentType',
      title: 'Content type',
      type: 'string',
      options: {
        list: [
          {title: 'Blog', value: 'blog'},
          {title: 'Hotel Offer', value: 'offer'},
          {title: 'Festival Celebration', value: 'festival'},
          {title: 'Restaurant Update', value: 'restaurantUpdate'},
          {title: 'Announcement', value: 'announcement'},
        ],
        layout: 'radio',
      },
      initialValue: 'blog',
      validation: (rule) => rule.required(),
      description: 'Determines where this content appears on the website.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Feature this on the blog landing and homepage highlights.',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(40).max(220),
      description: 'Short summary used in cards and social previews.',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (rule) => rule.required(),
        })
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'tag'}})],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'validFrom',
      title: 'Valid from',
      type: 'datetime',
      hidden: ({document}) => !['offer', 'festival', 'restaurantUpdate'].includes(document?.contentType),
      description: 'Optional start window for offers and campaign-style content.',
    }),
    defineField({
      name: 'validTo',
      title: 'Valid to',
      type: 'datetime',
      hidden: ({document}) => !['offer', 'festival', 'restaurantUpdate'].includes(document?.contentType),
      validation: (rule) =>
        rule.custom((value, context) => {
          const from = context?.document?.validFrom
          if (!value || !from) return true
          return new Date(value).getTime() >= new Date(from).getTime()
            ? true
            : 'Valid to must be after valid from.'
        }),
      description: 'Optional end window. Expired offers are hidden from Offers page.',
    }),
    defineField({
      name: 'estimatedReadTime',
      title: 'Estimated read time (minutes)',
      type: 'number',
      validation: (rule) => rule.min(1).max(60),
      description: 'Optional override. If empty, the site computes read time from content.',
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO title',
          type: 'string',
          validation: (rule) => rule.max(70),
        }),
        defineField({
          name: 'description',
          title: 'SEO description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      status: 'status',
      contentType: 'contentType',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author, status, contentType} = selection
      const statusLabel = status === 'published' ? 'Published' : 'Draft'
      return {
        ...selection,
        subtitle: `${statusLabel}${contentType ? ` · ${contentType}` : ''}${author ? ` · by ${author}` : ''}`,
      }
    },
  },
})
