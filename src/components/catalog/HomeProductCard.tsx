import { flagEmojiFromCode } from '@/lib/flag-emoji'
import { getMediaUrl } from '@/lib/media-url'
import type { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  product: Product
}

function countryLine(product: Product): { name: string; code?: string | null } | null {
  const co = product.country
  if (co && typeof co === 'object' && 'name' in co) {
    return { name: String(co.name), code: 'code' in co ? (co.code as string | null | undefined) : null }
  }
  return null
}

/**
 * Карточка товара на главной в духе макета: тёмная зона «пакета», акцент на фото, кнопка «Купить».
 */
export function HomeProductCard({ product }: Props) {
  const firstImg = product.images?.[0]
  const url = getMediaUrl(typeof firstImg === 'object' ? firstImg : null)
  const co = countryLine(product)
  const flag = flagEmojiFromCode(co?.code || undefined)
  const roast = Math.min(5, Math.max(1, Math.round((product.sensoryDensity ?? 3) as number)))

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--cm-line-strong)] bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[3/4] bg-gradient-to-b from-[#2a1814] to-[#120c0a]">
        {url ? (
          <Image
            src={url}
            alt={product.title}
            fill
            className="object-contain p-4 transition group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/50">Нет фото</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-[var(--cm-line)] bg-[var(--cm-cream)] p-4">
        <h3 className="font-display text-sm font-bold uppercase leading-snug tracking-wide text-[var(--cm-maroon)] md:text-base">
          {product.title}
        </h3>
        {co ? (
          <p className="text-xs text-[var(--cm-ink-muted)]">
            {flag ? <span className="mr-1">{flag}</span> : null}
            {co.name}
          </p>
        ) : null}
        <div className="flex gap-1" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i < roast ? 'bg-[var(--cm-maroon)]' : 'bg-[var(--cm-line-strong)]'}`}
            />
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className="text-lg font-bold text-[var(--cm-ink)]">{product.price} ₽</p>
          <span className="rounded-md bg-[var(--cm-maroon)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition group-hover:bg-[var(--cm-maroon-hover)]">
            Купить
          </span>
        </div>
      </div>
    </Link>
  )
}
