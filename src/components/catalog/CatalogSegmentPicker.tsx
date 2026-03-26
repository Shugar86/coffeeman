'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'

export type CatalogSegment =
  | 'all'
  | 'coffee'
  | 'tea'
  | 'recommended'
  | 'popular'
  | 'new'
  | 'microlot'

const OPTIONS: { value: CatalogSegment; label: string }[] = [
  { value: 'coffee', label: 'Кофе' },
  { value: 'tea', label: 'Чай' },
  { value: 'all', label: 'Все' },
  { value: 'recommended', label: 'Рекомендован' },
  { value: 'popular', label: 'Популярный' },
  { value: 'new', label: 'Новый' },
  { value: 'microlot', label: 'Микролот' },
]

type Props = {
  /** Текущий сегмент из URL (параметр segment) */
  active: CatalogSegment
  className?: string
}

/**
 * Верхний ряд фильтров каталога — обновляет query `segment`, сбрасывает page.
 */
export function CatalogSegmentPicker({ active, className = '' }: Props) {
  const router = useRouter()
  const sp = useSearchParams()
  const [pending, startTransition] = useTransition()

  const apply = useCallback(
    (segment: CatalogSegment) => {
      const usp = new URLSearchParams(sp.toString())
      if (segment === 'all') {
        usp.delete('segment')
      } else {
        usp.set('segment', segment)
      }
      usp.set('page', '1')
      startTransition(() => {
        router.push(`/catalog?${usp.toString()}`)
      })
    },
    [router, sp],
  )

  return (
    <div
      role="group"
      aria-label="Сегмент каталога"
      className={`flex max-w-full flex-wrap gap-1.5 rounded-full border border-[var(--cm-line-strong)] bg-white p-1 shadow-sm ${className}`}
    >
      {OPTIONS.map((opt) => {
        const isOn = opt.value === active
        return (
          <button
            key={opt.value}
            type="button"
            disabled={pending}
            onClick={() => apply(opt.value)}
            className={`rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
              isOn
                ? 'bg-[var(--cm-maroon)] text-white shadow-inner'
                : 'text-[var(--cm-ink-muted)] hover:bg-[var(--cm-sand)] hover:text-[var(--cm-ink)]'
            } ${pending ? 'opacity-60' : ''}`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
