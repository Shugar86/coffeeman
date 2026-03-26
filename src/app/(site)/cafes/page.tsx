import { CafesYandexMap } from '@/components/site/CafesYandexMap'
import { CoffeeButton } from '@/components/ui/Button'
import { RichTextContent } from '@/components/site/RichTextContent'
import { getMediaUrl } from '@/lib/media-url'
import { getPayloadClient } from '@/lib/payload'
import type { Cafe } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'Кофейни — CoffeeMan' }

type SearchParams = Record<string, string | string[] | undefined>

function sp(params: SearchParams, key: string): string | undefined {
  const v = params[key]
  return Array.isArray(v) ? v[0] : v
}

export default async function CafesListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const p = await searchParams
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'cafes',
    sort: 'sort',
    limit: 100,
    depth: 2,
  })
  const site = await payload.findGlobal({ slug: 'site-settings', depth: 0 })

  const cafes = res.docs
  const activeSlug = sp(p, 'c') || cafes[0]?.slug
  const active = cafes.find((c) => c.slug === activeSlug) ?? cafes[0]
  const fallbackPhone = site.phone || ''

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <h1 className="cm-heading text-3xl md:text-5xl">
        Кофейни <sup className="text-xl md:text-2xl">({cafes.length})</sup>
      </h1>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-[var(--cm-line)] pb-4">
        {cafes.map((c) => {
          const on = active?.id === c.id
          return (
            <Link
              key={c.id}
              href={`/cafes?c=${encodeURIComponent(c.slug)}`}
              scroll={false}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide sm:text-sm ${
                on
                  ? 'border-[var(--cm-maroon)] bg-[var(--cm-maroon)] text-white'
                  : 'border-[var(--cm-line-strong)] bg-white text-[var(--cm-ink)] hover:border-[var(--cm-maroon)]/40'
              }`}
            >
              {c.address}
            </Link>
          )
        })}
      </div>

      {active ? (
        <CafeDetail cafe={active} fallbackPhone={fallbackPhone} />
      ) : (
        <p className="mt-12 text-[var(--cm-ink-muted)]">Добавьте кофейни в админке.</p>
      )}
    </div>
  )
}

function CafeDetail({ cafe, fallbackPhone }: { cafe: Cafe; fallbackPhone: string }) {
  const phone = cafe.phone?.trim() || fallbackPhone
  const photos =
    cafe.photos?.map((ph) => getMediaUrl(typeof ph === 'object' ? ph : null)).filter(Boolean) ?? []

  return (
    <article id={cafe.slug} className="mt-10 space-y-12 scroll-mt-28">
      <header>
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-[var(--cm-maroon)] md:text-3xl">
          {cafe.name}
        </h2>
        {phone ? (
          <p className="mt-2">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-lg font-medium text-[var(--cm-ink)] hover:text-[var(--cm-maroon)]">
              {phone}
            </a>
          </p>
        ) : null}
      </header>

      {cafe.description ? (
        <div className="grid gap-8 md:grid-cols-2">
          <div className="cm-prose max-w-none text-[var(--cm-ink)]">
            <RichTextContent data={cafe.description} />
          </div>
          <div className="cm-prose max-w-none text-[var(--cm-ink-muted)]">
            {cafe.hours ? <p className="whitespace-pre-line text-sm">{cafe.hours}</p> : null}
          </div>
        </div>
      ) : cafe.hours ? (
        <p className="whitespace-pre-line text-sm text-[var(--cm-ink-muted)]">{cafe.hours}</p>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-3">
          {photos[0] ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--cm-line-strong)] bg-[var(--cm-sand)]">
              <Image src={photos[0]} alt={cafe.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          ) : null}
          {photos.length > 1 ? (
            <div className="grid grid-cols-3 gap-2">
              {photos.slice(1, 4).map((url) => (
                <div key={url} className="relative aspect-square overflow-hidden rounded-xl border border-[var(--cm-line)]">
                  <Image src={url!} alt="" fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <CafesYandexMap cafes={[cafe]} />
      </div>

      {photos[0] ? (
        <div className="relative min-h-[200px] overflow-hidden rounded-2xl border border-[var(--cm-line-strong)] md:min-h-[280px]">
          <Image src={photos[0]} alt="" fill className="object-cover brightness-[0.85]" sizes="100vw" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/35 p-6">
            {cafe.menuUrl ? (
              <CoffeeButton href={cafe.menuUrl} variant="neutral" className="bg-white text-[var(--cm-maroon)] hover:bg-[var(--cm-cream)]">
                Посмотреть меню
              </CoffeeButton>
            ) : (
              <span className="rounded-lg bg-white/90 px-6 py-3 text-sm font-semibold text-[var(--cm-maroon)]">
                Меню уточняйте по телефону
              </span>
            )}
          </div>
        </div>
      ) : null}
    </article>
  )
}
