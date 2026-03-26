'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

const TOPICS: { value: string; label: string }[] = [
  { value: '', label: 'Все темы' },
  { value: 'news', label: 'Новости' },
  { value: 'promo', label: 'Акции' },
  { value: 'brew', label: 'Приготовление' },
  { value: 'roast', label: 'Обжарка' },
  { value: 'grow', label: 'Выращивание' },
  { value: 'cafes', label: 'Кофейни' },
  { value: 'tea', label: 'Чай' },
]

type Props = {
  active: string
}

/**
 * Табы тем блога (фильтр в URL `topic` — эвристика на сервере).
 */
export function BlogTopicBar({ active }: Props) {
  const router = useRouter()
  const sp = useSearchParams()
  const [pending, startTransition] = useTransition()

  return (
    <div className="flex flex-wrap gap-2">
      {TOPICS.map((t) => {
        const on = (t.value || '') === (active || '')
        return (
          <button
            key={t.value || 'all'}
            type="button"
            disabled={pending}
            onClick={() => {
              const usp = new URLSearchParams(sp.toString())
              if (!t.value) usp.delete('topic')
              else usp.set('topic', t.value)
              startTransition(() => router.push(`/blog?${usp.toString()}`))
            }}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide sm:text-sm ${
              on
                ? 'border-[var(--cm-maroon)] bg-[var(--cm-maroon)] text-white'
                : 'border-[var(--cm-line-strong)] bg-white text-[var(--cm-ink-muted)] hover:border-[var(--cm-maroon)]/30'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
