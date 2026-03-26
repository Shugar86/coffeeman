'use client'

import type { ReactNode } from 'react'

type ChipVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'taste'
type ChipSize = 'md' | 'sm'

const variantClass: Record<Exclude<ChipVariant, 'taste'>, string> = {
  solid: 'bg-[var(--cm-chip-solid)] text-white border-transparent',
  soft: 'bg-[var(--cm-sand)] text-[var(--cm-ink)] border-[var(--cm-line)]',
  outline: 'bg-white text-[var(--cm-ink)] border-[var(--cm-line-strong)]',
  ghost: 'bg-transparent text-[var(--cm-ink-muted)] border-transparent',
}

const tasteStyles: Record<string, string> = {
  citrus: 'bg-amber-100/90 text-amber-900 border-amber-200',
  chocolate: 'bg-amber-900/15 text-amber-950 border-amber-800/30',
  nutty: 'bg-orange-100/90 text-orange-950 border-orange-200',
  floral: 'bg-pink-100/80 text-pink-950 border-pink-200',
  berry: 'bg-rose-100/80 text-rose-950 border-rose-200',
  spicy: 'bg-red-100/80 text-red-950 border-red-200',
  smoky: 'bg-stone-200/90 text-stone-800 border-stone-300',
}

const sizeClass: Record<ChipSize, string> = {
  md: 'min-h-9 px-3.5 py-1.5 text-sm gap-1.5',
  sm: 'min-h-7 px-2.5 py-1 text-xs gap-1',
}

export type ChipProps = {
  variant?: ChipVariant
  /** Для variant=taste — ключ из Products.tastes */
  tasteKey?: string
  size?: ChipSize
  leading?: ReactNode
  onRemove?: () => void
  disabled?: boolean
  children: ReactNode
  className?: string
}

/**
 * Чип / тег по макету Chips.png.
 */
export function Chip({
  variant = 'soft',
  tasteKey,
  size = 'md',
  leading,
  onRemove,
  disabled,
  children,
  className = '',
}: ChipProps) {
  const tasteClass =
    variant === 'taste'
      ? (tasteKey && tasteStyles[tasteKey]) ||
        'bg-[var(--cm-sand)] text-[var(--cm-ink)] border-[var(--cm-line)]'
      : null

  const baseVariant =
    variant === 'taste' ? tasteClass! : variantClass[variant as Exclude<ChipVariant, 'taste'>]

  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full border font-medium ${baseVariant} ${sizeClass[size]} ${disabled ? 'opacity-40' : ''} ${className}`}
    >
      {leading ? <span className="shrink-0 opacity-80">{leading}</span> : null}
      <span className="min-w-0 truncate">{children}</span>
      {onRemove && !disabled ? (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full hover:bg-black/10"
          aria-label="Убрать фильтр"
        >
          ×
        </button>
      ) : null}
    </span>
  )
}
