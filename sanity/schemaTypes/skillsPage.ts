export const skillsPage = {
  name: 'skillsPage',
  title: 'Skills Page Settings',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Section Eyebrow',
      type: 'string',
      initialValue: 'Toolkit',
    },
    {
      name: 'title',
      title: 'Section Title (HTML allowed)',
      type: 'string',
      initialValue: 'Technical <span class="text-gradient-accent">Arsenal</span>',
      description: 'The main title of the skills section. HTML tags like <span> are supported.',
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      initialValue: 'The technologies and tools I use to bring ideas to life.',
    },
  ],
};
