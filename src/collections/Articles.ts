import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Статья', plural: 'Статьи' },
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'publishedAt', 'slug'],
    listSearchableFields: ['title', 'slug'],
    description: 'Блог: текст, обложка и поля для поисковых сниппетов.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контент',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'slug', type: 'text', required: true, unique: true, index: true },
            {
              name: 'publishedAt',
              type: 'date',
              admin: { date: { pickerAppearance: 'dayAndTime' }, description: 'Дата публикации в ленте' },
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Обложка карточки и Open Graph' },
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              admin: { description: 'Доп. фото для слайдера на странице статьи' },
            },
            { name: 'excerpt', type: 'textarea', admin: { description: 'Краткий анонс (при необходимости в списке)' } },
            { name: 'content', type: 'richText', required: true },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: { description: 'Title для поиска; если пусто — используется заголовок статьи' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              admin: { description: 'Meta description (рекомендуется до ~160 символов)' },
            },
          ],
        },
      ],
    },
  ],
}
