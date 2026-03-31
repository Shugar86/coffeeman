'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'

type Opt = { id: string; name: string; slug: string }

type Props = {
  countries: Opt[]
  categories: Opt[]
}

/**
 * Упрощённые фильтры главной: страна, категория, поиск → переход на /catalog с query.
 */
export function HomeCatalogTeaser({ countries, categories }: Props) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [pending, startTransition] = useTransition()

  const go = useCallback(
    (updates: Record<string, string>) => {
      const usp = new URLSearchParams()
      for (const [k, v] of Object.entries(updates)) {
        if (v) usp.set(k, v)
      }
      startTransition(() => {
        router.push(usp.toString() ? `/catalog?${usp.toString()}` : '/catalog')
      })
    },
    [router],
  )

  return (
    <form
      className="mx-auto mt-8 flex max-w-4xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-center"
      onSubmit={(e) => {
        e.preventDefault()
        go({ q: q.trim() })
      }}
    >
      <label className="flex min-w-[160px] flex-1 flex-col gap-1 text-left text-xs font-semibold uppercase tracking-wide text-[var(--cm-ink-muted)]">
        Страна
        <select
          className="cm-input w-full"
          defaultValue=""
          disabled={pending}
          onChange={(e) => {
            const slug = e.target.value
            go(slug ? { country: slug } : {})
            e.target.value = ''
          }}
        >
          <option value="">Все страны</option>
          {countries.slice(0, 40).map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex min-w-[160px] flex-1 flex-col gap-1 text-left text-xs font-semibold uppercase tracking-wide text-[var(--cm-ink-muted)]">
        Категория
        <select
          className="cm-input w-full"
          defaultValue=""
          disabled={pending}
          onChange={(e) => {
            const slug = e.target.value
            go(slug ? { category: slug } : {})
            e.target.value = ''
          }}
        >
          <option value="">Все</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex min-w-[200px] flex-[2] flex-col gap-1 text-left text-xs font-semibold uppercase tracking-wide text-[var(--cm-ink-muted)]">
        Поиск
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Название или нота..."
          className="cm-input w-full"
          disabled={pending}
        />
      </label>
      <button type="submit" className="cm-input min-h-11 bg-[var(--cm-maroon)] font-semibold text-white hover:bg-[var(--cm-maroon-hover)] sm:mb-0" disabled={pending}>
        Найти
      </button>
    </form>
  )
}
