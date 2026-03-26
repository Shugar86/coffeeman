import { CatalogToolbar } from '@/components/catalog/CatalogToolbar'
import { ProductCard } from '@/components/catalog/ProductCard'
import { CoffeeButton } from '@/components/ui/Button'
import { parseCatalogSegment, segmentToQuery } from '@/lib/catalog-segment'
import { countrySlugToRegion } from '@/lib/country-regions'
import { grindParamMatchesProduct } from '@/lib/grind-filters'
import { getPayloadClient } from '@/lib/payload'
import type { Where } from 'payload'
import type { ReactNode } from 'react'

const PAGE_SIZE = 12

type SearchParams = Record<string, string | string[] | undefined>

function sp(params: SearchParams, key: string): string | undefined {
  const v = params[key]
  return Array.isArray(v) ? v[0] : v
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const p = await searchParams
  const page = Math.max(1, parseInt(sp(p, 'page') || '1', 10) || 1)
  const q = sp(p, 'q')?.trim()
  const countrySlug = sp(p, 'country')
  const categorySlug = sp(p, 'category')
  const taste = sp(p, 'taste')
  const priceMin = sp(p, 'priceMin')
  const priceMax = sp(p, 'priceMax')
  const sortParam = sp(p, 'sort') || 'popular'
  const segmentRaw = parseCatalogSegment(sp(p, 'segment'))
  const region = sp(p, 'region') || 'all'
  const grind = sp(p, 'grind')

  const payload = await getPayloadClient()

  const [countries, categories] = await Promise.all([
    payload.find({ collection: 'countries', limit: 200, sort: 'name' }),
    payload.find({ collection: 'categories', limit: 200, sort: 'name' }),
  ])

  const minPrice = 0
  const maxPrice = 15000

  const countryId = countrySlug
    ? countries.docs.find((c) => c.slug === countrySlug)?.id
    : undefined
  const categoryId = categorySlug
    ? categories.docs.find((c) => c.slug === categorySlug)?.id
    : undefined

  const segQuery = segmentToQuery(segmentRaw)
  let productType: 'coffee' | 'tea' | undefined = segQuery.productType
  if (!productType) {
    const t = sp(p, 'type') as 'coffee' | 'tea' | undefined
    if (t === 'coffee' || t === 'tea') productType = t
  }

  const andClause: Where[] = [...segQuery.extraWhere]

  if (q) {
    andClause.push({ title: { contains: q } })
  }

  if (countryId != null) {
    andClause.push({ country: { equals: countryId } })
  } else if (region && region !== 'all') {
    const ids = countries.docs
      .filter((c) => countrySlugToRegion(c.slug) === region)
      .map((c) => c.id)
    if (ids.length > 0) {
      andClause.push({ country: { in: ids } })
    }
  }

  if (categoryId != null) {
    andClause.push({ category: { equals: categoryId } })
  }

  if (segmentRaw === 'microlot') {
    const mic = categories.docs.find((c) => c.slug === 'microlot')
    if (mic) {
      andClause.push({ category: { equals: mic.id } })
    }
  }

  if (taste) {
    andClause.push({ tastes: { contains: taste } })
  }
  if (priceMin) {
    const n = parseFloat(priceMin)
    if (!Number.isNaN(n)) andClause.push({ price: { greater_than_equal: n } })
  }
  if (priceMax) {
    const n = parseFloat(priceMax)
    if (!Number.isNaN(n)) andClause.push({ price: { less_than_equal: n } })
  }

  if (productType === 'coffee' || productType === 'tea') {
    andClause.push({ productType: { equals: productType } })
  }

  const where: Where = andClause.length ? { and: andClause } : {}

  let sortField = '-popularity'
  if (segmentRaw === 'new') {
    sortField = '-createdAt'
  } else if (sortParam === 'new') {
    sortField = '-createdAt'
  } else if (sortParam === 'price_asc') {
    sortField = 'price'
  } else if (sortParam === 'price_desc') {
    sortField = '-price'
  } else if (segQuery.sort && segmentRaw === 'popular') {
    sortField = segQuery.sort
  }

  const result = await payload.find({
    collection: 'products',
    where,
    limit: grind ? 200 : PAGE_SIZE,
    page: grind ? 1 : page,
    sort: sortField,
    depth: 1,
  })

  let docs = result.docs
  let totalShown = result.totalDocs
  let totalPages = result.totalPages || 1

  if (grind) {
    const filtered = docs.filter((d) => grindParamMatchesProduct(grind, d.grindOptions))
    totalShown = filtered.length
    docs = filtered
    totalPages = 1
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-14">
      <h1 className="cm-heading flex flex-wrap items-baseline gap-1 text-3xl md:text-5xl">
        <span>Каталог кофе</span>
        <sup className="text-lg font-semibold text-[var(--cm-maroon)] md:text-2xl">({totalShown})</sup>
      </h1>

      <CatalogToolbar
        countries={countries.docs.map((c) => ({ id: String(c.id), name: c.name, slug: c.slug }))}
        categories={categories.docs.map((c) => ({ id: String(c.id), name: c.name, slug: c.slug }))}
        priceBounds={{ min: minPrice, max: maxPrice }}
        initial={{
          q: q || '',
          country: countrySlug || '',
          category: categorySlug || '',
          taste: taste || '',
          priceMin: priceMin || String(minPrice),
          priceMax: priceMax || String(maxPrice),
          sort: sortParam,
          segment: segmentRaw,
          region: region || 'all',
          grind: grind || '',
        }}
      />

      <p className="mt-4 text-sm text-[var(--cm-ink-muted)]">
        Найдено: {totalShown}
        {grind ? ' (до 200 позиций с учётом помола)' : null}
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      {docs.length === 0 ? (
        <p className="mt-10 text-[var(--cm-ink-muted)]">Ничего не найдено — сбросьте фильтры.</p>
      ) : null}
      <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {page > 1 ? (
          <PageLink page={page - 1} params={p}>
            Назад
          </PageLink>
        ) : null}
        <span className="text-sm text-[var(--cm-ink-muted)]">
          Стр. {page} / {totalPages}
        </span>
        {page < totalPages ? (
          <PageLink page={page + 1} params={p}>
            Вперёд
          </PageLink>
        ) : null}
      </nav>
    </div>
  )
}

function PageLink({
  page,
  params,
  children,
}: {
  page: number
  params: SearchParams
  children: ReactNode
}) {
  const usp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined) continue
    if (Array.isArray(v)) v.forEach((x) => usp.append(k, x))
    else if (k !== 'page') usp.set(k, v)
  }
  usp.set('page', String(page))
  return (
    <CoffeeButton href={`/catalog?${usp.toString()}`} variant="outline" size="sm">
      {children}
    </CoffeeButton>
  )
}
