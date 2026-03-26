import Link from 'next/link'

export type FooterSocial = { label: string; url: string }

type Props = {
  companyName?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  socialLinks?: FooterSocial[] | null
}

const companyLinks = [
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/delivery', label: 'Доставка' },
]

const clientLinks = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/cart', label: 'Корзина' },
  { href: '/blog', label: 'Блог' },
  { href: '/cafes', label: 'Кофейни' },
  { href: '/b2b', label: 'Оптовым клиентам' },
]

/**
 * Подвал по макетам article / main page: тёмный блок, колонки, соцсети.
 */
export function Footer({ companyName, phone, email, address, socialLinks }: Props) {
  const year = new Date().getFullYear()
  const brand = companyName || 'CoffeeMan'

  return (
    <footer className="mt-auto bg-[var(--cm-footer-bg)] text-[var(--cm-footer-text)]">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-white">{brand}</p>
            {address ? <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--cm-footer-text)]/85">{address}</p> : null}
            {phone ? <p className="mt-3 text-sm">Тел.: {phone}</p> : null}
            {email ? (
              <p className="mt-1 text-sm">
                <Link href={`mailto:${email}`} className="underline-offset-2 hover:underline">
                  {email}
                </Link>
              </p>
            ) : null}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">Компания</p>
            <ul className="mt-4 space-y-2 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--cm-footer-text)]/90 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">Клиентам</p>
            <ul className="mt-4 space-y-2 text-sm">
              {clientLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--cm-footer-text)]/90 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">Соцсети</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {(socialLinks ?? []).map((s) => (
                <li key={s.url}>
                  <Link
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-semibold hover:bg-white/10"
                  >
                    {s.label.slice(0, 2).toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
            {(socialLinks?.length ?? 0) === 0 ? (
              <p className="mt-2 text-sm text-[var(--cm-footer-text)]/60">Добавьте ссылки в админке → Настройки сайта.</p>
            ) : null}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-[var(--cm-footer-text)]/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {brand}. Все права защищены.
          </p>
          <p className="flex flex-wrap gap-4">
            <span>Политика конфиденциальности</span>
            <span>Пользовательское соглашение</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
