import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Abhijit Singha',

  projectId: 'sivkbzk2',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Profile Settings (Global/Hero)
            S.listItem()
              .title('Profile Settings (Global & Hero)')
              .id('profile')
              .child(
                S.document()
                  .schemaType('profile')
                  .documentId('a93f198e-5472-42fa-91d9-26b3a30eb06c')
              ),
            // Singleton: About Page
            S.listItem()
              .title('About Page')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            // Singleton: Skills Page Header
            S.listItem()
              .title('Skills Page Header')
              .id('skillsPage')
              .child(S.document().schemaType('skillsPage').documentId('skillsPage')),
            // Singleton: Projects Page Header
            S.listItem()
              .title('Projects Page Header')
              .id('projectsPage')
              .child(S.document().schemaType('projectsPage').documentId('projectsPage')),
            // Singleton: Contact Page
            S.listItem()
              .title('Contact Page')
              .id('contactPage')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
            S.divider(),
            // Collection: Projects
            S.documentTypeListItem('project').title('Projects List'),
            // Collection: Skills
            S.documentTypeListItem('skill').title('Skills List'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter((template) => !['profile', 'about', 'skillsPage', 'projectsPage', 'contactPage'].includes(template.id)),
  },
})
