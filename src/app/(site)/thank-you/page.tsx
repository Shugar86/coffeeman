import { SectionMaroonBand } from '@/components/site/SectionMaroonBand'
import Link from 'next/link'

type Props = { searchParams: Promise<{ order?: string }> }

export const metadata = { title: 'Спасибо за заказ — CoffeeMan' }

export default async function ThankYouPage({ searchParams }: Props) {
  const { order } = await searchParams

  return (
    <SectionMaroonBand>
      <div className="mx-auto max-w-lg px-4 py-20 text-center text-white md:py-24">
        <h1 className="font-display text-3xl font-semibold uppercase tracking-wide md:text-4xl">Спасибо за заказ</h1>
        {order ? (
          <p className="mt-6 text-white/90">
            Номер заказа:{' '}
            <span className="font-mono text-lg font-bold text-white">{decodeURIComponent(order)}</span>
          </p>
        ) : null}
        <p className="mt-3 text-sm text-white/80">Мы свяжемся с вами для подтверждения.</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/catalog"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            В каталог
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-8 py-2.5 text-sm font-semibold text-[var(--cm-maroon)] shadow-md hover:bg-[var(--cm-cream)]"
          >
            На главную
          </Link>
        </div>
      </div>
    </SectionMaroonBand>
  )
}
