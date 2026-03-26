import type { GlobalConfig } from 'payload'

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'SEO по умолчанию',
  admin: { group: 'SEO', description: 'Базовые title/description/OG для всего сайта.' },
  access: { read: () => true },
  fields: [
    { name: 'defaultTitle', type: 'text' },
    { name: 'defaultDescription', type: 'textarea' },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
  ],
}
