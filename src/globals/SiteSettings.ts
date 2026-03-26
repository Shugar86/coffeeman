import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  admin: { group: 'Сайт', description: 'Контакты, слайдер главной, тексты страниц.' },
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
    {
      type: 'collapsible',
      label: 'Главная — блок «История / кофейни»',
      fields: [
        {
          name: 'homeStoryHeading',
          type: 'text',
          admin: { description: 'Заголовок секции под hero' },
        },
        {
          name: 'homeStoryBody',
          type: 'textarea',
          admin: { description: 'Текст слева (пара абзацев)' },
        },
        {
          name: 'homePolaroids',
          type: 'array',
          label: 'Polaroid-фото справа',
          fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
        },
      ],
    },
    {
      name: 'homeStats',
      type: 'array',
      label: 'Счётчики на главной',
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'Напр. 3, 126т, 100+' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'Подпись под числом' } },
      ],
    },
    {
      type: 'collapsible',
      label: 'О компании — визуал',
      fields: [
        {
          name: 'aboutHeroImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Фото в шапке страницы «О нас»' },
        },
        {
          name: 'aboutPolaroids',
          type: 'array',
          fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
        },
        {
          name: 'aboutStats',
          type: 'array',
          label: 'Статистика (бордовая полоса)',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
        {
          name: 'masterclasses',
          type: 'array',
          label: 'Мастер-классы (3 карточки)',
          maxRows: 6,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'textarea', required: true },
            { name: 'image', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    {
      name: 'b2bPriceList',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'PDF/файл прайса для кнопки на странице B2B' },
    },
  ],
}
