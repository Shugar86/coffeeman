import { RichTextContent } from '@/components/site/RichTextContent'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'О нас — CoffeeMan' }

export default async function AboutPage() {
  const payload = await getPayloadClient()
  const site = await payload.findGlobal({ slug: 'site-settings', depth: 0 })

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">О нас</h1>
      <div className="mt-8 max-w-none space-y-4 text-neutral-800 dark:text-neutral-200">
        {site.aboutContent ? (
          <RichTextContent data={site.aboutContent} />
        ) : (
          <p className="text-neutral-600 dark:text-neutral-400">
            Контент появится после заполнения поля «О нас» в админке → Настройки сайта.
          </p>
        )}
      </div>
    </article>
  )
}
