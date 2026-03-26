import Link from 'next/link'

type Props = { searchParams: Promise<{ order?: string }> }

export const metadata = { title: 'Спасибо за заказ — CoffeeMan' }

export default async function ThankYouPage({ searchParams }: Props) {
  const { order } = await searchParams

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold">Спасибо за заказ</h1>
      {order ? (
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Номер заказа: <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">{order}</span>
        </p>
      ) : null}
      <p className="mt-2 text-sm text-neutral-500">Мы свяжемся с вами для подтверждения.</p>
      <Link href="/catalog" className="mt-10 inline-block text-amber-800 underline dark:text-amber-400">
        Вернуться в каталог
      </Link>
    </div>
  )
}
