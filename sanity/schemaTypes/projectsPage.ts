export const projectsPage = {
  name: 'projectsPage',
  title: 'Projects Page Settings',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Section Eyebrow',
      type: 'string',
      initialValue: 'Portfolio',
    },
    {
      name: 'title',
      title: 'Section Title (HTML allowed)',
      type: 'string',
      initialValue: 'Featured <span class="text-gradient-accent">Case Studies</span>',
      description: 'The main title of the projects section. HTML tags like <span> are supported.',
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      initialValue: 'A curated selection of my latest technical achievements and creative builds.',
    },
  ],
};
