'use client'

import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary:
    'bg-[var(--cm-maroon)] text-white shadow-sm hover:bg-[var(--cm-maroon-hover)] active:bg-[var(--cm-maroon-active)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cm-maroon)] disabled:pointer-events-none disabled:opacity-45',
  secondary:
    'bg-[var(--cm-rose)] text-white shadow-sm hover:opacity-95 active:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cm-rose)] disabled:pointer-events-none disabled:opacity-45',
  outline:
    'border-2 border-[var(--cm-maroon)] bg-transparent text-[var(--cm-maroon)] hover:bg-[var(--cm-maroon)]/8 active:bg-[var(--cm-maroon)]/14 disabled:opacity-45',
  neutral:
    'bg-[var(--cm-sand)] text-[var(--cm-ink)] hover:bg-[var(--cm-sand-dark)] active:bg-[var(--cm-line)] border border-transparent',
  neutralOutline:
    'border border-[var(--cm-line-strong)] bg-white text-[var(--cm-ink)] hover:bg-[var(--cm-sand)] active:bg-[var(--cm-line)]',
  ghost: 'bg-transparent text-[var(--cm-ink-muted)] hover:bg-black/[0.04] active:bg-black/[0.08]',
  light:
    'bg-white text-[var(--cm-maroon)] shadow-sm hover:bg-[var(--cm-cream)] active:bg-[var(--cm-cream-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white border border-white/40',
} as const

const sizes = {
  md: 'min-h-11 px-6 py-2.5 text-sm font-semibold rounded-lg',
  sm: 'min-h-9 px-4 py-2 text-xs font-semibold rounded-lg',
  icon: 'h-11 w-11 shrink-0 rounded-lg p-0 inline-flex items-center justify-center',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export type CoffeeButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  href?: string
  children: ReactNode
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

function Spinner() {
  return (
    <span
      className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden
    />
  )
}

/**
 * Кнопки по макету Bt.png: primary / outline / ghost / icon-only, loading.
 */
export function CoffeeButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  href,
  children,
  className = '',
  disabled,
  type = 'button',
  ...rest
}: CoffeeButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 transition-colors ${variants[variant]} ${sizes[size]} ${className}`

  const content = loading ? (
    <>
      <Spinner />
      {size !== 'icon' ? <span>{children}</span> : null}
    </>
  ) : (
    children
  )

  if (href && !disabled) {
    if (loading) {
      return (
        <span className={`${base} cursor-wait opacity-80`} aria-busy="true">
          {content}
        </span>
      )
    }
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={base} disabled={disabled || loading} {...rest}>
      {content}
    </button>
  )
}
