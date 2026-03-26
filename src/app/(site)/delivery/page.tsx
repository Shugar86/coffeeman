import { RichTextContent } from '@/components/site/RichTextContent'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'Доставка — CoffeeMan' }

export default async function DeliveryPage() {
  const payload = await getPayloadClient()
  const delivery = await payload.findGlobal({ slug: 'delivery-info', depth: 0 })

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">{delivery.title || 'Доставка и оплата'}</h1>
      <div className="mt-8 max-w-none space-y-4 text-neutral-800 dark:text-neutral-200">
        {delivery.body ? (
          <RichTextContent data={delivery.body} />
        ) : (
          <p className="text-neutral-600 dark:text-neutral-400">
            Заполните глобальный блок «Доставка» в админке Payload.
          </p>
        )}
      </div>
    </article>
  )
}
