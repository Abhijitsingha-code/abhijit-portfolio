// Sanity document schema: Profile
// Place this in your Sanity Studio project under schemas/

export const profile = {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'Your full name displayed in the Navbar and throughout the site.',
    },
    {
      name: 'title',
      title: 'Hero Title (HTML allowed)',
      type: 'string',
      description: 'Main headline shown on the Hero section. You can use simple HTML like <span> tags.',
    },
    {
      name: 'description',
      title: 'Hero Sub-headline',
      type: 'text',
      rows: 3,
      description: 'Short description shown beneath the Hero title.',
    },
    {
      name: 'resumeFile',
      title: 'Résumé (PDF)',
      type: 'file',
      description: 'Upload your résumé PDF. The public URL will be exposed as resumeUrl.',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Your primary contact email address.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
    },
  },
};
