import { RichTextContent } from '@/components/site/RichTextContent'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'Контакты — CoffeeMan' }

export default async function ContactsPage() {
  const payload = await getPayloadClient()
  const site = await payload.findGlobal({ slug: 'site-settings', depth: 0 })

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Контакты</h1>
      <ul className="mt-6 space-y-2 text-neutral-700 dark:text-neutral-300">
        {site.phone ? <li>Телефон: {site.phone}</li> : null}
        {site.email ? <li>Email: {site.email}</li> : null}
        {site.address ? <li>{site.address}</li> : null}
      </ul>
      {site.contactsContent ? (
        <div className="mt-8 max-w-none space-y-4 text-neutral-800 dark:text-neutral-200">
          <RichTextContent data={site.contactsContent} />
        </div>
      ) : null}
    </article>
  )
}
