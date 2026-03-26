import { RichTextContent } from '@/components/site/RichTextContent'
import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'

export const metadata = { title: 'Контакты — CoffeeMan' }

/**
 * Контакты в едином стиле с макетами (без отдельного PNG).
 */
export default async function ContactsPage() {
  const payload = await getPayloadClient()
  const site = await payload.findGlobal({ slug: 'site-settings', depth: 0 })

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="cm-heading text-3xl md:text-4xl">Контакты</h1>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="rounded-2xl border border-[var(--cm-line-strong)] bg-white p-8 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">Связь</p>
          <ul className="mt-6 space-y-4 text-[var(--cm-ink)]">
            {site.phone ? (
              <li>
                <span className="text-xs uppercase tracking-wider text-[var(--cm-ink-muted)]">Телефон</span>
                <p className="mt-1 text-lg font-medium">{site.phone}</p>
              </li>
            ) : null}
            {site.email ? (
              <li>
                <span className="text-xs uppercase tracking-wider text-[var(--cm-ink-muted)]">Email</span>
                <p className="mt-1">
                  <Link href={`mailto:${site.email}`} className="text-lg font-medium text-[var(--cm-maroon)] hover:underline">
                    {site.email}
                  </Link>
                </p>
              </li>
            ) : null}
            {site.address ? (
              <li>
                <span className="text-xs uppercase tracking-wider text-[var(--cm-ink-muted)]">Адрес</span>
                <p className="mt-1 whitespace-pre-line">{site.address}</p>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--cm-line-strong)] bg-[var(--cm-sand)]/50 p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">Дополнительно</p>
          {site.contactsContent ? (
            <div className="cm-prose mt-6 max-w-none space-y-4 text-[var(--cm-ink)]">
              <RichTextContent data={site.contactsContent} />
            </div>
          ) : (
            <p className="mt-6 text-sm text-[var(--cm-ink-muted)]">
              Текст можно добавить в админке → Настройки сайта → контент контактов.
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
