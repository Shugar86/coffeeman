import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: { singular: 'Заказ', plural: 'Заказы' },
  defaultSort: '-createdAt',
  admin: {
    useAsTitle: 'orderNumber',
    group: 'Магазин',
    defaultColumns: ['orderNumber', 'status', 'paid', 'customerName', 'total', 'createdAt'],
    listSearchableFields: ['orderNumber', 'customerPhone', 'customerName', 'customerEmail'],
    description: 'Обработка заказов: статус, оплата, позиции и контакты.',
    components: {
      beforeList: ['/components/payload/OrdersListHint'],
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Статус и оплата',
          fields: [
            {
              name: 'orderNumber',
              type: 'text',
              unique: true,
              index: true,
              admin: {
                readOnly: true,
                description: 'Генерируется при создании.',
              },
            },
            {
              name: 'orderSummary',
              type: 'ui',
              label: 'Сводка заказа',
              admin: {
                components: {
                  Field: '/components/payload/OrderSummaryUIField#OrderSummaryUIField',
                },
              },
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
            {
              name: 'paid',
              type: 'checkbox',
              defaultValue: false,
              index: true,
              admin: { description: 'Отметьте после подтверждения оплаты.' },
            },
            {
              name: 'paymentMethod',
              type: 'select',
              options: [
                { label: 'Онлайн', value: 'online' },
                { label: 'На месте', value: 'on_site' },
              ],
            },
          ],
        },
        {
          label: 'Клиент и доставка',
          fields: [
            {
              name: 'deliveryType',
              type: 'select',
              options: [
                { label: 'Курьер', value: 'courier' },
                { label: 'Самовывоз', value: 'pickup' },
                { label: 'Почта', value: 'post' },
              ],
            },
            {
              name: 'customerName',
              type: 'text',
              required: true,
            },
            {
              name: 'customerPhone',
              type: 'text',
              required: true,
            },
            {
              name: 'customerEmail',
              type: 'email',
            },
            {
              name: 'address',
              type: 'textarea',
              admin: { description: 'Полный адрес или пункт выдачи.' },
            },
            {
              name: 'comment',
              type: 'textarea',
              admin: { description: 'Пожелания клиента.' },
            },
          ],
        },
        {
          label: 'Позиции',
          fields: [
            {
              name: 'items',
              type: 'array',
              required: true,
              minRows: 1,
              labels: { singular: 'Позиция', plural: 'Позиции' },
              admin: { description: 'Состав заказа: товар, помол, цена и количество.' },
              fields: [
                {
                  name: 'product',
                  type: 'relationship',
                  relationTo: 'products',
                  hasMany: false,
                },
                { name: 'title', type: 'text', required: true },
                {
                  name: 'grindLabel',
                  type: 'text',
                  admin: { description: 'Подпись помола для оператора' },
                },
                { name: 'unitPrice', type: 'number', required: true, min: 0 },
                { name: 'quantity', type: 'number', required: true, min: 1 },
              ],
            },
            {
              name: 'total',
              type: 'number',
              required: true,
              min: 0,
              admin: { description: 'Итоговая сумма заказа (₽).' },
            },
          ],
        },
      ],
    },
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
