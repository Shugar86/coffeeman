import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { getPayloadClient } from '@/lib/payload'
import React from 'react'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayloadClient()
  const site = await payload.findGlobal({ slug: 'site-settings', depth: 0 })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer
        companyName={site.companyName}
        phone={site.phone}
        email={site.email}
        address={site.address}
      />
    </div>
  )
}
