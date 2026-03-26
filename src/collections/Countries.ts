import type { CollectionConfig } from 'payload'

export const Countries: CollectionConfig = {
  slug: 'countries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'slug'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'code', type: 'text', admin: { description: 'ISO или короткий код' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
  ],
}
