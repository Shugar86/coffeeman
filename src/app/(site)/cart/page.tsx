import { CartView } from '@/components/cart/CartView'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'Корзина — CoffeeMan' }

export default async function CartPage() {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    sort: '-popularity',
    limit: 24,
    depth: 1,
  })

  const day = Math.floor(Date.now() / 86400000)
  const pool = [...res.docs]
  const picked: typeof pool = []
  const indices = [day % pool.length, (day * 3) % pool.length, (day * 7) % pool.length]
  for (const ix of indices) {
    const p = pool[ix % Math.max(pool.length, 1)]
    if (p && !picked.some((x) => x.id === p.id)) picked.push(p)
  }
  while (picked.length < 3 && pool.length > picked.length) {
    const p = pool.find((x) => !picked.some((y) => y.id === x.id))
    if (p) picked.push(p)
  }

  return <CartView recommended={picked.length >= 3 ? picked.slice(0, 3) : res.docs.slice(0, 3)} />
}
