'use client'

import { placeOrder } from '@/actions/place-order'
import { useCartStore } from '@/stores/cart-store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

export function CheckoutForm() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const clear = useCartStore((s) => s.clear)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  if (items.length === 0) {
    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        Корзина пуста —{' '}
        <Link href="/catalog" className="text-amber-800 underline dark:text-amber-400">
          в каталог
        </Link>
      </p>
    )
  }

  return (
    <form
      className="mx-auto max-w-xl space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        setError(null)
        const fd = new FormData(e.currentTarget)
        const payload = {
          customerName: String(fd.get('customerName') || ''),
          customerPhone: String(fd.get('customerPhone') || ''),
          customerEmail: String(fd.get('customerEmail') || ''),
          address: String(fd.get('address') || ''),
          comment: String(fd.get('comment') || ''),
          deliveryType: String(fd.get('deliveryType') || 'courier'),
          paymentMethod: String(fd.get('paymentMethod') || 'on_site'),
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            grindValue: i.grindValue,
            grindLabel: i.grindLabel,
          })),
        }
        startTransition(async () => {
          const res = await placeOrder(payload)
          if (!res.ok) {
            setError(res.error)
            return
          }
          clear()
          router.push(`/thank-you?order=${encodeURIComponent(res.orderNumber)}`)
        })
      }}
    >
      <div>
        <label className="text-sm font-medium">Имя</label>
        <input
          name="customerName"
          required
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600 dark:bg-neutral-950"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Телефон</label>
        <input
          name="customerPhone"
          required
          type="tel"
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600 dark:bg-neutral-950"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="customerEmail"
          type="email"
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600 dark:bg-neutral-950"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Адрес</label>
        <textarea
          name="address"
          rows={2}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600 dark:bg-neutral-950"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Комментарий</label>
        <textarea
          name="comment"
          rows={2}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600 dark:bg-neutral-950"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Доставка</label>
        <select
          name="deliveryType"
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600 dark:bg-neutral-950"
        >
          <option value="courier">Курьер</option>
          <option value="pickup">Самовывоз</option>
          <option value="post">Почта</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Оплата</label>
        <select
          name="paymentMethod"
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600 dark:bg-neutral-950"
        >
          <option value="on_site">На месте / при получении</option>
          <option value="online">Онлайн (интеграция позже)</option>
        </select>
      </div>
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-amber-700 py-3 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-50"
      >
        {pending ? 'Отправка…' : 'Подтвердить заказ'}
      </button>
    </form>
  )
}
