import { RichTextContent } from '@/components/site/RichTextContent'
import { HomeStatsRow } from '@/components/site/HomeStatsRow'
import { PolaroidFrame } from '@/components/ui/PolaroidFrame'
import { TornPaperDivider } from '@/components/ui/TornPaperDivider'
import { SectionMaroonBand } from '@/components/site/SectionMaroonBand'
import { CoffeeButton } from '@/components/ui/Button'
import { getMediaUrl } from '@/lib/media-url'
import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'

export const metadata = { title: 'О компании — CoffeeMan' }

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const site = await payload.findGlobal({ slug: 'site-settings', depth: 2 })

  const heroUrl = getMediaUrl(typeof site.aboutHeroImage === 'object' ? site.aboutHeroImage : null)
  const polaroids = site.aboutPolaroids ?? []
  const aboutStats =
    site.aboutStats && site.aboutStats.length > 0
      ? site.aboutStats
      : site.homeStats && site.homeStats.length > 0
        ? site.homeStats
        : [{ value: '10+', label: 'лет с вами' }]

  return (
    <>
      <section className="relative min-h-[45vh] overflow-hidden bg-[var(--cm-olive)] md:min-h-[50vh]">
        {heroUrl ? (
          <Image src={heroUrl} alt="" fill className="object-cover opacity-90" sizes="100vw" priority />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="relative z-10 flex min-h-[45vh] flex-col justify-end px-4 pb-16 md:min-h-[50vh] md:pb-20">
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-white drop-shadow-md md:text-6xl">
            {site.companyName || 'Coffee Man'}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">Обжарка, которой доверяют</p>
        </div>
      </section>
      <TornPaperDivider fill="var(--cm-cream)" />

      <article className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div className="rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm md:p-10">
            <div className="cm-prose max-w-none space-y-4 text-[var(--cm-ink)]">
              {site.aboutContent ? (
                <RichTextContent data={site.aboutContent} />
              ) : (
                <p className="text-[var(--cm-ink-muted)]">
                  Контент появится после заполнения поля «О нас» в админке → Настройки сайта.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            {polaroids.length > 0
              ? polaroids.map((row, i) => {
                  const url = getMediaUrl(typeof row.image === 'object' ? row.image : null)
                  if (!url) return null
                  return (
                    <PolaroidFrame key={row.id ?? i} rotateDeg={((i % 3) - 1) * 2.5}>
                      <Image src={url} alt="" fill className="object-cover" sizes="260px" />
                    </PolaroidFrame>
                  )
                })
              : null}
          </div>
        </div>
      </article>

      <TornPaperDivider fill="var(--cm-maroon)" />
      <SectionMaroonBand>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 text-center text-white md:grid-cols-4 md:py-18">
          <HomeStatsRow stats={aboutStats} />
        </div>
      </SectionMaroonBand>
      <TornPaperDivider fill="var(--cm-cream)" className="rotate-180" />

      <section className="bg-[var(--cm-cream)] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="cm-heading text-3xl md:text-4xl">Авторские мастер-классы</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {(site.masterclasses && site.masterclasses.length > 0
              ? site.masterclasses.slice(0, 3)
              : [
                  { title: 'Каппинг', text: 'Научим различать ноты и выбирать зерно.', id: '1' },
                  { title: 'Эспрессо', text: 'Настройка помола и экстракции.', id: '2' },
                  { title: 'Латте-арт', text: 'Базовые и продвинутые паттерны.', id: '3' },
                ]
            ).map((m, i) => {
              const img =
                'image' in m && m.image && typeof m.image === 'object' && 'url' in m.image
                  ? String(m.image.url)
                  : null
              return (
                <li
                  key={'id' in m ? m.id : i}
                  className="overflow-hidden rounded-2xl border border-[var(--cm-line-strong)] bg-white shadow-sm"
                >
                  {img ? (
                    <div className="relative aspect-[16/10]">
                      <Image src={img} alt="" fill className="object-cover" sizes="33vw" />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-[var(--cm-sand)]" />
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold uppercase text-[var(--cm-maroon)]">
                      {'title' in m ? m.title : ''}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--cm-ink-muted)]">{'text' in m ? m.text : ''}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <CoffeeButton href="/contacts" variant="outline" className="mt-10">
            Записаться
          </CoffeeButton>
        </div>
      </section>
    </>
  )
}
