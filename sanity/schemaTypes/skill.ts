// Sanity document schema: Skill
// Place this in your Sanity Studio project under schemas/

export const skill = {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'iconName',
      title: 'Lucide Icon Name',
      type: 'string',
      description: 'Exact Lucide icon name (PascalCase), e.g. "Database", "Server", "Code2". See lucide.dev for all icons.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
          { title: 'Dev Tools', value: 'Tools' },
          { title: 'Mobile', value: 'Mobile' },
          { title: 'Other', value: 'Other' },
        ],
      },
    },
    {
      name: 'color',
      title: 'Accent Color (hex / rgba)',
      type: 'string',
      description: 'CSS color string for the skill icon, e.g. #61dafb',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the category.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
};
