'use client'

import { useCartStore } from '@/stores/cart-store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

const navLeft = [
  { href: '/catalog', label: 'Интернет-магазин' },
  { href: '/cafes', label: 'Кофейни' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
]

/**
 * Шапка: навигация, лого, корзина со счётчиком, ЛК, мобильное меню; прозрачная на hero главной.
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
    setSolid(window.scrollY > window.innerHeight * 0.72)
  }, [pathname])

  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const bar = solid
    ? 'border-[var(--cm-line)] bg-[var(--cm-cream)]/95 backdrop-blur-md'
    : 'border-transparent bg-transparent'

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${bar}`}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-3 px-4 py-3 md:grid-cols-[1fr_auto_1fr] md:gap-4 md:py-4">
        <nav className="order-2 hidden flex-wrap justify-center gap-x-4 gap-y-1 md:order-1 md:flex md:justify-start">
          {navLeft.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                solid ? 'text-[var(--cm-ink)]' : 'text-white drop-shadow'
              } hover:text-[var(--cm-maroon)]`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className={`order-1 justify-self-center font-display text-xl font-semibold tracking-tight md:order-2 md:text-2xl ${
            solid ? 'text-[var(--cm-maroon)]' : 'text-white drop-shadow-md'
          }`}
        >
          Coffee Man
        </Link>

        <div className="order-3 flex items-center justify-center gap-4 md:justify-end">
          <Link
            href="/blog"
            className={`hidden text-xs font-semibold uppercase tracking-[0.12em] transition-colors sm:inline ${
              solid ? 'text-[var(--cm-ink)]' : 'text-white/95'
            } hover:text-[var(--cm-maroon)]`}
          >
            Блог
          </Link>
          <Link
            href="/delivery"
            className={`hidden text-xs font-semibold uppercase tracking-[0.12em] transition-colors lg:inline ${
              solid ? 'text-[var(--cm-ink)]' : 'text-white/95'
            } hover:text-[var(--cm-maroon)]`}
          >
            Доставка
          </Link>
          <Link
            href="/cart"
            className="relative text-[var(--cm-maroon)]"
            aria-label={`Корзина, позиций: ${count}`}
          >
            <CartIcon className={`h-6 w-6 ${solid ? '' : 'text-white drop-shadow'}`} />
            {count > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--cm-maroon)] px-1 text-[10px] font-bold text-white">
                {count > 99 ? '99+' : count}
              </span>
            ) : null}
          </Link>
          <span
            className={`hidden cursor-default items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] sm:flex ${
              solid ? 'text-[var(--cm-ink-muted)]' : 'text-white/85'
            }`}
            title="Скоро"
          >
            <UserIcon className={`h-5 w-5 opacity-80 ${solid ? 'text-[var(--cm-maroon)]' : 'text-white'}`} />
            <span className="max-w-[140px] truncate">Личный кабинет</span>
          </span>

          <button
            type="button"
            className={`rounded-lg border p-2 md:hidden ${solid ? 'border-[var(--cm-line-strong)]' : 'border-white/40 text-white'}`}
            aria-expanded={open}
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--cm-line)] bg-[var(--cm-cream)] px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {navLeft.map((item) => (
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
            <li>
              <Link href="/blog" className="text-sm font-semibold uppercase tracking-wide text-[var(--cm-ink)]">
                Блог
              </Link>
            </li>
            <li>
              <Link href="/delivery" className="text-sm font-semibold uppercase tracking-wide text-[var(--cm-ink)]">
                Доставка
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
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
