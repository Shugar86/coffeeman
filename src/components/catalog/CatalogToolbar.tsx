'use client'

import { CatalogSegmentPicker, type CatalogSegment } from '@/components/catalog/CatalogSegmentPicker'
import { CoffeeButton } from '@/components/ui/Button'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { GRIND_FILTER_OPTIONS } from '@/lib/grind-filters'
import { countrySlugToRegion, regionLabel } from '@/lib/country-regions'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useTransition } from 'react'

type Opt = { id: string; name: string; slug: string }

type Initial = {
  q: string
  country: string
  category: string
  taste: string
  priceMin: string
  priceMax: string
  sort: string
  segment: CatalogSegment
  region: string
  grind: string
}

type Props = {
  countries: Opt[]
  categories: Opt[]
  initial: Initial
  priceBounds: { min: number; max: number }
}

const REGIONS = ['all', 'asia', 'africa', 'south_america'] as const

/**
 * Фильтры каталога: сегменты, регионы, помол, диапазон цены, поиск — всё в URL.
 */
export function CatalogToolbar({ countries, categories, initial, priceBounds }: Props) {
  const router = useRouter()
  const sp = useSearchParams()
  const [pending, startTransition] = useTransition()

  const buildAndPush = useCallback(
    (updates: Record<string, string | undefined>) => {
      const usp = new URLSearchParams(sp.toString())
      for (const [k, v] of Object.entries(updates)) {
        if (v === undefined || v === '') usp.delete(k)
        else usp.set(k, v)
      }
      usp.set('page', '1')
      startTransition(() => {
        router.push(`/catalog?${usp.toString()}`)
      })
    },
    [router, sp],
  )

  const countrySlugsInRegion = useMemo(() => {
    const map: Record<string, string[]> = { all: [], asia: [], africa: [], south_america: [] }
    for (const c of countries) {
      const r = countrySlugToRegion(c.slug)
      if (r === 'asia') map.asia.push(c.slug)
      else if (r === 'africa') map.africa.push(c.slug)
      else if (r === 'south_america') map.south_america.push(c.slug)
    }
    return map
  }, [countries])

  const onRegion = (region: string) => {
    if (region === 'all') {
      buildAndPush({ region: undefined, country: undefined })
      return
    }
    const slugs = countrySlugsInRegion[region as keyof typeof countrySlugsInRegion] ?? []
    if (slugs.length === 0) {
      buildAndPush({ region })
      return
    }
    buildAndPush({ region, country: slugs[0] })
  }

  const priceMinNum = Math.max(priceBounds.min, parseInt(initial.priceMin || String(priceBounds.min), 10) || priceBounds.min)
  const priceMaxNum = Math.min(
    priceBounds.max,
    parseInt(initial.priceMax || String(priceBounds.max), 10) || priceBounds.max,
  )

  return (
    <div className="mt-6 space-y-6">
      <CatalogSegmentPicker active={initial.segment} />

      <div className="flex flex-wrap gap-2 border-b border-[var(--cm-line)] pb-4">
        <span className="w-full text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">
          Регион
        </span>
        {REGIONS.map((r) => {
          const active = (initial.region || 'all') === r
          return (
            <button
              key={r}
              type="button"
              disabled={pending}
              onClick={() => onRegion(r)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                active
                  ? 'border-[var(--cm-maroon)] bg-[var(--cm-maroon)] text-white'
                  : 'border-[var(--cm-line-strong)] bg-white text-[var(--cm-ink-muted)] hover:border-[var(--cm-maroon)]/40'
              }`}
            >
              {regionLabel(r)}
            </button>
          )
        })}
      </div>

      <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">
          Помол
        </span>
        <div className="flex w-max gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={() => buildAndPush({ grind: undefined })}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold sm:text-sm ${
              !initial.grind
                ? 'border-[var(--cm-maroon)] bg-[var(--cm-sand)] text-[var(--cm-maroon)]'
                : 'border-[var(--cm-line-strong)] bg-white'
            }`}
          >
            Все
          </button>
          {GRIND_FILTER_OPTIONS.map((g) => {
            const on = initial.grind === g.param
            return (
              <button
                key={g.param}
                type="button"
                disabled={pending}
                onClick={() => buildAndPush({ grind: g.param })}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap sm:text-sm ${
                  on
                    ? 'border-[var(--cm-maroon)] bg-[var(--cm-maroon)] text-white'
                    : 'border-[var(--cm-line-strong)] bg-white text-[var(--cm-ink)]'
                }`}
              >
                {g.label}
              </button>
            )
          })}
        </div>
      </div>

      <form
        className="space-y-5 rounded-2xl border border-[var(--cm-line-strong)] bg-white p-5 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault()
          const fd = new FormData(e.currentTarget)
          const q = String(fd.get('q') || '').trim()
          const country = String(fd.get('country') || '')
          const category = String(fd.get('category') || '')
          const taste = String(fd.get('taste') || '')
          const sort = String(fd.get('sort') || 'popular')
          const usp = new URLSearchParams(sp.toString())
          if (q) usp.set('q', q)
          else usp.delete('q')
          if (country) usp.set('country', country)
          else usp.delete('country')
          if (category) usp.set('category', category)
          else usp.delete('category')
          if (taste) usp.set('taste', taste)
          else usp.delete('taste')
          if (sort) usp.set('sort', sort)
          usp.set('page', '1')
          startTransition(() => router.push(`/catalog?${usp.toString()}`))
        }}
      >
        <RangeSlider
          min={priceBounds.min}
          max={priceBounds.max}
          step={50}
          valueMin={priceMinNum}
          valueMax={priceMaxNum}
          onChange={(lo, hi) => {
            const usp = new URLSearchParams(sp.toString())
            usp.set('priceMin', String(lo))
            usp.set('priceMax', String(hi))
            usp.set('page', '1')
            startTransition(() => router.push(`/catalog?${usp.toString()}`))
          }}
        />

        <div className="flex flex-wrap items-end gap-3 border-t border-[var(--cm-line)] pt-5">
          <div className="min-w-[200px] flex-1">
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">
              Поиск
            </label>
            <input
              name="q"
              type="search"
              placeholder="По названию"
              defaultValue={initial.q}
              className="cm-input w-full"
            />
          </div>
          <CoffeeButton type="submit" disabled={pending} className="shrink-0">
            Искать
          </CoffeeButton>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">
              Страна
            </label>
            <select name="country" defaultValue={initial.country} className="cm-input w-full">
              <option value="">Все страны</option>
              {countries.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">
              Вид кофе
            </label>
            <select name="category" defaultValue={initial.category} className="cm-input w-full">
              <option value="">Все</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">
              Нотки вкуса
            </label>
            <select name="taste" defaultValue={initial.taste} className="cm-input w-full">
              <option value="">Любой</option>
              <option value="citrus">Цитрус</option>
              <option value="chocolate">Шоколад</option>
              <option value="nutty">Орех</option>
              <option value="floral">Цветочный</option>
              <option value="berry">Ягодный</option>
              <option value="spicy">Пряный</option>
              <option value="smoky">Дымный</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">
              Сортировка
            </label>
            <select name="sort" defaultValue={initial.sort} className="cm-input w-full">
              <option value="popular">Популярное</option>
              <option value="new">Новинки</option>
              <option value="price_asc">Цена ↑</option>
              <option value="price_desc">Цена ↓</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  )
}
