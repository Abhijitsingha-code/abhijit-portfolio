export const contactPage = {
  name: 'contactPage',
  title: 'Contact Page Settings',
  type: 'document',
  fields: [
    {
      name: 'eyebrow',
      title: 'Section Eyebrow',
      type: 'string',
      initialValue: 'Contact',
    },
    {
      name: 'title',
      title: 'Section Title (HTML allowed)',
      type: 'string',
      initialValue: "Let's <span class=\"text-gradient-primary\">Build</span> Something",
      description: 'The main title of the contact section. HTML tags like <span> are supported.',
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      initialValue: "Have a project in mind, or just want to say hi? I'm always open to new opportunities and conversations.",
    },
    {
      name: 'location',
      title: 'Location Value',
      type: 'string',
      initialValue: 'India · Remote',
    },
    {
      name: 'responseTime',
      title: 'Response Time Value',
      type: 'string',
      initialValue: 'Within 24 hours',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. GitHub, LinkedIn, Twitter',
            },
            {
              name: 'iconName',
              title: 'Lucide Icon Name',
              type: 'string',
              description: 'PascalCase icon name from lucide-react, e.g. Github, Linkedin, Twitter, Link2',
            },
            {
              name: 'href',
              title: 'URL Link',
              type: 'url',
            },
            {
              name: 'color',
              title: 'Hover Icon Color (Hex / RGBA)',
              type: 'string',
              description: 'e.g. #f0f6fc, #0a66c2, #1d9bf0',
            },
          ],
        },
      ],
    },
  ],
};
