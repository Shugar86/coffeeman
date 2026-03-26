'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useTransition } from 'react'

const tastes = [
  { value: '', label: 'Любой вкус' },
  { value: 'citrus', label: 'Цитрус' },
  { value: 'chocolate', label: 'Шоколад' },
  { value: 'nutty', label: 'Орех' },
  { value: 'floral', label: 'Цветочный' },
  { value: 'berry', label: 'Ягодный' },
  { value: 'spicy', label: 'Пряный' },
  { value: 'smoky', label: 'Дымный' },
]

type Opt = { id: string; name: string; slug: string }

type Initial = {
  q: string
  country: string
  category: string
  type: string
  taste: string
  priceMin: string
  priceMax: string
  sort: string
}

type Props = {
  countries: Opt[]
  categories: Opt[]
  initial: Initial
}

export function CatalogFilters({ countries, categories, initial }: Props) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const submit = useCallback(
    (formData: FormData) => {
      const usp = new URLSearchParams()
      const q = String(formData.get('q') || '').trim()
      const country = String(formData.get('country') || '')
      const category = String(formData.get('category') || '')
      const type = String(formData.get('type') || '')
      const taste = String(formData.get('taste') || '')
      const priceMin = String(formData.get('priceMin') || '')
      const priceMax = String(formData.get('priceMax') || '')
      const sort = String(formData.get('sort') || 'popular')
      if (q) usp.set('q', q)
      if (country) usp.set('country', country)
      if (category) usp.set('category', category)
      if (type) usp.set('type', type)
      if (taste) usp.set('taste', taste)
      if (priceMin) usp.set('priceMin', priceMin)
      if (priceMax) usp.set('priceMax', priceMax)
      if (sort) usp.set('sort', sort)
      usp.set('page', '1')
      startTransition(() => {
        router.push(`/catalog?${usp.toString()}`)
      })
    },
    [router],
  )

  return (
    <form
      action={(fd) => submit(fd)}
      className="mt-6 flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50"
    >
      <div className="flex flex-wrap gap-3">
        <input
          name="q"
          type="search"
          placeholder="Поиск по названию"
          defaultValue={initial.q}
          className="min-w-[200px] flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-950"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
        >
          Искать
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select
          name="country"
          defaultValue={initial.country}
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-950"
        >
          <option value="">Страна</option>
          {countries.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="category"
          defaultValue={initial.category}
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-950"
        >
          <option value="">Категория</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="type"
          defaultValue={initial.type}
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-950"
        >
          <option value="">Тип</option>
          <option value="coffee">Кофе</option>
          <option value="tea">Чай</option>
        </select>
        <select
          name="taste"
          defaultValue={initial.taste}
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-950"
        >
          {tastes.map((t) => (
            <option key={t.value || 'any'} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <input
          name="priceMin"
          type="number"
          min={0}
          step={1}
          placeholder="Цена от"
          defaultValue={initial.priceMin}
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-950"
        />
        <input
          name="priceMax"
          type="number"
          min={0}
          step={1}
          placeholder="Цена до"
          defaultValue={initial.priceMax}
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-950"
        />
        <select
          name="sort"
          defaultValue={initial.sort}
          className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-950"
        >
          <option value="popular">Популярное</option>
          <option value="new">Новинки</option>
          <option value="price_asc">Цена ↑</option>
          <option value="price_desc">Цена ↓</option>
        </select>
      </div>
    </form>
  )
}
