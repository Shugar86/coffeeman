'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Отступ под фиксированный Header: на главной hero уходит под шапку, padding не нужен.
 */
export function SiteMain({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return <main className={`flex-1 ${isHome ? '' : 'pt-16'}`}>{children}</main>
}
