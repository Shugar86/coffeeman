import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { DecorativePatternStrip } from '@/components/site/DecorativePatternStrip'

export const metadata = { title: 'Оформление заказа — CoffeeMan' }

export default function CheckoutPage() {
  return (
    <>
      <DecorativePatternStrip className="h-12 md:h-14" />
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <h1 className="cm-heading text-3xl md:text-4xl">Оформление заказа</h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--cm-ink-muted)]">
          Цены пересчитываются на сервере по актуальным данным каталога.
        </p>
        <div className="mt-10">
          <CheckoutForm />
        </div>
      </div>
    </>
  )
}
