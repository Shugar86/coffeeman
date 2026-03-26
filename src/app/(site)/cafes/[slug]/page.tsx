import { RichTextContent } from '@/components/site/RichTextContent'
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'cafes',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const c = res.docs[0]
  return { title: c ? `${c.name} — CoffeeMan` : 'Кофейня' }
}

export default async function CafePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'cafes',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const cafe = res.docs[0]
  if (!cafe) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">{cafe.name}</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">{cafe.address}</p>
      {cafe.hours ? (
        <p className="mt-2 text-sm text-neutral-500 whitespace-pre-line">{cafe.hours}</p>
      ) : null}
      {cafe.description ? (
        <div className="mt-8 space-y-4 text-neutral-800 dark:text-neutral-200">
          <RichTextContent data={cafe.description} />
        </div>
      ) : null}
    </article>
  )
}
