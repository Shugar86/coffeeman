import { RichTextContent } from '@/components/site/RichTextContent'
import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
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
    <article className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <Link href="/cafes" className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--cm-maroon)] hover:underline">
        ← Все кофейни
      </Link>
      <h1 className="cm-heading mt-6 text-3xl md:text-4xl">{cafe.name}</h1>
      <p className="mt-3 text-[var(--cm-ink-muted)]">{cafe.address}</p>
      {cafe.hours ? <p className="mt-4 whitespace-pre-line text-sm text-[var(--cm-ink)]">{cafe.hours}</p> : null}
      {cafe.description ? (
        <div className="cm-prose mt-10 max-w-none space-y-4 border-t border-[var(--cm-line-strong)] pt-10 text-[var(--cm-ink)]">
          <RichTextContent data={cafe.description} />
        </div>
      ) : null}
    </article>
  )
}
