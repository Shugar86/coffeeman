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
    <div className="rounded-2xl border border-[var(--cm-line-strong)] bg-white p-6 shadow-sm md:grid md:grid-cols-2 md:items-center md:gap-12 md:p-10">
      {/* Левая колонка — полароид */}
      <div className="hidden md:flex md:justify-center">
        <PolaroidFrame rotateDeg={-3} className="w-64">
          <Image
            src="/images/hero-polaroid-2.png"
            alt="CoffeeMan"
            fill
            className="object-cover"
            sizes="256px"
          />
        </PolaroidFrame>
      </div>

      {/* Правая колонка — форма */}
      <div>
        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-[var(--cm-maroon)] md:text-3xl">
          Подписаться на рассылку
        </h2>
        <p className="mt-2 text-[var(--cm-ink-muted)]">Новости обжарки и спецпредложения — без спама.</p>
        <form
          className="mt-6 space-y-4"
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
