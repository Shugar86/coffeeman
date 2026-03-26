import Link from 'next/link'

const nav = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/cafes', label: 'Кофейни' },
  { href: '/about', label: 'О нас' },
  { href: '/contacts', label: 'Контакты' },
  { href: '/delivery', label: 'Доставка' },
  { href: '/cart', label: 'Корзина' },
]

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          CoffeeMan
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-amber-800 dark:hover:text-amber-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
