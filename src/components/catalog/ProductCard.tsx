import { getMediaUrl } from '@/lib/media-url'
import type { Product } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const firstImg = product.images?.[0]
  const url = getMediaUrl(typeof firstImg === 'object' ? firstImg : null)

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-900">
        {url ? (
          <Image src={url} alt={product.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-400">Нет фото</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-semibold group-hover:text-amber-800 dark:group-hover:text-amber-400">{product.title}</h2>
        <p className="mt-1 text-sm text-neutral-500">
          {product.productType === 'coffee' ? 'Кофе' : product.productType === 'tea' ? 'Чай' : ''}
        </p>
        <p className="mt-auto pt-3 text-lg font-bold">{product.price} ₽</p>
      </div>
    </Link>
  )
}
