import { BlogTopicBar } from '@/components/blog/BlogTopicBar'
import { getMediaUrl } from '@/lib/media-url'
import { getPayloadClient } from '@/lib/payload'
import type { Where } from 'payload'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'Блог — CoffeeMan' }

type SearchParams = Record<string, string | string[] | undefined>

function sp(params: SearchParams, key: string): string | undefined {
  const v = params[key]
  return Array.isArray(v) ? v[0] : v
}

function topicWhere(topic: string | undefined): Where | undefined {
  if (!topic) return undefined
  const t = topic.toLowerCase()
  if (t === 'news') return { title: { contains: 'новост' } }
  if (t === 'promo') return { or: [{ title: { contains: 'акци' } }, { title: { contains: 'скид' } }] }
  if (t === 'brew') return { title: { contains: 'приготов' } }
  if (t === 'roast') return { title: { contains: 'обжар' } }
  if (t === 'grow') return { title: { contains: 'выращ' } }
  if (t === 'cafes') return { title: { contains: 'кофейн' } }
  if (t === 'tea') return { title: { contains: 'чай' } }
  return undefined
}

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const p = await searchParams
  const topic = sp(p, 'topic')
  const sort = sp(p, 'sort') || 'date'
  const tw = topicWhere(topic)
  const where: Where = tw ? { and: [tw] } : {}

  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    where,
    sort: sort === 'old' ? 'publishedAt' : '-publishedAt',
    limit: 60,
    depth: 1,
  })

  const promoDocs = res.docs.filter(
    (a) => /акци|скид|промо/i.test(a.title) || /акци|скид/i.test(a.excerpt || ''),
  )
  const rest = res.docs.filter((a) => !promoDocs.includes(a))

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="cm-heading text-3xl md:text-5xl">Блог</h1>
          <p className="mt-3 max-w-xl text-[var(--cm-ink-muted)]">Новости обжарки, гайды и жизнь Coffee Man.</p>
        </div>
        <div className="flex gap-2 text-sm">
          <Link
            href={`/blog?${new URLSearchParams({ ...(topic ? { topic } : {}), sort: 'date' }).toString()}`}
            className={`font-semibold uppercase tracking-wide ${sort !== 'old' ? 'text-[var(--cm-maroon)]' : 'text-[var(--cm-ink-muted)]'}`}
          >
            Сначала новые
          </Link>
          <span className="text-[var(--cm-line-strong)]">|</span>
          <Link
            href={`/blog?${new URLSearchParams({ ...(topic ? { topic } : {}), sort: 'old' }).toString()}`}
            className={`font-semibold uppercase tracking-wide ${sort === 'old' ? 'text-[var(--cm-maroon)]' : 'text-[var(--cm-ink-muted)]'}`}
          >
            Сначала старые
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-[var(--cm-line)] pb-6">
        <span className="text-2xl" aria-hidden>
          ☕
        </span>
        <span className="text-2xl" aria-hidden>
          🫖
        </span>
        <span className="text-2xl" aria-hidden>
          📰
        </span>
        <div className="min-w-0 flex-1">
          <BlogTopicBar active={topic || ''} />
        </div>
      </div>

      {promoDocs.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--cm-maroon)]">Акции и спецпредложения</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {promoDocs.slice(0, 4).map((a) => (
              <li key={a.id}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="flex h-full min-h-[200px] flex-col justify-between rounded-2xl bg-[var(--cm-maroon)] p-6 text-white shadow-md transition hover:bg-[var(--cm-maroon-hover)]"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Акция</span>
                  <h3 className="mt-4 font-display text-lg font-semibold uppercase leading-snug">{a.title}</h3>
                  <span className="mt-6 inline-flex w-fit rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[var(--cm-maroon)]">
                    Подробнее
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(promoDocs.length ? rest : res.docs).map((a) => {
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
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[var(--cm-ink-muted)]">Нет обложки</div>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded bg-[var(--cm-sand-dark)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--cm-maroon)]">
                    Материал
                  </span>
                </div>
                <h2 className="mt-2 font-display text-lg font-semibold uppercase tracking-wide text-[var(--cm-maroon)] group-hover:opacity-90">
                  {a.title}
                </h2>
                {a.publishedAt ? (
                  <p className="mt-1 text-xs uppercase tracking-wider text-[var(--cm-ink-muted)]">
                    {new Date(a.publishedAt).toLocaleDateString('ru-RU')}
                  </p>
                ) : null}
                {a.excerpt ? <p className="mt-2 line-clamp-3 text-sm text-[var(--cm-ink-muted)]">{a.excerpt}</p> : null}
                <span className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--cm-maroon)] text-xl font-light text-[var(--cm-maroon)] transition group-hover:bg-[var(--cm-maroon)] group-hover:text-white">
                  +
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
      {res.docs.length === 0 ? (
        <p className="mt-12 text-[var(--cm-ink-muted)]">Нет статей по этой теме — выберите «Все темы».</p>
      ) : null}
    </div>
  )
}
