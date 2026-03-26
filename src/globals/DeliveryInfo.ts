import type { GlobalConfig } from 'payload'

export const DeliveryInfo: GlobalConfig = {
  slug: 'delivery-info',
  label: 'Доставка',
  admin: { group: 'Сайт', description: 'Контент страницы «Доставка».' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Доставка и оплата' },
    {
      name: 'deliveryColumnTitle',
      type: 'text',
      defaultValue: 'Доставка',
      admin: { description: 'Заголовок левой колонки' },
    },
    {
      name: 'deliveryBody',
      type: 'richText',
      admin: { description: 'Условия доставки (список в редакторе)' },
    },
    {
      name: 'pickupColumnTitle',
      type: 'text',
      defaultValue: 'Самовывоз',
    },
    {
      name: 'pickupBody',
      type: 'richText',
    },
    {
      name: 'highlightTitle',
      type: 'text',
      admin: { description: 'Выделенный блок (напр. бесплатная доставка)' },
    },
    {
      name: 'highlightBody',
      type: 'richText',
    },
    {
      name: 'paymentTitle',
      type: 'text',
      defaultValue: 'Оплата',
    },
    {
      name: 'paymentBody',
      type: 'richText',
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        description: 'Legacy: полный текст одной колонкой, если структурированные поля пусты',
      },
    },
  ],
}
