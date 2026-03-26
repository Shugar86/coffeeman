import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    group: 'Магазин',
    defaultColumns: ['orderNumber', 'status', 'paid', 'customerName', 'total', 'createdAt'],
    listSearchableFields: ['orderNumber', 'customerPhone', 'customerName', 'customerEmail'],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'Новый', value: 'new' },
        { label: 'В обработке', value: 'processing' },
        { label: 'Отправлен', value: 'shipped' },
        { label: 'Доставлен', value: 'delivered' },
        { label: 'Отменён', value: 'cancelled' },
      ],
    },
    { name: 'paid', type: 'checkbox', defaultValue: false, index: true },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Онлайн', value: 'online' },
        { label: 'На месте', value: 'on_site' },
      ],
    },
    {
      name: 'deliveryType',
      type: 'select',
      options: [
        { label: 'Курьер', value: 'courier' },
        { label: 'Самовывоз', value: 'pickup' },
        { label: 'Почта', value: 'post' },
      ],
    },
    { name: 'customerName', type: 'text', required: true },
    { name: 'customerPhone', type: 'text', required: true },
    { name: 'customerEmail', type: 'email' },
    { name: 'address', type: 'textarea' },
    { name: 'comment', type: 'textarea' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          hasMany: false,
        },
        { name: 'title', type: 'text', required: true },
        { name: 'grindLabel', type: 'text' },
        { name: 'unitPrice', type: 'number', required: true, min: 0 },
        { name: 'quantity', type: 'number', required: true, min: 1 },
      ],
    },
    { name: 'total', type: 'number', required: true, min: 0 },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation !== 'create' || !data || data.orderNumber) {
          return data
        }
        const prefix = 'CM'
        const n = Date.now().toString(36).toUpperCase()
        const r = Math.random().toString(36).slice(2, 6).toUpperCase()
        return { ...data, orderNumber: `${prefix}-${n}-${r}` }
      },
    ],
  },
}
