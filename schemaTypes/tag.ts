import { defineType, defineField } from 'sanity'
import { AutoSlugInput } from '../src/components/AutoSlugInput'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      components: { input: AutoSlugInput },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
