import type { GlobalConfig } from 'payload'

export const PaymentSettings: GlobalConfig = {
  slug: 'payment-settings',
  label: 'Оплата (тексты)',
  access: { read: () => true },
  fields: [
    { name: 'intro', type: 'richText' },
    { name: 'onlineEnabled', type: 'checkbox', defaultValue: true },
    { name: 'onSiteEnabled', type: 'checkbox', defaultValue: true },
    {
      name: 'providerNote',
      type: 'textarea',
      admin: {
        description: 'Ключи API только в .env; здесь — подсказки для менеджеров.',
      },
    },
  ],
}
