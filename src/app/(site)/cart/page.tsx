import { CartView } from '@/components/cart/CartView'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'Корзина — CoffeeMan' }

export default async function CartPage() {
  const payload = await getPayloadClient()
  const hot = await payload.find({
    collection: 'products',
    sort: '-popularity',
    limit: 4,
    depth: 1,
  })

  return <CartView recommended={hot.docs} />
}
