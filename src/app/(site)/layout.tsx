import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { SiteMain } from '@/components/site/SiteMain'
import { getPayloadClient } from '@/lib/payload'
import React from 'react'

/** Витрина тянет Payload/Postgres — без этого `next build` в Docker падает без БД на этапе сборки. */
export const dynamic = 'force-dynamic'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const site = await payload.findGlobal({ slug: 'site-settings', depth: 0 })

  const socialLinks =
    site.socialLinks?.map((row) => ({
      label: row.label,
      url: row.url,
    })) ?? []

  return (
    <div className="coffee-site flex min-h-screen flex-col">
      <Header />
      <SiteMain>{children}</SiteMain>
      <Footer
        companyName={site.companyName}
        phone={site.phone}
        email={site.email}
        address={site.address}
        socialLinks={socialLinks}
      />
    </div>
  )
}
