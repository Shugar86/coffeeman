'use client'

import { useCartStore } from '@/stores/cart-store'
import type { Product } from '@/payload-types'
import { useState } from 'react'

type Props = {
  product: Product
}

export function AddToCartSection({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const grindOptions = product.grindOptions ?? []
  const defaultGrind =
    grindOptions[0] != null
      ? { label: grindOptions[0].label, value: grindOptions[0].value }
      : { label: 'Стандарт', value: 'whole' }

  const [grind, setGrind] = useState(defaultGrind)
  const [msg, setMsg] = useState<string | null>(null)

  const options =
    grindOptions.length === 0
      ? [{ label: 'В зерне', value: 'whole' }]
      : grindOptions.map((g) => ({ label: g.label, value: g.value }))

  const pid = typeof product.id === 'number' ? product.id : Number(product.id)

  return (
    <div className="space-y-4">
      {options.length > 0 ? (
        <div>
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Помол</label>
          <select
            value={grind.value}
            onChange={(e) => {
              const opt = options.find((o) => o.value === e.target.value)
              if (opt) setGrind(opt)
            }}
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-600 dark:bg-neutral-950"
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => {
          addItem({
            productId: pid,
            slug: product.slug,
            title: product.title,
            unitPrice: product.price,
            quantity: 1,
            grindLabel: grind.label,
            grindValue: grind.value,
          })
          setMsg('Добавлено в корзину')
          setTimeout(() => setMsg(null), 2500)
        }}
        className="w-full rounded-full bg-amber-700 py-3 text-center text-sm font-semibold text-white hover:bg-amber-600"
      >
        В корзину
      </button>
      {msg ? <p className="text-center text-sm text-green-700 dark:text-green-400">{msg}</p> : null}
    </div>
  )
}
