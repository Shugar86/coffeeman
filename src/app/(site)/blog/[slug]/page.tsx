import { ArticleGallery } from '@/components/blog/ArticleGallery'
import { ProductCard } from '@/components/catalog/ProductCard'
import { NewsletterSignup } from '@/components/site/NewsletterSignup'
import { RichTextContent } from '@/components/site/RichTextContent'
import { getMediaUrl } from '@/lib/media-url'
import { getPayloadClient } from '@/lib/payload'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  return `${base.replace(/\/$/, '')}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  const a = res.docs[0]
  if (!a) {
    return { title: 'Статья — CoffeeMan' }
  }
  const titleBase = (a.metaTitle && String(a.metaTitle).trim()) || a.title
  const description =
    (a.metaDescription && String(a.metaDescription).trim()) ||
    (a.excerpt && String(a.excerpt).trim()) ||
    undefined
  const coverUrl = getMediaUrl(typeof a.cover === 'object' ? a.cover : null)
  return {
    title: `${titleBase} — CoffeeMan`,
    description,
    openGraph: {
      title: titleBase,
      description,
      type: 'article',
      publishedTime: a.publishedAt ? String(a.publishedAt) : undefined,
      images: coverUrl ? [{ url: absoluteUrl(coverUrl) }] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const [articleRes, productsRes] = await Promise.all([
    payload.find({
      collection: 'articles',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    }),
    payload.find({
      collection: 'products',
      limit: 3,
      sort: '-popularity',
      depth: 1,
    }),
  ])

  const article = articleRes.docs[0]
  if (!article) notFound()

  const coverSrc = getMediaUrl(typeof article.cover === 'object' ? article.cover : null)
  const extra =
    article.gallery
      ?.map((g) => getMediaUrl(typeof g === 'object' ? g : null))
      .filter((u): u is string => Boolean(u)) ?? []
  const images = [coverSrc, ...extra].filter((u): u is string => Boolean(u))

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <nav className="mb-8 text-xs font-medium uppercase tracking-[0.15em] text-[var(--cm-ink-muted)] md:text-right">
        <Link href="/" className="hover:text-[var(--cm-maroon)]">
          Главная
        </Link>
        <span className="mx-2">→</span>
        <Link href="/blog" className="hover:text-[var(--cm-maroon)]">
          Новости
        </Link>
        <span className="mx-2">→</span>
        <span className="text-[var(--cm-ink)]">{article.title}</span>
      </nav>

      <div className={images.length ? 'grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start' : ''}>
        {images.length ? <ArticleGallery images={images} title={article.title} /> : null}

        <div className="min-w-0">
          <h1 className="cm-heading text-3xl leading-tight md:text-4xl lg:text-[2.25rem]">{article.title}</h1>
          {article.publishedAt ? (
            <p className="mt-3 text-sm text-[var(--cm-ink-muted)]">
              {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          ) : null}
          {article.excerpt ? <p className="mt-4 text-[var(--cm-ink-muted)]">{article.excerpt}</p> : null}
          <div className="cm-prose mt-8 max-w-none space-y-4 text-[var(--cm-ink)]">
            <RichTextContent data={article.content} />
          </div>
        </div>
      </div>

      <section className="mt-20 border-t border-[var(--cm-line-strong)] pt-16">
        <h2 className="cm-heading text-2xl md:text-3xl">Возможно, вам понравится</h2>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productsRes.docs.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <NewsletterSignup />
      </section>
    </article>
  )
}
