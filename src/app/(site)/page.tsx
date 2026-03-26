import { ProductCard } from '@/components/catalog/ProductCard'
import { CafesYandexMap } from '@/components/site/CafesYandexMap'
import { DecorativePatternStrip } from '@/components/site/DecorativePatternStrip'
import { HeroSlider, type HeroSlide } from '@/components/site/HeroSlider'
import { NewsletterSignup } from '@/components/site/NewsletterSignup'
import { PolaroidFrame } from '@/components/ui/PolaroidFrame'
import { SectionMaroonBand } from '@/components/site/SectionMaroonBand'
import { TornPaperDivider } from '@/components/ui/TornPaperDivider'
import { CoffeeButton } from '@/components/ui/Button'
import { getMediaUrl } from '@/lib/media-url'
import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'
import Link from 'next/link'
import { HomeStatsRow } from '@/components/site/HomeStatsRow'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const [site, countries, productsRes, cafesRes, articlesRes, cafesMeta] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 2 }),
    payload.find({ collection: 'countries', limit: 200, sort: 'name' }),
    payload.find({ collection: 'products', limit: 9, sort: '-popularity', depth: 2 }),
    payload.find({ collection: 'cafes', limit: 20, sort: 'sort', depth: 1 }),
    payload.find({ collection: 'articles', limit: 3, sort: '-publishedAt', depth: 1 }),
    payload.find({ collection: 'cafes', limit: 1, depth: 0 }),
  ])

  const slides: HeroSlide[] =
    site.heroSlides?.map((row, idx) => ({
      id: row.id ?? String(idx),
      imageUrl: getMediaUrl(row.image),
      title: row.title || 'Кофе с историей и сердцем',
      subtitle: row.subtitle,
      link: row.link || '/catalog',
    })) ?? []

  const stats =
    site.homeStats && site.homeStats.length > 0
      ? site.homeStats
      : [
          { value: String(cafesMeta.totalDocs), label: 'кофейни' },
          { value: '126т', label: 'зёрен' },
          { value: '100+', label: 'партнёров' },
          { value: '3+ млн', label: 'чашек' },
        ]

  const polaroids = site.homePolaroids ?? []

  return (
    <>
      <HeroSlider slides={slides} />
      <DecorativePatternStrip />

      <section className="relative bg-[var(--cm-cream)] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="cm-heading text-3xl md:text-5xl">
              {site.homeStoryHeading || 'Каждая кофейня — как чашка кофе'}
            </h2>
            <p className="cm-prose mt-6 whitespace-pre-line text-lg text-[var(--cm-ink-muted)]">
              {site.homeStoryBody ||
                'Мы обжариваем зерно с заботой о вкусе и людях. Заходите в наши точки или заказывайте домой.'}
            </p>
            <CoffeeButton href="/cafes" className="mt-8" variant="outline">
              Наши кофейни
            </CoffeeButton>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
            {polaroids.length > 0
              ? polaroids.map((row, i) => {
                  const url = getMediaUrl(typeof row.image === 'object' ? row.image : null)
                  if (!url) return null
                  const rot = ((i % 3) - 1) * 2.5
                  return (
                    <PolaroidFrame key={row.id ?? i} rotateDeg={rot}>
                      <Image src={url} alt="" fill className="object-cover" sizes="280px" />
                    </PolaroidFrame>
                  )
                })
              : [0, 1].map((i) => (
                  <PolaroidFrame key={i} rotateDeg={((i % 3) - 1) * 3}>
                    <div className="flex h-full min-h-[200px] items-center justify-center bg-[var(--cm-sand)] text-sm text-[var(--cm-ink-muted)]">
                      Фото в админке → polaroid
                    </div>
                  </PolaroidFrame>
                ))}
          </div>
        </div>
      </section>

      <TornPaperDivider fill="var(--cm-maroon)" />
      <SectionMaroonBand>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 text-center text-white md:grid-cols-4 md:py-20">
          <HomeStatsRow stats={stats} />
        </div>
      </SectionMaroonBand>
      <TornPaperDivider fill="var(--cm-cream)" className="rotate-180" />

      <section className="bg-[var(--cm-cream)] py-16 md:py-22">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="cm-heading text-3xl md:text-5xl">Кофе на любой вкус</h2>
          <p className="mt-4 max-w-2xl text-[var(--cm-ink-muted)]">Страны происхождения и подборка хитов продаж.</p>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {countries.docs.map((c) => (
              <Link
                key={c.id}
                href={`/catalog?country=${encodeURIComponent(c.slug)}`}
                className="shrink-0 rounded-full border border-[var(--cm-line-strong)] bg-white px-5 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--cm-maroon)] shadow-sm hover:bg-[var(--cm-sand)]"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productsRes.docs.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <CoffeeButton href="/catalog">Весь каталог</CoffeeButton>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--cm-line-strong)] bg-[var(--cm-sand)] py-16 md:py-22">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="cm-heading text-3xl md:text-5xl">Найди своё место силы</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {cafesRes.docs.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/cafes#${c.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-[var(--cm-line-strong)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] bg-[var(--cm-cream)]">
                    {c.photos?.[0] && typeof c.photos[0] === 'object' && 'url' in c.photos[0] && c.photos[0].url ? (
                      <Image
                        src={c.photos[0].url}
                        alt={c.name}
                        fill
                        className="object-cover transition group-hover:scale-[1.03]"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[var(--cm-ink-muted)]">
                        Фото скоро
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold uppercase text-[var(--cm-maroon)]">{c.name}</h3>
                    <p className="mt-1 text-sm text-[var(--cm-ink-muted)]">{c.address}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <CafesYandexMap cafes={cafesRes.docs} />
          </div>
        </div>
      </section>

      <section className="bg-[var(--cm-cream)] py-16 md:py-22">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="cm-heading text-3xl md:text-5xl">Блог</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articlesRes.docs.map((a) => {
              const cover = getMediaUrl(typeof a.cover === 'object' ? a.cover : null)
              return (
                <li key={a.id}>
                  <Link href={`/blog/${a.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--cm-line-strong)] bg-[var(--cm-sand)]">
                      {cover ? (
                        <Image
                          src={cover}
                          alt=""
                          fill
                          className="object-cover transition group-hover:scale-[1.02]"
                          sizes="33vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-[var(--cm-ink-muted)]">
                          Нет обложки
                        </div>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-[var(--cm-maroon)]">
                      {a.title}
                    </h3>
                  </Link>
                </li>
              )
            })}
          </ul>
          <CoffeeButton href="/blog" variant="outline" className="mt-10">
            Все статьи
          </CoffeeButton>
        </div>
      </section>

      <section className="border-t border-[var(--cm-line)] bg-[var(--cm-sand)] py-14 md:py-18">
        <div className="mx-auto max-w-6xl px-4">
          <NewsletterSignup />
        </div>
      </section>
    </>
  )
}
