import { ProductCard } from '@/components/catalog/ProductCard'
import { CafesYandexMap } from '@/components/site/CafesYandexMap'
import { HeroSlider, type HeroSlide } from '@/components/site/HeroSlider'
import { NewsletterSignup } from '@/components/site/NewsletterSignup'
import { PolaroidFrame } from '@/components/ui/PolaroidFrame'
import { SectionMaroonBand } from '@/components/site/SectionMaroonBand'
import { TornPaperDivider } from '@/components/ui/TornPaperDivider'
import { TapedImage } from '@/components/ui/TapedImage'
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
      <TornPaperDivider fill="var(--cm-cream)" />

      <section id="story" className="relative overflow-hidden bg-[var(--cm-olive)] py-16 text-white md:py-24">
        {/* Декоративная линия Marsala */}
        <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-[var(--cm-maroon)]/30 md:block" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
          {/* Левая часть - полароиды с декором */}
          <div className="relative flex flex-wrap justify-center gap-4 md:justify-start">
            {/* Марка декоративная */}
            <div className="pointer-events-none absolute -left-4 -top-4 z-10 hidden md:block">
              <Image src="/images/stamp.png" alt="" width={80} height={80} className="opacity-80" />
            </div>

            {polaroids.length > 0
              ? polaroids.slice(0, 2).map((row, i) => {
                  const url = getMediaUrl(typeof row.image === 'object' ? row.image : null)
                  if (!url) return null
                  const rot = ((i % 3) - 1) * 3
                  return (
                    <PolaroidFrame key={row.id ?? i} rotateDeg={rot} className="z-10">
                      <Image src={url} alt="" fill className="object-cover" sizes="280px" />
                    </PolaroidFrame>
                  )
                })
              : [0, 1].map((i) => (
                  <PolaroidFrame key={i} rotateDeg={((i % 3) - 1) * 3} className="z-10">
                    <div className="flex h-full min-h-[200px] items-center justify-center bg-[var(--cm-sand)] text-sm text-[var(--cm-ink-muted)]">
                      <Image src="/images/hero-polaroid-1.png" alt="" fill className="object-cover" sizes="280px" />
                    </div>
                  </PolaroidFrame>
                ))}
          </div>

          {/* Правая часть - текст */}
          <div className="md:pl-8">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
              {site.homeStoryHeading || 'Кофе с историей и сердцем'}
            </h2>
            <p className="mt-6 whitespace-pre-line text-lg text-white/90">
              {site.homeStoryBody ||
                'Мы обжариваем зерно с заботой о вкусе и людях. Заходите в наши точки или заказывайте домой.'}
            </p>
            <CoffeeButton href="/cafes" className="mt-8" variant="outline">
              Наши кофейни
            </CoffeeButton>
          </div>
        </div>
      </section>

      <TornPaperDivider fill="var(--cm-maroon)" />
      <SectionMaroonBand>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 md:grid-cols-2 md:py-20">
          {/* Левая часть - медиа-кластер как на макете */}
          <div className="relative flex items-center justify-center gap-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 shadow-lg md:h-40 md:w-40">
              <Image src="/images/hero-polaroid-1.png" alt="" fill className="object-cover" sizes="160px" />
            </div>
            <div className="relative -mt-8 h-28 w-28 overflow-hidden rounded-full border-4 border-white/20 shadow-lg md:h-36 md:w-36">
              <Image src="/images/hero-polaroid-2.png" alt="" fill className="object-cover" sizes="144px" />
            </div>
            <div className="relative mt-8 h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 shadow-lg md:h-32 md:w-32">
              <Image src="/images/stamp.png" alt="" fill className="object-cover" sizes="128px" />
            </div>
          </div>

          {/* Правая часть - заголовок и статистика */}
          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
              COFFEEMAN — это:
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <HomeStatsRow stats={stats} />
            </div>
            <CoffeeButton href="/about" variant="outline" className="mt-10 border-white/30 text-white hover:bg-white/10">
              Подробнее о нас
            </CoffeeButton>
          </div>
        </div>
      </SectionMaroonBand>
      <TornPaperDivider fill="var(--cm-cream)" className="rotate-180" />

      <section className="bg-[var(--cm-cream)] py-16 md:py-22">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="cm-heading text-center text-3xl md:text-5xl">Кофе на любой вкус со всех уголков мира</h2>

          {/* Полоса флагов как на макете */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {countries.docs.slice(0, 12).map((c) => {
              const flag = c.code ? String.fromCodePoint(0x1f1e6 + c.code.charCodeAt(0) - 65, 0x1f1e6 + c.code.charCodeAt(1) - 65) : '🌍'
              return (
                <Link
                  key={c.id}
                  href={`/catalog?country=${encodeURIComponent(c.slug)}`}
                  className="flex items-center gap-2 rounded-full border border-[var(--cm-line-strong)] bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  title={c.name}
                >
                  <span className="text-lg">{flag}</span>
                  <span className="text-[var(--cm-ink)]">{c.name}</span>
                </Link>
              )
            })}
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-[var(--cm-ink-muted)]">Страны происхождения и подборка хитов продаж.</p>
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
          {/* Верхняя часть с декором */}
          <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="relative">
              {/* Декоративная марка */}
              <div className="pointer-events-none absolute -left-16 -top-8 hidden md:block">
                <Image src="/images/stamp-alt.png" alt="" width={100} height={100} className="opacity-70" />
              </div>
              <h2 className="cm-heading relative z-10 text-3xl md:text-5xl">Найди своё место силы</h2>
            </div>
            <CoffeeButton href="/cafes" variant="outline">
              Все кофейни
            </CoffeeButton>
          </div>

          {/* Полароиды кофеен */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 md:justify-start">
            {cafesRes.docs.slice(0, 3).map((c, i) => {
              const rot = ((i % 3) - 1) * 4
              return (
                <Link key={c.id} href={`/cafes#${c.slug}`} className="group">
                  <PolaroidFrame rotateDeg={rot} className="w-64 transition hover:scale-105">
                    {c.photos?.[0] && typeof c.photos[0] === 'object' && 'url' in c.photos[0] && c.photos[0].url ? (
                      <Image
                        src={c.photos[0].url}
                        alt={c.name}
                        fill
                        className="object-cover"
                        sizes="256px"
                      />
                    ) : (
                      <div className="flex h-full min-h-[200px] items-center justify-center bg-[var(--cm-sand)] text-sm text-[var(--cm-ink-muted)]">
                        Фото скоро
                      </div>
                    )}
                    {/* Подпись под полароидом */}
                    <div className="mt-2 px-2 pb-2 text-center">
                      <h3 className="font-display text-sm font-semibold uppercase text-[var(--cm-maroon)]">{c.name}</h3>
                      <p className="mt-1 text-xs text-[var(--cm-ink-muted)]">{c.address}</p>
                    </div>
                  </PolaroidFrame>
                </Link>
              )
            })}
          </div>

          {/* Карта с рваными краями */}
          <div className="mt-16">
            <TornPaperDivider fill="var(--cm-cream)" />
            <div className="relative bg-[var(--cm-cream)] px-4 py-6">
              <CafesYandexMap cafes={cafesRes.docs} />
            </div>
            <TornPaperDivider fill="var(--cm-sand)" className="rotate-180" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--cm-cream)] py-16 md:py-22">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between">
            <h2 className="cm-heading text-3xl md:text-5xl">Наш блог</h2>
            <CoffeeButton href="/blog" variant="outline">
              Все статьи
            </CoffeeButton>
          </div>

          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {articlesRes.docs.map((a, i) => {
              const cover = getMediaUrl(typeof a.cover === 'object' ? a.cover : null)
              // Разные цвета скотча для разнообразия
              const tapeColors = [
                'rgba(255, 200, 180, 0.75)', // персиковый
                'rgba(180, 240, 220, 0.75)', // мятный
                'rgba(255, 220, 180, 0.75)', // желтый
              ]
              const positions: ('top' | 'top-left' | 'top-right')[] = ['top', 'top-left', 'top-right']
              return (
                <li key={a.id} className="flex flex-col">
                  <Link href={`/blog/${a.slug}`} className="group">
                    {cover ? (
                      <TapedImage
                        src={cover}
                        alt={a.title || ''}
                        rotation={((i % 3) - 1) * 2}
                        tapeColor={tapeColors[i % tapeColors.length]}
                        tapePosition={positions[i % positions.length]}
                        className="w-full"
                      />
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-[var(--cm-line-strong)] bg-[var(--cm-sand)] text-sm text-[var(--cm-ink-muted)]">
                        Нет обложки
                      </div>
                    )}
                    <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-[var(--cm-maroon)]">
                      {a.title}
                    </h3>
                    <span className="mt-2 inline-block text-sm text-[var(--cm-maroon)] underline underline-offset-4 opacity-0 transition group-hover:opacity-100">
                      Читать →
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
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
