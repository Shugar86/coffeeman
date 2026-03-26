import { CheckoutForm } from '@/components/checkout/CheckoutForm'

export const metadata = { title: 'Оформление заказа — CoffeeMan' }

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Оформление заказа</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Цены пересчитываются на сервере по актуальным данным каталога.
      </p>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  )
}
