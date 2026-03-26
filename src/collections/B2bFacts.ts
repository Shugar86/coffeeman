import type { CollectionConfig } from 'payload'

export const B2bFacts: CollectionConfig = {
  slug: 'b2b-facts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'value', 'sort'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'value', type: 'text', required: true },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'sort', type: 'number', defaultValue: 0 },
  ],
}
