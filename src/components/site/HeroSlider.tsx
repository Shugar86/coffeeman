'use client'

import { HERO_ASSETS } from '@/components/site/hero/hero-assets'
import { HeroOlivePanel } from '@/components/site/hero/HeroOlivePanel'
import { HeroPhotoStrip } from '@/components/site/hero/HeroPhotoStrip'
import { HeroTornRibbon } from '@/components/site/hero/HeroTornRibbon'
import type { HeroSlide } from '@/components/site/hero/hero-types'
import { useCallback, useEffect, useState } from 'react'

export type { HeroSlide }

type Props = {
  slides: HeroSlide[]
  className?: string
}

/**
 * Hero главной: слои из локальных ассетов — фото, PNG рваной полосы (макет), SVG torn-edge,
 * олива, PNG Marsala_Line, штамп, CTA PNG, SVG стрелки из public.
 */
export function HeroSlider({ slides, className = '' }: Props) {
  const [i, setI] = useState(0)

  const go = useCallback(
    (dir: -1 | 1) => {
      if (slides.length === 0) return
      setI((v) => (v + dir + slides.length) % slides.length)
    },
    [slides.length],
  )

  useEffect(() => {
    if (slides.length <= 1) return
    const t = setInterval(() => go(1), 6500)
    return () => clearInterval(t)
  }, [slides.length, go])

  const slide = slides.length > 0 ? slides[i] : null
  const photoSrc = slide?.imageUrl || HERO_ASSETS.fallbackPhoto
  const headline = slide?.title?.trim() || 'Кофе с историей и сердцем'
  const subtitle = slide?.subtitle?.trim()
  const noSlides = slides.length === 0

  return (
    <section className={`relative text-white ${className}`}>
      <HeroPhotoStrip
        photoSrc={photoSrc}
        slideKey={slide?.id ?? i}
        showControls={slides.length > 1}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />

      <HeroTornRibbon fill="var(--cm-olive)" />

      <HeroOlivePanel headline={headline} subtitle={subtitle} showAdminHint={noSlides} />
    </section>
  )
}
