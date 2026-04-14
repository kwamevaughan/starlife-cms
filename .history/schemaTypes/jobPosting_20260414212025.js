export default {
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
        ],
      },
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'qualifications',
      title: 'Qualifications',
      type: 'text',
      rows: 3,
    },
    {
      name: 'remuneration',
      title: 'Remuneration & Support',
      type: 'text',
      rows: 3,
    },
    {
      name: 'deadline',
      title: 'Application Deadline',
      type: 'date',
    },
    {
      name: 'applyUrl',
      title: 'Apply URL',
      type: 'url',
      description: 'External link to application form (leave blank to use built-in form)',
    },
    {
      name: 'isOpen',
      title: 'Position Open',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'department' },
  },
}
