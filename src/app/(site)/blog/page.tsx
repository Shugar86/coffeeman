import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'

export const metadata = { title: 'Блог — CoffeeMan' }

export default async function BlogListPage() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'articles',
    sort: '-publishedAt',
    limit: 50,
    depth: 1,
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Блог</h1>
      <ul className="mt-8 space-y-6">
        {res.docs.map((a) => (
          <li key={a.id} className="border-b border-neutral-200 pb-6 dark:border-neutral-800">
            <Link href={`/blog/${a.slug}`} className="text-xl font-semibold hover:text-amber-800 dark:hover:text-amber-400">
              {a.title}
            </Link>
            {a.excerpt ? <p className="mt-2 text-neutral-600 dark:text-neutral-400">{a.excerpt}</p> : null}
          </li>
        ))}
      </ul>
      {res.docs.length === 0 ? (
        <p className="mt-8 text-neutral-500">Статьи появятся после публикации в админке.</p>
      ) : null}
    </div>
  )
}
