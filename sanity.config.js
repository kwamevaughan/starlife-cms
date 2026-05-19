import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'starlife-studio',
  title: 'StarLife Assurance CMS',
  projectId: 'bh7t819v',
  dataset: 'production',
  basePath: '/',
  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
