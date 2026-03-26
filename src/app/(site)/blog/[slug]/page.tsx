import { RichTextContent } from '@/components/site/RichTextContent'
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const a = res.docs[0]
  return { title: a ? `${a.title} — CoffeeMan` : 'Статья' }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const article = res.docs[0]
  if (!article) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{article.title}</h1>
      {article.publishedAt ? (
        <p className="mt-2 text-sm text-neutral-500">{new Date(article.publishedAt).toLocaleDateString('ru-RU')}</p>
      ) : null}
      <div className="mt-8 space-y-4 text-neutral-800 dark:text-neutral-200">
        <RichTextContent data={article.content} />
      </div>
    </article>
  )
}
