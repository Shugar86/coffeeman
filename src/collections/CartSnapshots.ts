import type { CollectionConfig } from 'payload'

/** Аналитика брошенных корзин (не публичная витрина). */
export const CartSnapshots: CollectionConfig = {
  slug: 'cart-snapshots',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['customerEmail', 'updatedAt'],
    description: 'Снимки корзин для аналитики',
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
