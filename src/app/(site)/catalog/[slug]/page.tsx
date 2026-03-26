import { AddToCartSection } from '@/components/product/AddToCartSection'
import { SensoryBar } from '@/components/product/SensoryBar'
import { RichTextContent } from '@/components/site/RichTextContent'
import { getMediaUrl } from '@/lib/media-url'
import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const p = res.docs[0]
  return { title: p ? `${p.title} — CoffeeMan` : 'Товар' }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const product = res.docs[0]
  if (!product) notFound()

  const images =
    product.images?.map((img) => getMediaUrl(typeof img === 'object' ? img : null)).filter(Boolean) ??
    []

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
            {images[0] ? (
              <Image src={images[0]} alt={product.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            ) : (
              <div className="flex h-full items-center justify-center text-neutral-400">Нет фото</div>
            )}
          </div>
          {images.length > 1 ? (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1, 5).map((url) => (
                <div key={url} className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={url!} alt="" fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <p className="text-sm text-neutral-500">
            {product.productType === 'coffee' ? 'Кофе' : product.productType === 'tea' ? 'Чай' : ''}
          </p>
          <h1 className="mt-1 text-3xl font-semibold">{product.title}</h1>
          <p className="mt-4 text-3xl font-bold">{product.price} ₽</p>
          <div className="mt-8 space-y-4">
            <SensoryBar label="Плотность" value={product.sensoryDensity ?? undefined} />
            <SensoryBar label="Кислотность" value={product.sensoryAcidity ?? undefined} />
            <SensoryBar label="Горечь" value={product.sensoryBitterness ?? undefined} />
          </div>
          <div className="mt-10">
            <AddToCartSection product={product} />
          </div>
        </div>
      </div>
      {product.description ? (
        <section className="mt-14 border-t border-neutral-200 pt-10 dark:border-neutral-800">
          <h2 className="text-xl font-semibold">Описание</h2>
          <div className="mt-4 space-y-4 text-neutral-800 dark:text-neutral-200">
            <RichTextContent data={product.description} />
          </div>
        </section>
      ) : null}
    </article>
  )
}
