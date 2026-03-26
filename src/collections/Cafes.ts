import type { CollectionConfig } from 'payload'

export const Cafes: CollectionConfig = {
  slug: 'cafes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'slug'],
    listSearchableFields: ['name', 'slug', 'address'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'address', type: 'text', required: true },
    { name: 'city', type: 'text' },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'lat', type: 'number' },
        { name: 'lng', type: 'number' },
      ],
    },
    { name: 'hours', type: 'textarea', admin: { description: 'Часы работы' } },
    { name: 'photos', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'description', type: 'richText' },
  ],
}
