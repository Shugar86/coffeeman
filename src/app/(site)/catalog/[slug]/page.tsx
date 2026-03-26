import { AddToCartSection } from '@/components/product/AddToCartSection'
import { ProductImageGallery } from '@/components/product/ProductImageGallery'
import { SensoryBar } from '@/components/product/SensoryBar'
import { Chip } from '@/components/ui/Chip'
import { ProductCard } from '@/components/catalog/ProductCard'
import { RichTextContent } from '@/components/site/RichTextContent'
import { flagEmojiFromCode } from '@/lib/flag-emoji'
import { getMediaUrl } from '@/lib/media-url'
import { getPayloadClient } from '@/lib/payload'
import type { Where } from 'payload'
import type { Product } from '@/payload-types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

const tasteRu: Record<string, string> = {
  citrus: 'Цитрус',
  chocolate: 'Шоколад',
  nutty: 'Орех',
  floral: 'Цветочный',
  berry: 'Ягодный',
  spicy: 'Пряный',
  smoky: 'Дымный',
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const p = res.docs[0]
  return { title: p ? `${p.title} — CoffeeMan` : 'Товар' }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const product = res.docs[0]
  if (!product) notFound()

  const images =
    product.images?.map((img) => getMediaUrl(typeof img === 'object' ? img : null)).filter(Boolean) ?? []

  const country =
    product.country && typeof product.country === 'object'
      ? {
          name: String(product.country.name),
          code: product.country.code,
        }
      : null
  const flag = flagEmojiFromCode(country?.code || undefined)

  const categoryName =
    product.category && typeof product.category === 'object' && 'name' in product.category
      ? String(product.category.name)
      : null

  const similarWhere: Where[] = [{ slug: { not_equals: slug } }]
  const ors: Where[] = []
  if (product.category && typeof product.category === 'object' && 'id' in product.category) {
    ors.push({ category: { equals: product.category.id } })
  }
  if (product.country && typeof product.country === 'object' && 'id' in product.country) {
    ors.push({ country: { equals: product.country.id } })
  }
  const similarRes = await payload.find({
    collection: 'products',
    where:
      ors.length > 0
        ? { and: [...similarWhere, { or: ors }] }
        : { and: similarWhere },
    limit: 3,
    sort: '-popularity',
    depth: 1,
  })

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <nav className="mb-6 text-xs font-medium uppercase tracking-[0.15em] text-[var(--cm-ink-muted)]">
        <Link href="/catalog" className="hover:text-[var(--cm-maroon)]">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--cm-ink)]">{product.title}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductImageGallery images={images as string[]} alt={product.title} />
        <div>
          <div className="flex flex-wrap gap-2">
            {categoryName ? (
              <span className="rounded bg-[var(--cm-sand-dark)] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--cm-maroon)]">
                {categoryName}
              </span>
            ) : null}
            <span className="rounded bg-[var(--cm-maroon)]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--cm-maroon)]">
              {product.productType === 'coffee' ? 'Кофе' : product.productType === 'tea' ? 'Чай' : ''}
            </span>
            {product.isNew ? (
              <span className="rounded bg-[var(--cm-maroon)] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Новинка
              </span>
            ) : null}
          </div>
          <h1 className="cm-heading mt-4 text-3xl leading-tight md:text-5xl">{product.title}</h1>
          {country ? (
            <p className="mt-3 text-sm text-[var(--cm-ink-muted)]">
              {flag ? <span className="mr-2">{flag}</span> : null}
              {country.name}
            </p>
          ) : null}
          {product.tastes && product.tastes.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tastes.map((t) => (
                <Chip key={t} variant="taste" tasteKey={t} size="sm">
                  {tasteRu[t] ?? t}
                </Chip>
              ))}
            </div>
          ) : null}
          <div className="mt-8 space-y-4 border-t border-[var(--cm-line)] pt-8">
            <SensoryBar label="Плотность" value={product.sensoryDensity ?? undefined} />
            <SensoryBar label="Кислотность" value={product.sensoryAcidity ?? undefined} />
            <SensoryBar label="Горечь" value={product.sensoryBitterness ?? undefined} />
          </div>
          <div className="mt-10 border-t border-[var(--cm-line)] pt-8">
            <AddToCartSection product={product} />
          </div>
        </div>
      </div>
      {product.description ? (
        <section className="relative mt-20 overflow-hidden rounded-2xl bg-[var(--cm-olive)] px-6 py-12 text-[var(--cm-ink)] md:px-12 md:py-16 cm-botanical-bg">
          <div className="relative z-10">
            <h2 className="cm-heading text-2xl text-[var(--cm-cream)] md:text-3xl">Описание</h2>
            <div className="cm-prose mt-6 max-w-none space-y-4 text-[var(--cm-cream)] [&_*]:text-[var(--cm-cream)]">
              <RichTextContent data={product.description} />
            </div>
          </div>
        </section>
      ) : null}
      {similarRes.docs.length > 0 ? (
        <section className="mt-20 border-t border-[var(--cm-line-strong)] pt-14">
          <h2 className="cm-heading text-2xl md:text-3xl">Похожие товары</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarRes.docs.map((p) => (
              <li key={p.id}>
                <ProductCard product={p as Product} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
