import type { GlobalConfig } from 'payload'

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'SEO по умолчанию',
  access: { read: () => true },
  fields: [
    { name: 'defaultTitle', type: 'text' },
    { name: 'defaultDescription', type: 'textarea' },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
  ],
}
