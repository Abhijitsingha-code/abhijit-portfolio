// Sanity document schema: About Me
// Place this in your Sanity Studio project under schemas/

export const about = {
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (HTML allowed)',
      type: 'string',
      description: 'The title of the section, e.g. "Who <span class=\\"text-gradient-accent\\">I Am</span>"',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'The subtitle below the main heading.',
    },
    {
      name: 'bio',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'Paragraphs of text describing yourself.',
    },
    {
      name: 'stats',
      title: 'Stats Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            { name: 'value', type: 'string', title: 'Value (e.g. "3+")' },
            { name: 'label', type: 'string', title: 'Label (e.g. "Years Experience")' },
            { name: 'color', type: 'string', title: 'Accent Color Hex (e.g. "#4f8ef7")' },
          ],
        },
      ],
    },
    {
      name: 'highlights',
      title: 'Highlights (Quick Tags)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'highlight',
          fields: [
            { name: 'iconName', type: 'string', title: 'Lucide Icon Name (e.g. "Briefcase")' },
            { name: 'label', type: 'string', title: 'Label (e.g. "Open to Freelance")' },
            { name: 'color', type: 'string', title: 'Icon Color Hex (e.g. "#60a5fa")' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
};
