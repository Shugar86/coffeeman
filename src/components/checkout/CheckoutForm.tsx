'use client'

import { placeOrder } from '@/actions/place-order'
import { CoffeeButton } from '@/components/ui/Button'
import { useCartStore } from '@/stores/cart-store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

const FORM_ID = 'checkout-order-form'
const fieldLabel = 'mb-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--cm-ink-muted)]'

export function CheckoutForm() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const clear = useCartStore((s) => s.clear)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0)

  if (items.length === 0) {
    return (
      <p className="text-[var(--cm-ink-muted)]">
        Корзина пуста —{' '}
        <Link href="/catalog" className="font-semibold text-[var(--cm-maroon)] underline-offset-2 hover:underline">
          в каталог
        </Link>
      </p>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start">
      <form
        id={FORM_ID}
        className="space-y-5 rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm md:p-8"
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
          <label className={fieldLabel}>Имя</label>
          <input name="customerName" required className="cm-input w-full" />
        </div>
        <div>
          <label className={fieldLabel}>Телефон</label>
          <input name="customerPhone" required type="tel" className="cm-input w-full" />
        </div>
        <div>
          <label className={fieldLabel}>Email</label>
          <input name="customerEmail" type="email" className="cm-input w-full" />
        </div>
        <div>
          <label className={fieldLabel}>Адрес</label>
          <textarea name="address" rows={2} className="cm-input w-full" />
        </div>
        <div>
          <label className={fieldLabel}>Комментарий</label>
          <textarea name="comment" rows={2} className="cm-input w-full" />
        </div>
        <div>
          <label className={fieldLabel}>Доставка</label>
          <select name="deliveryType" className="cm-input w-full">
            <option value="courier">Курьер</option>
            <option value="pickup">Самовывоз</option>
            <option value="post">Почта</option>
          </select>
        </div>
        <div>
          <label className={fieldLabel}>Оплата</label>
          <select name="paymentMethod" className="cm-input w-full">
            <option value="on_site">На месте / при получении</option>
            <option value="online">Онлайн (интеграция позже)</option>
          </select>
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <CoffeeButton type="submit" className="w-full lg:hidden" loading={pending}>
          Подтвердить заказ
        </CoffeeButton>
      </form>

      <aside className="rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm lg:sticky lg:top-28">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">Ваш заказ</p>
        <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto text-sm">
          {items.map((i) => (
            <li key={i.key} className="flex justify-between gap-2 border-b border-[var(--cm-line)] pb-2">
              <span className="min-w-0 truncate text-[var(--cm-ink)]">
                {i.title} ×{i.quantity}
              </span>
              <span className="shrink-0 font-medium text-[var(--cm-maroon)]">{i.unitPrice * i.quantity} ₽</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--cm-line-strong)] pt-4">
          <span className="font-semibold text-[var(--cm-ink)]">К оплате</span>
          <span className="text-xl font-bold text-[var(--cm-maroon)]">{subtotal} ₽</span>
        </div>
        <CoffeeButton type="submit" form={FORM_ID} className="mt-6 hidden w-full lg:inline-flex" loading={pending}>
          Подтвердить заказ
        </CoffeeButton>
        <p className="mt-4 text-xs text-[var(--cm-ink-muted)]">
          Сумма проверяется на сервере: фасовка и помол учитываются при оформлении.
        </p>
      </aside>
    </div>
  )
}
