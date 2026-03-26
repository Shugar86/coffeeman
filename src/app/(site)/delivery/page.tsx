import { ProductCard } from '@/components/catalog/ProductCard'
import { CafesYandexMap } from '@/components/site/CafesYandexMap'
import { RichTextContent } from '@/components/site/RichTextContent'
import { getPayloadClient } from '@/lib/payload'
import type { SerializedEditorState } from 'lexical'

export const metadata = { title: 'Доставка — CoffeeMan' }

function hasLexical(data: unknown): data is SerializedEditorState {
  return Boolean(data && typeof data === 'object' && 'root' in (data as object))
}

export default async function DeliveryPage() {
  const payload = await getPayloadClient()
  const [delivery, cafesRes, productsRes] = await Promise.all([
    payload.findGlobal({ slug: 'delivery-info', depth: 0 }),
    payload.find({ collection: 'cafes', limit: 20, sort: 'sort', depth: 1 }),
    payload.find({ collection: 'products', limit: 3, sort: '-popularity', depth: 2 }),
  ])

  const structured =
    hasLexical(delivery.deliveryBody) ||
    hasLexical(delivery.pickupBody) ||
    hasLexical(delivery.paymentBody) ||
    hasLexical(delivery.highlightBody)

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="cm-heading text-3xl md:text-5xl">{delivery.title || 'Доставка и оплата'}</h1>

      {structured ? (
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-[var(--cm-maroon)]">
              {delivery.deliveryColumnTitle || 'Доставка'}
            </h2>
            <div className="cm-prose mt-4 max-w-none text-[var(--cm-ink)]">
              {hasLexical(delivery.deliveryBody) ? <RichTextContent data={delivery.deliveryBody} /> : null}
            </div>
          </section>
          <section className="rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-[var(--cm-maroon)]">
              {delivery.pickupColumnTitle || 'Самовывоз'}
            </h2>
            <div className="cm-prose mt-4 max-w-none text-[var(--cm-ink)]">
              {hasLexical(delivery.pickupBody) ? <RichTextContent data={delivery.pickupBody} /> : null}
            </div>
          </section>
          {hasLexical(delivery.highlightBody) || delivery.highlightTitle ? (
            <section className="rounded-2xl border-2 border-[var(--cm-maroon)] bg-[var(--cm-sand)] p-6 md:col-span-2 md:p-8">
              {delivery.highlightTitle ? (
                <h2 className="font-display text-lg font-semibold uppercase text-[var(--cm-maroon)]">
                  {delivery.highlightTitle}
                </h2>
              ) : null}
              <div className="cm-prose mt-3 max-w-none text-[var(--cm-ink)]">
                {hasLexical(delivery.highlightBody) ? <RichTextContent data={delivery.highlightBody} /> : null}
              </div>
            </section>
          ) : null}
          <section className="rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm md:col-span-2 md:p-8">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-[var(--cm-maroon)]">
              {delivery.paymentTitle || 'Оплата'}
            </h2>
            <div className="cm-prose mt-4 max-w-none text-[var(--cm-ink)]">
              {hasLexical(delivery.paymentBody) ? <RichTextContent data={delivery.paymentBody} /> : null}
            </div>
          </section>
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm md:p-10">
          <div className="cm-prose max-w-none text-[var(--cm-ink)]">
            {hasLexical(delivery.body) ? (
              <RichTextContent data={delivery.body} />
            ) : (
              <p className="text-[var(--cm-ink-muted)]">
                Заполните глобал «Доставка» в админке (структурированные поля или одно поле «текст»).
              </p>
            )}
          </div>
        </div>
      )}

      <section className="mt-16">
        <h2 className="cm-heading text-xl md:text-2xl">Наши точки</h2>
        <div className="mt-6">
          <CafesYandexMap cafes={cafesRes.docs} />
        </div>
      </section>

      <section className="mt-20 border-t border-[var(--cm-line-strong)] pt-14">
        <h2 className="cm-heading text-xl md:text-2xl">Возможно, вам понравится</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productsRes.docs.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
