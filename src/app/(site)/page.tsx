import { HomeCatalogTeaser } from '@/components/catalog/HomeCatalogTeaser'
import { HomeProductCard } from '@/components/catalog/HomeProductCard'
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
  const [site, countries, categoriesRes, productsRes, cafesRes, articlesRes, cafesMeta] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 2 }),
    payload.find({ collection: 'countries', limit: 200, sort: 'name' }),
    payload.find({ collection: 'categories', limit: 200, sort: 'name' }),
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
          .filter((s) => s.value && s.label)
          .map((s) => ({ id: s.id ?? undefined, value: s.value, label: s.label }))
      : [
          { value: String(cafesMeta.totalDocs), label: 'кофейни' },
          { value: '126т', label: 'зёрен' },
          { value: '100+', label: 'партнёров' },
          { value: '3+ млн', label: 'чашек' },
        ]

  const polaroids = site.homePolaroids ?? []

  const categoryOpts = categoriesRes.docs.map((c) => ({
    id: String(c.id),
    name: c.name,
    slug: c.slug,
  }))

  return (
    <>
      <div className="cm-guide-line hidden md:block" aria-hidden />
      <HeroSlider slides={slides} />

      <section
        id="story"
        className="scroll-mt-20 relative overflow-hidden border-t border-white/10 bg-[var(--cm-olive)] py-16 text-white md:py-24"
      >
        <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-[var(--cm-maroon)]/30 md:block" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
          <div className="relative order-2 flex flex-wrap justify-center gap-4 md:order-1 md:justify-start">
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
                    <div className="relative flex h-full min-h-[200px] items-center justify-center bg-[var(--cm-sand)]">
                      <Image
                        src={i === 0 ? '/images/hero-polaroid-1.png' : '/images/hero-polaroid-2.png'}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    </div>
                  </PolaroidFrame>
                ))}
          </div>

          <div className="order-1 md:order-2 md:pl-4">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
              {site.homeStoryHeading || 'Каждая кофейня — как чашка кофе'}
            </h2>
            <p className="mt-6 whitespace-pre-line text-lg text-white/90">
              {site.homeStoryBody ||
                'Уют, аромат и люди. Мы обжариваем зерно с заботой о вкусе. Заходите в наши точки или заказывайте домой — как вам удобнее.'}
            </p>
            <CoffeeButton href="/cafes" className="mt-8 border-white/50 text-white hover:bg-white/10" variant="outline">
              Подробнее
            </CoffeeButton>
          </div>
        </div>
      </section>

      <TornPaperDivider fill="var(--cm-maroon)" />
      <SectionMaroonBand>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="relative mx-auto flex h-[220px] w-full max-w-sm items-center justify-center md:h-[260px]">
            <div className="absolute left-0 top-4 h-28 w-28 overflow-hidden rounded-full border-4 border-white/25 shadow-xl md:h-36 md:w-36">
              <Image
                src="/images/hero-fallback.png"
                alt=""
                fill
                className="object-cover"
                sizes="144px"
                style={{ objectPosition: '30% 40%' }}
              />
            </div>
            <div className="absolute right-2 top-0 h-32 w-32 overflow-hidden rounded-full border-4 border-white/25 shadow-xl md:h-40 md:w-40">
              <Image
                src="/images/hero-fallback.png"
                alt=""
                fill
                className="object-cover"
                sizes="160px"
                style={{ objectPosition: '55% 35%' }}
              />
            </div>
            <div className="absolute bottom-0 left-1/3 h-24 w-24 overflow-hidden rounded-full border-4 border-white/25 shadow-xl md:h-32 md:w-32">
              <Image
                src="/images/hero-fallback.png"
                alt=""
                fill
                className="object-cover"
                sizes="128px"
                style={{ objectPosition: '70% 60%' }}
              />
            </div>
            <div className="absolute -bottom-2 right-6 h-20 w-20 overflow-hidden rounded-full border-4 border-white/30 bg-[#3d2918] shadow-lg md:h-24 md:w-24">
              <Image src="/images/stamp.png" alt="" fill className="object-cover opacity-90" sizes="96px" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
              COFFEEMAN — это:
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <HomeStatsRow stats={stats} />
            </div>
            <CoffeeButton href="/about" variant="light" className="mt-10 w-full max-w-xs md:w-auto">
              Подробнее о нас
            </CoffeeButton>
          </div>
        </div>
      </SectionMaroonBand>
      <TornPaperDivider fill="var(--cm-cream)" className="rotate-180" />

      <section className="bg-[var(--cm-cream)] py-16 md:py-22">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="cm-heading text-center text-3xl md:text-5xl">Кофе на любой вкус со всех уголков мира</h2>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-y border-[var(--cm-line-strong)]/50 py-5">
            {countries.docs.slice(0, 18).map((c) => {
              const code = c.code && c.code.length >= 2 ? c.code.slice(0, 2).toUpperCase() : ''
              const flag =
                code && /^[A-Z]{2}$/.test(code)
                  ? String.fromCodePoint(0x1f1e6 + code.charCodeAt(0) - 65, 0x1f1e6 + code.charCodeAt(1) - 65)
                  : '🌍'
              return (
                <Link
                  key={c.id}
                  href={`/catalog?country=${encodeURIComponent(c.slug)}`}
                  className="text-3xl transition hover:scale-110 md:text-4xl"
                  title={c.name}
                >
                  <span aria-hidden>{flag}</span>
                  <span className="sr-only">{c.name}</span>
                </Link>
              )
            })}
          </div>

          <HomeCatalogTeaser
            countries={countries.docs.map((c) => ({ id: String(c.id), name: c.name, slug: c.slug }))}
            categories={categoryOpts}
          />

          <p className="mx-auto mt-6 max-w-2xl text-center text-[var(--cm-ink-muted)]">Страны происхождения и подборка хитов продаж.</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productsRes.docs.map((product) => (
              <li key={product.id}>
                <HomeProductCard product={product} />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <CoffeeButton href="/catalog">Показать ещё</CoffeeButton>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[var(--cm-maroon)]/20 bg-[var(--cm-olive)] py-16 text-white md:py-22">
        <div className="pointer-events-none absolute right-6 top-16 hidden opacity-40 md:block">
          <Image src="/images/stamp-alt.png" alt="" width={120} height={120} className="rotate-6" />
        </div>
        <div className="pointer-events-none absolute bottom-24 left-4 hidden md:block">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white/50" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 4v4M12 16v4M4 12h4M16 12h4" strokeLinecap="round" />
          </svg>
        </div>
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="relative">
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
                Найди своё место силы
              </h2>
            </div>
            <CoffeeButton href="/cafes" variant="outline" className="border-white/40 text-white hover:bg-white/10">
              Все кофейни
            </CoffeeButton>
          </div>

          {/* Полароиды кофеен */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 md:justify-start">
            {cafesRes.docs.slice(0, 3).map((c, i) => {
              const rot = ((i % 3) - 1) * 4
              return (
                <Link key={c.id} href="#cafes-map" className="group flex max-w-[280px] flex-col items-center">
                  <PolaroidFrame rotateDeg={rot} className="w-64 transition group-hover:scale-[1.02]">
                    {c.photos?.[0] && typeof c.photos[0] === 'object' && 'url' in c.photos[0] && c.photos[0].url ? (
                      <Image src={c.photos[0].url} alt={c.name} fill className="object-cover" sizes="256px" />
                    ) : (
                      <div className="flex h-full min-h-[200px] items-center justify-center bg-[var(--cm-cream)] text-sm text-[var(--cm-ink-muted)]">
                        Фото скоро
                      </div>
                    )}
                  </PolaroidFrame>
                  <div className="mt-3 max-w-[260px] text-center">
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">{c.name}</h3>
                    {c.address ? <p className="mt-1 text-xs text-white/75">{c.address}</p> : null}
                    <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-wide text-[var(--cm-cream)] underline underline-offset-2">
                      На карте
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Карта с рваными краями */}
          <div className="mt-16">
            <TornPaperDivider fill="var(--cm-cream)" />
            <div id="cafes-map" className="scroll-mt-24 rounded-2xl bg-[var(--cm-cream)] p-2 shadow-[inset_0_0_0_1px_var(--cm-line-strong)] md:p-4">
              <CafesYandexMap cafes={cafesRes.docs} />
            </div>
            <TornPaperDivider fill="var(--cm-olive)" className="rotate-180" />
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

          <ul className="mt-10 grid grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3 lg:gap-14">
            {articlesRes.docs.map((a, i) => {
              const cover = getMediaUrl(typeof a.cover === 'object' ? a.cover : null)
              const tapeColors = [
                'rgba(255, 200, 180, 0.75)',
                'rgba(180, 240, 220, 0.75)',
                'rgba(255, 220, 180, 0.75)',
              ]
              const positions: ('top' | 'top-left' | 'top-right')[] = ['top', 'top-left', 'top-right']
              return (
                <li key={a.id} className="flex w-full max-w-[360px] flex-col sm:max-w-none">
                  <Link href={`/blog/${a.slug}`} className="group">
                    {cover ? (
                      <TapedImage
                        src={cover}
                        alt={a.title || ''}
                        rotation={((i % 3) - 1) * 2}
                        tapeColor={tapeColors[i % tapeColors.length]}
                        tapePosition={positions[i % positions.length]}
                        className="w-full max-w-[320px] sm:max-w-none"
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
