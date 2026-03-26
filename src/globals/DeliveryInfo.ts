import type { GlobalConfig } from 'payload'

export const DeliveryInfo: GlobalConfig = {
  slug: 'delivery-info',
  label: 'Доставка',
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Доставка и оплата' },
    { name: 'body', type: 'richText', required: true },
  ],
}
