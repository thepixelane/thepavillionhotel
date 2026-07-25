import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons/Cog'
import { HomeIcon } from '@sanity/icons/Home'
import { CalendarIcon } from '@sanity/icons/Calendar'
import { SparklesIcon } from '@sanity/icons/Sparkles'
import { ImagesIcon } from '@sanity/icons/Images'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('The Pavillion')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
      S.divider(),
      S.documentTypeListItem('room').title('Rooms').icon(HomeIcon),
      S.documentTypeListItem('venue').title('Event venues').icon(CalendarIcon),
      S.documentTypeListItem('diningVenue').title('Dining venues').icon(SparklesIcon),
      S.documentTypeListItem('galleryImage').title('Gallery images').icon(ImagesIcon),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['siteSettings', 'room', 'venue', 'diningVenue', 'galleryImage'].includes(item.getId()!),
      ),
    ])
