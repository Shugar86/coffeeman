'use client'

import { CoffeeButton } from '@/components/ui/Button'
import { useState } from 'react'

/**
 * Блок подписки по макету article.png (без бэкенда — локальное подтверждение).
 */
export function NewsletterSignup() {
  const [sent, setSent] = useState(false)

  return (
    <div className="rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm md:grid md:grid-cols-2 md:gap-8 md:p-10">
      <div className="relative hidden min-h-[200px] overflow-hidden rounded-xl bg-[var(--cm-sand)] md:block">
        <div className="absolute inset-0 rotate-[-4deg] scale-105 bg-gradient-to-br from-[var(--cm-maroon)]/20 to-transparent" />
        <p className="relative z-10 p-6 font-display text-lg text-[var(--cm-maroon)]">Coffee Man</p>
      </div>
      <div>
        <h2 className="cm-heading text-xl md:text-2xl">Подписаться на рассылку</h2>
        <p className="mt-2 text-sm text-[var(--cm-ink-muted)]">Новости обжарки и спецпредложения — без спама.</p>
        <form
          className="mt-6 space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <input name="name" placeholder="Ваше имя" className="cm-input w-full" disabled={sent} />
          <input name="email" type="email" required placeholder="Ваш email" className="cm-input w-full" disabled={sent} />
          <CoffeeButton type="submit" className="w-full md:w-auto" disabled={sent}>
            {sent ? 'Спасибо!' : 'Подписаться'}
          </CoffeeButton>
        </form>
      </div>
    </div>
  )
}
