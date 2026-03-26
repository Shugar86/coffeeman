import { CoffeeButton } from '@/components/ui/Button'
import { getMediaUrl } from '@/lib/media-url'
import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'

export const metadata = { title: 'Оптовым клиентам — CoffeeMan' }

export default async function B2bPage() {
  const payload = await getPayloadClient()
  const [facts, site] = await Promise.all([
    payload.find({ collection: 'b2b-facts', limit: 100, sort: 'sort', depth: 1 }),
    payload.findGlobal({ slug: 'site-settings', depth: 2 }),
  ])

  const priceUrl = getMediaUrl(typeof site.b2bPriceList === 'object' ? site.b2bPriceList : null)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="cm-heading text-3xl md:text-5xl">Оптовым клиентам</h1>
      <p className="mt-4 max-w-2xl text-[var(--cm-ink-muted)]">
        Поставки зерна для кофеен, офисов и ритейла. Стабильное качество и прозрачные условия.
      </p>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {facts.docs.map((f) => {
          const icon = getMediaUrl(typeof f.icon === 'object' ? f.icon : null)
          return (
            <li
              key={f.id}
              className="flex gap-4 rounded-2xl border border-[var(--cm-line-strong)] bg-white p-5 shadow-sm"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[var(--cm-sand)]">
                {icon ? (
                  <Image src={icon} alt="" fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-[var(--cm-ink-muted)]">◆</div>
                )}
              </div>
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-[var(--cm-maroon)]">
                  {f.title}
                </p>
                <p className="mt-1 text-lg font-bold text-[var(--cm-ink)]">{f.value}</p>
              </div>
            </li>
          )
        })}
      </ul>

      {facts.docs.length === 0 ? (
        <p className="mt-10 text-[var(--cm-ink-muted)]">Добавьте факты в коллекцию «Факты B2B» в админке.</p>
      ) : null}

      <section className="relative mt-16 min-h-[220px] overflow-hidden rounded-2xl border border-[var(--cm-line-strong)] bg-[var(--cm-maroon)] md:min-h-[280px]">
        <div className="absolute inset-0 opacity-30 cm-botanical-bg" />
        <div className="relative z-10 flex h-full min-h-[220px] flex-col items-center justify-center gap-6 p-8 text-center md:min-h-[280px]">
          <p className="font-display text-2xl font-semibold uppercase tracking-wide text-white md:text-3xl">
            Прайс и условия
          </p>
          {priceUrl ? (
            <CoffeeButton href={priceUrl} variant="neutral" className="bg-white text-[var(--cm-maroon)] hover:bg-[var(--cm-cream)]">
              Скачать прайс
            </CoffeeButton>
          ) : (
            <p className="text-sm text-white/85">Загрузите файл прайса в настройках сайта (поле B2B).</p>
          )}
        </div>
      </section>
    </div>
  )
}
