import type { CollectionConfig } from 'payload'

/** Аналитика брошенных корзин (не публичная витрина). */
export const CartSnapshots: CollectionConfig = {
  slug: 'cart-snapshots',
  labels: { singular: 'Снимок корзины', plural: 'Снимки корзин' },
  admin: {
    useAsTitle: 'id',
    group: 'Магазин',
    defaultColumns: ['customerEmail', 'updatedAt'],
    description: 'Снимки корзин для аналитики (не публичная витрина).',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'customerEmail', type: 'email' },
    {
      name: 'items',
      type: 'json',
      admin: { description: 'JSON массива позиций { productId, title, grind, price, qty }' },
    },
    { name: 'expiresAt', type: 'date' },
  ],
}
