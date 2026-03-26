import type { CollectionConfig } from 'payload'

export const B2bFacts: CollectionConfig = {
  slug: 'b2b-facts',
  labels: { singular: 'Факт B2B', plural: 'Факты B2B' },
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'value', 'sort'],
    description: 'Цифры и тезисы для блока B2B на сайте.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'value', type: 'text', required: true },
    { name: 'icon', type: 'upload', relationTo: 'media' },
    { name: 'sort', type: 'number', defaultValue: 0 },
  ],
}
