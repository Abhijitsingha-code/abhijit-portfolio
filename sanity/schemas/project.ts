// Sanity document schema: Project
// Place this in your Sanity Studio project under schemas/

export const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Preview Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bg',
      title: 'Background Gradient (CSS)',
      type: 'string',
      description: 'Optional CSS gradient string, e.g. linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.2))',
    },
    {
      name: 'tags',
      title: 'Technology Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'sourceCodeUrl',
      title: 'Source Code URL',
      type: 'url',
    },
    {
      name: 'liveSiteUrl',
      title: 'Live Site URL',
      type: 'url',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave empty to sort by creation date.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'liveSiteUrl',
    },
  },
};
