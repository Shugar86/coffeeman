import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'productType', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'price', type: 'number', required: true, min: 0 },
    {
      name: 'productType',
      type: 'select',
      required: true,
      options: [
        { label: 'Кофе', value: 'coffee' },
        { label: 'Чай', value: 'tea' },
      ],
      index: true,
    },
    {
      name: 'tastes',
      type: 'select',
      hasMany: true,
      admin: { description: 'Вкусовые ноты / теги' },
      options: [
        { label: 'Цитрус', value: 'citrus' },
        { label: 'Шоколад', value: 'chocolate' },
        { label: 'Орех', value: 'nutty' },
        { label: 'Цветочный', value: 'floral' },
        { label: 'Ягодный', value: 'berry' },
        { label: 'Пряный', value: 'spicy' },
        { label: 'Дымный', value: 'smoky' },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      index: true,
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      hasMany: false,
      index: true,
    },
    {
      name: 'popularity',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Для сортировки «популярное»' },
    },
    { name: 'isNew', type: 'checkbox', defaultValue: false },
    {
      name: 'sensoryDensity',
      type: 'number',
      min: 1,
      max: 5,
      admin: { description: 'Плотность тела 1–5' },
    },
    {
      name: 'sensoryAcidity',
      type: 'number',
      min: 1,
      max: 5,
      admin: { description: 'Кислотность 1–5' },
    },
    {
      name: 'sensoryBitterness',
      type: 'number',
      min: 1,
      max: 5,
      admin: { description: 'Горечь 1–5' },
    },
    {
      name: 'grindOptions',
      type: 'array',
      labels: { singular: 'Помол', plural: 'Помол' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: false,
    },
  ],
}
