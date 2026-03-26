import { HeroSlider, type HeroSlide } from '@/components/site/HeroSlider'
import { getMediaUrl } from '@/lib/media-url'
import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const site = await payload.findGlobal({ slug: 'site-settings', depth: 2 })

  const slides: HeroSlide[] =
    site.heroSlides?.map((row, idx) => ({
      id: row.id ?? String(idx),
      imageUrl: getMediaUrl(row.image),
      title: row.title,
      subtitle: row.subtitle,
      link: row.link || '/catalog',
    })) ?? []

  return (
    <>
      <HeroSlider slides={slides} />
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold">Добро пожаловать</h2>
        <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">
          Свежая обжарка, чай и аксессуары. Перейдите в каталог или загляните в наши кофейни.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/catalog"
            className="rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600"
          >
            Каталог
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800"
          >
            Блог
          </Link>
        </div>
      </section>
    </>
  )
}
