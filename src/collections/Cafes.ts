import type { CollectionConfig } from 'payload'

export const Cafes: CollectionConfig = {
  slug: 'cafes',
  labels: { singular: 'Кофейня', plural: 'Кофейни' },
  admin: {
    useAsTitle: 'name',
    group: 'Контент',
    defaultColumns: ['name', 'city', 'slug'],
    listSearchableFields: ['name', 'slug', 'address'],
    description: 'Точки на странице «Кофейни».',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'address', type: 'text', required: true },
    { name: 'phone', type: 'text', admin: { description: 'Телефон точки (если пусто — общий из настроек сайта)' } },
    {
      name: 'menuUrl',
      type: 'text',
      admin: { description: 'Ссылка «Посмотреть меню» (внешний PDF/сайт)' },
    },
    { name: 'sort', type: 'number', defaultValue: 0, admin: { description: 'Порядок на странице кофеен' } },
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
