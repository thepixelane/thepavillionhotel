import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons/Envelope'

export const enquiryType = defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Contact page', value: 'contact' },
          { title: 'Events page', value: 'events' },
          { title: 'Banquet enquiry', value: 'banquet' },
          { title: 'Stay booking flow', value: 'stay' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().min(1).max(120),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.max(4000),
    }),
    defineField({
      name: 'eventType',
      title: 'Event type',
      type: 'string',
      hidden: ({ document }) => document?.source !== 'events' && document?.source !== 'banquet',
    }),
    defineField({
      name: 'eventDate',
      title: 'Event / stay date',
      type: 'date',
    }),
    defineField({
      name: 'guests',
      title: 'Guests / capacity',
      type: 'string',
    }),
    defineField({
      name: 'handled',
      title: 'Handled',
      type: 'boolean',
      description: 'Tick once this enquiry has been actioned by the team.',
      initialValue: false,
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal notes',
      type: 'text',
      rows: 3,
      description: 'Not visible to guests.',
    }),
    defineField({
      name: 'ipHash',
      title: 'IP hash',
      type: 'string',
      readOnly: true,
      description: 'Salted hash for basic abuse tracking. Not a raw IP address.',
    }),
    defineField({
      name: 'userAgent',
      title: 'User agent',
      type: 'string',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Most recent',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      source: 'source',
      submittedAt: 'submittedAt',
      handled: 'handled',
    },
    prepare({ name, source, submittedAt, handled }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
        : ''
      const suffix = handled ? ' — handled' : ''
      return {
        title: name || 'Enquiry',
        subtitle: `${source || 'unknown'} · ${date}${suffix}`,
      }
    },
  },
})
