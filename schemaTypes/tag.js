import { AutoSlugInput } from '../src/components/AutoSlugInput'

export default {
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      components: { input: AutoSlugInput },
      validation: (Rule) => Rule.required(),
    },
  ],
}
