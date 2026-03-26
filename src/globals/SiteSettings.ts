import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  access: { read: () => true },
  fields: [
    { name: 'companyName', type: 'text', defaultValue: 'CoffeeMan' },
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'address', type: 'textarea' },
    {
      name: 'aboutContent',
      type: 'richText',
      admin: { description: 'Текст страницы «О нас»' },
    },
    {
      name: 'contactsContent',
      type: 'richText',
      admin: { description: 'Доп. текст на «Контакты» (контакты также из полей выше)' },
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'heroSlides',
      type: 'array',
      label: 'Слайды на главной',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'textarea' },
        { name: 'link', type: 'text', admin: { description: 'URL кнопки (опционально)' } },
      ],
    },
  ],
}
