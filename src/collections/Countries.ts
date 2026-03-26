import type { CollectionConfig } from 'payload'

export const Countries: CollectionConfig = {
  slug: 'countries',
  labels: { singular: 'Страна', plural: 'Страны' },
  admin: {
    useAsTitle: 'name',
    group: 'Магазин',
    defaultColumns: ['name', 'code', 'slug'],
    description: 'Фильтр по стране происхождения в каталоге.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'code', type: 'text', admin: { description: 'ISO или короткий код' } },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
  ],
}
