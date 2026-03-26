'use client'

import { ProductCard } from '@/components/catalog/ProductCard'
import { CoffeeButton } from '@/components/ui/Button'
import { useCartStore } from '@/stores/cart-store'
import type { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  recommended: Product[]
}

/**
 * Корзина: пустое состояние и заполненная (Zustand persist).
 */
export function CartView({ recommended }: Props) {
  const items = useCartStore((s) => s.items)
  const setQuantity = useCartStore((s) => s.setQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h1 className="cm-heading text-3xl md:text-5xl">Корзина пуста</h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--cm-ink-muted)]">
          Добавьте товары из каталога — или посмотрите подборку ниже.
        </p>
        <CoffeeButton href="/catalog" className="mt-10">
          Перейти в каталог
        </CoffeeButton>
        <h2 className="cm-heading mt-16 text-xl md:text-2xl">Возможно, вам понравится</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="cm-heading text-3xl md:text-5xl">Корзина</h1>
      <ul className="mt-8 divide-y divide-[var(--cm-line-strong)]">
        {items.map((line) => (
          <li key={line.key} className="flex flex-wrap items-center gap-4 py-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[var(--cm-line)] bg-[var(--cm-sand)]">
              {line.imageUrl ? (
                <Image src={line.imageUrl} alt={line.title} fill className="object-cover" sizes="80px" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-[var(--cm-ink-muted)]">Нет фото</div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/catalog/${line.slug}`} className="font-medium text-[var(--cm-ink)] hover:text-[var(--cm-maroon)]">
                {line.title}
              </Link>
              <p className="text-sm text-[var(--cm-ink-muted)]">
                {line.grindLabel} · {line.unitPrice} ₽ / шт.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Меньше"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--cm-line-strong)] bg-white text-[var(--cm-ink)] hover:bg-[var(--cm-sand)]"
                onClick={() => setQuantity(line.key, line.quantity - 1)}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{line.quantity}</span>
              <button
                type="button"
                aria-label="Больше"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--cm-line-strong)] bg-white text-[var(--cm-ink)] hover:bg-[var(--cm-sand)]"
                onClick={() => setQuantity(line.key, line.quantity + 1)}
              >
                +
              </button>
            </div>
            <p className="w-24 text-right font-semibold text-[var(--cm-maroon)]">{line.unitPrice * line.quantity} ₽</p>
            <button
              type="button"
              className="text-sm text-[var(--cm-rose)] hover:underline"
              onClick={() => removeItem(line.key)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between border-t border-[var(--cm-line-strong)] pt-6">
        <span className="text-lg font-semibold text-[var(--cm-ink)]">Итого</span>
        <span className="text-2xl font-bold text-[var(--cm-maroon)]">{total} ₽</span>
      </div>
      <CoffeeButton href="/checkout" className="mt-8 w-full">
        Оформить заказ
      </CoffeeButton>
    </div>
  )
}
