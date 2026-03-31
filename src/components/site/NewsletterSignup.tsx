'use client'

import { CoffeeButton } from '@/components/ui/Button'
import { PolaroidFrame } from '@/components/ui/PolaroidFrame'
import Image from 'next/image'
import { useState } from 'react'

/**
 * Блок подписки по макету — полароид слева, форма справа.
 */
export function NewsletterSignup() {
  const [sent, setSent] = useState(false)

  return (
    <div className="rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:items-center md:gap-14 md:p-10 lg:gap-16">
      <div className="hidden md:flex md:justify-center md:pl-2">
        <PolaroidFrame rotateDeg={-4} className="w-[17rem] max-w-full">
          <Image
            src="/images/hero-polaroid-2.png"
            alt="CoffeeMan"
            fill
            className="object-cover"
            sizes="272px"
          />
        </PolaroidFrame>
      </div>

      <div className="md:pr-2">
        <h2 className="font-display text-xl font-bold uppercase tracking-[0.12em] text-[var(--cm-maroon)] md:text-2xl lg:text-3xl">
          Подписаться на рассылку
        </h2>
        <p className="mt-3 text-[var(--cm-ink-muted)]">Новости обжарки и спецпредложения — без спама.</p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <input name="name" placeholder="Ваше имя" className="cm-input w-full" disabled={sent} />
          <input name="email" type="email" required placeholder="Ваш email" className="cm-input w-full" disabled={sent} />
          <CoffeeButton type="submit" variant="primary" className="w-full min-w-[200px] md:w-auto" disabled={sent}>
            {sent ? 'Спасибо!' : 'Подписаться'}
          </CoffeeButton>
        </form>
      </div>
    </div>
  )
}
