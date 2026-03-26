'use client'

import type { ReactNode } from 'react'

export type SegmentOption<T extends string = string> = {
  value: T
  label: ReactNode
}

type Props<T extends string> = {
  name: string
  value: T
  options: SegmentOption<T>[]
  onChange: (value: T) => void
  size?: 'lg' | 'sm'
  className?: string
}

/**
 * Сегментированный контроль по макету Segment picker.png (кофе/чай, режимы).
 */
export function SegmentedControl<T extends string>({
  name,
  value,
  options,
  onChange,
  size = 'lg',
  className = '',
}: Props<T>) {
  const pad = size === 'lg' ? 'px-4 py-2.5 text-sm' : 'px-3 py-1.5 text-xs'

  return (
    <div
      role="group"
      aria-label={name}
      className={`inline-flex max-w-full flex-wrap rounded-full border border-[var(--cm-line-strong)] bg-white p-1 shadow-sm ${className}`}
    >
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-full font-semibold transition-colors ${pad} ${
              active
                ? 'bg-[var(--cm-sand-dark)] text-[var(--cm-ink)] shadow-inner'
                : 'text-[var(--cm-ink-muted)] hover:text-[var(--cm-ink)]'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
