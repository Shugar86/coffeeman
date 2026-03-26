'use client'

import { CoffeeButton } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { formatPackGrindValue, PACK_GRAMS, packMultiplier, type PackGrams } from '@/lib/pack-pricing'
import { getMediaUrl } from '@/lib/media-url'
import { useCartStore } from '@/stores/cart-store'
import type { Product } from '@/payload-types'
import { useMemo, useState } from 'react'

type Props = {
  product: Product
}

/**
 * Помол (чипы), фасовка 150/500 г, цена с множителем; grindValue с суффиксом `___grams` для заказа.
 */
export function AddToCartSection({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const [grind, setGrind] = useState<{ label: string; value: string }>(() => {
    const g = product.grindOptions?.[0]
    return g != null ? { label: g.label, value: g.value } : { label: 'В зерне', value: 'whole' }
  })
  const [grams, setGrams] = useState<PackGrams>(150)
  const [msg, setMsg] = useState<string | null>(null)

  const options = useMemo(() => {
    const go = product.grindOptions ?? []
    return go.length === 0
      ? [{ label: 'В зерне', value: 'whole' }]
      : go.map((g) => ({ label: g.label, value: g.value }))
  }, [product.grindOptions])

  const pid = typeof product.id === 'number' ? product.id : Number(product.id)
  const basePrice = Number(product.price) || 0
  const mult = packMultiplier(grams)
  const displayPrice = Math.round(basePrice * mult * 100) / 100

  const firstImage = product.images?.[0]
  const imageUrl = getMediaUrl(typeof firstImage === 'object' ? firstImage : null)

  const compositeValue = formatPackGrindValue(grind.value, grams)
  const labelWithPack = `${grams} г · ${grind.label}`

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">Помол</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {options.map((o) => (
            <button key={o.value} type="button" onClick={() => setGrind(o)}>
              <Chip variant={o.value === grind.value ? 'solid' : 'outline'} size="sm">
                {o.label}
              </Chip>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">Фасовка</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PACK_GRAMS.map((g) => (
            <button key={g} type="button" onClick={() => setGrams(g)}>
              <Chip variant={g === grams ? 'solid' : 'outline'} size="sm">
                {g} г
              </Chip>
            </button>
          ))}
        </div>
      </div>
      <p className="text-3xl font-bold text-[var(--cm-maroon)]">{displayPrice} ₽</p>
      <CoffeeButton
        type="button"
        className="w-full"
        onClick={() => {
          addItem({
            key: `${pid}::${compositeValue}`,
            productId: pid,
            slug: product.slug,
            title: product.title,
            unitPrice: displayPrice,
            quantity: 1,
            grindLabel: labelWithPack,
            grindValue: compositeValue,
            imageUrl,
          })
          setMsg('Добавлено в корзину')
          setTimeout(() => setMsg(null), 2500)
        }}
      >
        Добавить в корзину
      </CoffeeButton>
      {msg ? <p className="text-center text-sm text-[var(--cm-maroon)]">{msg}</p> : null}
    </div>
  )
}
