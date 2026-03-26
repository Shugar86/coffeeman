import { CatalogFilters } from '@/components/catalog/CatalogFilters'
import { ProductCard } from '@/components/catalog/ProductCard'
import { getPayloadClient } from '@/lib/payload'
import type { Where } from 'payload'
import Link from 'next/link'
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
  const productType = sp(p, 'type') as 'coffee' | 'tea' | undefined
  const taste = sp(p, 'taste')
  const priceMin = sp(p, 'priceMin')
  const priceMax = sp(p, 'priceMax')
  const sort = sp(p, 'sort') || 'popular'

  const payload = await getPayloadClient()

  const [countries, categories] = await Promise.all([
    payload.find({ collection: 'countries', limit: 200, sort: 'name' }),
    payload.find({ collection: 'categories', limit: 200, sort: 'name' }),
  ])

  const countryId = countrySlug
    ? countries.docs.find((c) => c.slug === countrySlug)?.id
    : undefined
  const categoryId = categorySlug
    ? categories.docs.find((c) => c.slug === categorySlug)?.id
    : undefined

  const andClause: Where[] = []

  if (q) {
    andClause.push({ title: { contains: q } })
  }
  if (countryId != null) {
    andClause.push({ country: { equals: countryId } })
  }
  if (categoryId != null) {
    andClause.push({ category: { equals: categoryId } })
  }
  if (productType === 'coffee' || productType === 'tea') {
    andClause.push({ productType: { equals: productType } })
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

  const where: Where = andClause.length ? { and: andClause } : {}

  let sortField: string = '-popularity'
  if (sort === 'new') sortField = '-createdAt'
  else if (sort === 'price_asc') sortField = 'price'
  else if (sort === 'price_desc') sortField = '-price'

  const result = await payload.find({
    collection: 'products',
    where,
    limit: PAGE_SIZE,
    page,
    sort: sortField,
    depth: 1,
  })

  const totalPages = result.totalPages || 1

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Каталог</h1>
      <CatalogFilters
        countries={countries.docs.map((c) => ({ id: String(c.id), name: c.name, slug: c.slug }))}
        categories={categories.docs.map((c) => ({ id: String(c.id), name: c.name, slug: c.slug }))}
        initial={{
          q: q || '',
          country: countrySlug || '',
          category: categorySlug || '',
          type: productType || '',
          taste: taste || '',
          priceMin: priceMin || '',
          priceMax: priceMax || '',
          sort: sort || 'popular',
        }}
      />
      <p className="mt-2 text-sm text-neutral-500">Найдено: {result.totalDocs}</p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.docs.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      {result.docs.length === 0 ? (
        <p className="mt-10 text-neutral-600 dark:text-neutral-400">Ничего не найдено — сбросьте фильтры.</p>
      ) : null}
      <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {page > 1 ? (
          <PageLink page={page - 1} params={p}>
            Назад
          </PageLink>
        ) : null}
        <span className="text-sm text-neutral-600">
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
    <Link
      href={`/catalog?${usp.toString()}`}
      className="rounded-full border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
    >
      {children}
    </Link>
  )
}
