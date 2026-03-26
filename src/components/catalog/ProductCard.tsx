import { Chip } from '@/components/ui/Chip'
import { SensoryBar } from '@/components/product/SensoryBar'
import { flagEmojiFromCode } from '@/lib/flag-emoji'
import { getMediaUrl } from '@/lib/media-url'
import type { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  product: Product
}

const tasteRu: Record<string, string> = {
  citrus: 'Цитрус',
  chocolate: 'Шоколад',
  nutty: 'Орех',
  floral: 'Цветочный',
  berry: 'Ягодный',
  spicy: 'Пряный',
  smoky: 'Дымный',
}

function categoryLabel(product: Product): string | null {
  const c = product.category
  if (c && typeof c === 'object' && 'name' in c && typeof c.name === 'string') {
    return c.name
  }
  return null
}

function countryInfo(product: Product): { name: string; code?: string | null } | null {
  const co = product.country
  if (co && typeof co === 'object' && 'name' in co) {
    return {
      name: String(co.name),
      code: 'code' in co ? (co.code as string | null | undefined) : null,
    }
  }
  return null
}

/**
 * Карточка каталога: бейджи, вкусы, сенсорика, флаг.
 */
export function ProductCard({ product }: Props) {
  const firstImg = product.images?.[0]
  const url = getMediaUrl(typeof firstImg === 'object' ? firstImg : null)
  const cat = categoryLabel(product)
  const co = countryInfo(product)
  const flag = flagEmojiFromCode(co?.code || undefined)

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--cm-line-strong)] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-[var(--cm-cream)] cm-botanical-bg">
        {url ? (
          <Image
            src={url}
            alt={product.title}
            fill
            className="object-cover mix-blend-normal"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--cm-ink-muted)]">Нет фото</div>
        )}
        <div className="absolute left-2 top-2 flex max-w-[calc(100%-1rem)] flex-wrap gap-1">
          {product.isNew ? (
            <span className="rounded bg-[var(--cm-maroon)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              Новый
            </span>
          ) : null}
          {cat ? (
            <span className="rounded bg-white/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--cm-maroon)] shadow-sm">
              {cat}
            </span>
          ) : null}
          <span className="rounded bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--cm-ink)]">
            {product.productType === 'coffee' ? 'Кофе' : product.productType === 'tea' ? 'Чай' : ''}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h2 className="font-display text-base font-semibold uppercase leading-snug tracking-wide text-[var(--cm-maroon)] group-hover:opacity-90 md:text-lg">
            {product.title}
          </h2>
          {co ? (
            <p className="mt-1 text-xs text-[var(--cm-ink-muted)]">
              {flag ? <span className="mr-1">{flag}</span> : null}
              {co.name}
            </p>
          ) : null}
        </div>
        {product.tastes && product.tastes.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {product.tastes.map((t) => (
              <Chip key={t} variant="taste" tasteKey={t} size="sm">
                {tasteRu[t] ?? t}
              </Chip>
            ))}
          </div>
        ) : null}
        <div className="grid grid-cols-1 gap-2 border-t border-[var(--cm-line)] pt-3 sm:grid-cols-3">
          <SensoryBar compact label="Плотность" value={product.sensoryDensity} />
          <SensoryBar compact label="Кислотность" value={product.sensoryAcidity} />
        </div>
        <p className="mt-auto pt-1 text-xl font-bold text-[var(--cm-ink)]">{product.price} ₽</p>
      </div>
    </Link>
  )
}
