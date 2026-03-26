'use client'

import { ProductCard } from '@/components/catalog/ProductCard'
import { useCartStore } from '@/stores/cart-store'
import type { Product } from '@/payload-types'
import Link from 'next/link'

type Props = {
  recommended: Product[]
}

export function CartView({ recommended }: Props) {
  const items = useCartStore((s) => s.items)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-semibold">Корзина пуста</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">Возможно, вам понравится:</p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
        <Link
          href="/catalog"
          className="mt-10 inline-block rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600"
        >
          В каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Корзина</h1>
      <ul className="mt-8 divide-y divide-neutral-200 dark:divide-neutral-800">
        {items.map((line) => (
          <li key={line.key} className="flex flex-wrap items-center gap-4 py-4">
            <div className="min-w-0 flex-1">
              <Link href={`/catalog/${line.slug}`} className="font-medium hover:text-amber-800 dark:hover:text-amber-400">
                {line.title}
              </Link>
              <p className="text-sm text-neutral-500">
                Помол: {line.grindLabel} · {line.unitPrice} ₽ / шт.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Меньше"
                className="h-9 w-9 rounded-lg border border-neutral-300 dark:border-neutral-600"
                onClick={() => setQuantity(line.key, line.quantity - 1)}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{line.quantity}</span>
              <button
                type="button"
                aria-label="Больше"
                className="h-9 w-9 rounded-lg border border-neutral-300 dark:border-neutral-600"
                onClick={() => setQuantity(line.key, line.quantity + 1)}
              >
                +
              </button>
            </div>
            <p className="w-24 text-right font-semibold">{line.unitPrice * line.quantity} ₽</p>
            <button
              type="button"
              className="text-sm text-red-600 hover:underline dark:text-red-400"
              onClick={() => removeItem(line.key)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <span className="text-lg font-semibold">Итого</span>
        <span className="text-2xl font-bold">{total} ₽</span>
      </div>
      <Link
        href="/checkout"
        className="mt-8 block w-full rounded-full bg-amber-700 py-3 text-center text-sm font-semibold text-white hover:bg-amber-600"
      >
        Оформить заказ
      </Link>
    </div>
  )
}
