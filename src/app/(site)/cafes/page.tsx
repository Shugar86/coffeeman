import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'

export const metadata = { title: 'Кофейни — CoffeeMan' }

export default async function CafesListPage() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'cafes',
    sort: 'name',
    limit: 100,
    depth: 0,
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Кофейни</h1>
      <ul className="mt-8 space-y-4">
        {res.docs.map((c) => (
          <li key={c.id}>
            <Link href={`/cafes/${c.slug}`} className="text-lg font-medium hover:text-amber-800 dark:hover:text-amber-400">
              {c.name}
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{c.address}</p>
          </li>
        ))}
      </ul>
      {res.docs.length === 0 ? <p className="mt-8 text-neutral-500">Список появится в админке.</p> : null}
    </div>
  )
}
