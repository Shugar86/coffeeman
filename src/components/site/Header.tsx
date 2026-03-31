'use client'

import { useCartStore } from '@/stores/cart-store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const navPrimary = [
  { href: '/catalog', label: 'Каталог кофе', icon: 'cup' as const },
  { href: '/cafes', label: 'Кофейни' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
]

const navSecondary = [
  { href: '/blog', label: 'Блог' },
  { href: '/delivery', label: 'Доставка' },
]

/**
 * Фиксированная шапка: на главной — «стекло» поверх hero; после скролла и на внутренних — кремовая плашка.
 */
export function Header() {
  const pathname = usePathname()
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0))
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(pathname !== '/')

  const onScroll = useCallback(() => {
    if (pathname !== '/') {
      setSolid(true)
      return
    }
    const photoEnd = Math.min(window.innerHeight * 0.42, 420)
    setSolid(window.scrollY > photoEnd)
  }, [pathname])

  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isHome = pathname === '/'
  const glass = isHome && !solid

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        glass ? 'border-transparent bg-transparent' : 'border-b border-[var(--cm-line)] bg-[var(--cm-cream)]/95 backdrop-blur-md'
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 py-3 md:gap-4 md:px-4 md:py-3.5">
        <nav className="hidden min-w-0 flex-1 justify-start md:flex" aria-label="Основное меню">
          <div
            className={`flex flex-wrap items-center gap-1 rounded-full px-2 py-1.5 md:gap-0 md:px-3 md:py-2 ${
              glass ? 'bg-black/35 backdrop-blur-md ring-1 ring-white/20' : 'bg-[var(--cm-sand)]/90 ring-1 ring-[var(--cm-line-strong)]/40'
            }`}
          >
            {navPrimary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors md:px-3 md:text-xs ${
                  glass
                    ? 'text-white/95 hover:bg-white/10'
                    : 'text-[var(--cm-ink)] hover:bg-black/[0.04]'
                }`}
              >
                {item.icon === 'cup' ? <CupIcon className="h-3.5 w-3.5 shrink-0 opacity-90" /> : null}
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <Link
          href="/"
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 md:relative md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 ${
            glass ? 'text-white drop-shadow-md' : 'text-[var(--cm-maroon)]'
          }`}
        >
          <span className="cm-logo-script text-2xl leading-none md:text-3xl">Coffee</span>
          <CoffeeBeanMark className={glass ? 'text-white/95' : 'text-[var(--cm-maroon)]'} />
          <span className="cm-logo-script text-2xl leading-none md:text-3xl">Man</span>
        </Link>

        <div className="ml-auto flex items-center justify-end gap-2 md:min-w-0 md:flex-1 md:gap-2.5">
          <Link
            href="/cart"
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors md:h-11 md:w-11 ${
              glass
                ? 'bg-black/35 text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-black/45'
                : 'bg-[var(--cm-sand)] text-[var(--cm-maroon)] ring-1 ring-[var(--cm-line-strong)] hover:bg-[var(--cm-sand-dark)]'
            }`}
            aria-label={`Корзина, позиций: ${count}`}
          >
            <CartIcon className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--cm-maroon)] px-1 text-[9px] font-bold text-white">
                {count > 99 ? '99+' : count}
              </span>
            ) : null}
          </Link>

          <span
            className={`hidden cursor-default items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-wide md:inline-flex ${
              glass
                ? 'bg-black/35 text-white/95 ring-1 ring-white/20 backdrop-blur-md'
                : 'bg-[var(--cm-sand)] text-[var(--cm-ink-muted)] ring-1 ring-[var(--cm-line-strong)]'
            }`}
            title="Скоро"
          >
            <UserIcon className="h-4 w-4 shrink-0 opacity-90" />
            Личный кабинет
          </span>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-xl md:h-11 md:w-11 ${
              glass
                ? 'bg-black/35 text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-black/45'
                : 'border border-[var(--cm-line-strong)] bg-white text-[var(--cm-ink)] hover:bg-[var(--cm-sand)]'
            }`}
            aria-expanded={open}
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--cm-line)] bg-[var(--cm-cream)] px-4 py-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-3">
            {navPrimary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold uppercase tracking-wide text-[var(--cm-ink)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {navSecondary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold uppercase tracking-wide text-[var(--cm-ink)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}

function CoffeeBeanMark({ className }: { className?: string }) {
  return (
    <svg className={`h-6 w-4 shrink-0 ${className ?? ''}`} viewBox="0 0 16 24" fill="currentColor" aria-hidden>
      <path d="M8 2c-2.5 2-4 5.5-4 9.5a7.3 7.3 0 007 7.5c2.5-2 4-5.5 4-9.5A7.3 7.3 0 008 2zm0 3.5a1.2 1.2 0 011.2 1.2c0 .7-.5 1.2-1.2 1.2S6.8 7.4 6.8 6.7 7.3 5.5 8 5.5z" />
    </svg>
  )
}

function CupIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M5 9h11v6a4 4 0 01-4 4H9a4 4 0 01-4-4V9z" strokeLinejoin="round" />
      <path d="M16 11h2a2 2 0 012 2v0a2 2 0 01-2 2h-2" strokeLinecap="round" />
      <path d="M7 5c1 2 2.5 3 5 3s4-1 5-3" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <path d="M6 6 5 3H2" strokeLinecap="round" />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-4 4.5-6 7-6s5.5 2 7 6" strokeLinecap="round" />
    </svg>
  )
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  )
}
