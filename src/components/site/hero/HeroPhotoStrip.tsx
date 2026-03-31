'use client'

import { HERO_ASSETS } from '@/components/site/hero/hero-assets'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
type Props = {
  photoSrc: string
  slideKey: string | number
  showControls: boolean
  onPrev: () => void
  onNext: () => void
}

/**
 * Верхний слой: фото + опциональный PNG рваной бордовой полосы из макета (Screen-3-back-1).
 * Если полоса даёт «грязный» стык на конкретном фоне — ослабить opacity или отключить слой.
 */
export function HeroPhotoStrip({ photoSrc, slideKey, showControls, onPrev, onNext }: Props) {
  return (
    <div className="relative h-[min(48vh,560px)] min-h-[220px] w-full overflow-hidden md:min-h-[280px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slideKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="absolute inset-0"
        >
          <Image src={photoSrc} alt="" fill className="object-cover" priority sizes="100vw" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" aria-hidden />

      {/* Декоративная рваная бордовая полоса поверх нижней части фото (экспорт макета, не CSS). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center">
        <Image
          src={HERO_ASSETS.tornMaroonOverlay}
          alt=""
          width={1920}
          height={400}
          className="h-auto w-[min(100%,1400px)] max-h-[min(42vh,320px)] object-contain object-bottom opacity-[0.72]"
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
      </div>

      {showControls ? (
        <>
          <button
            type="button"
            aria-label="Предыдущий слайд"
            className="absolute left-2 top-1/2 z-[2] hidden -translate-y-1/2 rounded-full bg-black/30 p-2 text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-black/45 md:flex"
            onClick={onPrev}
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            aria-label="Следующий слайд"
            className="absolute right-2 top-1/2 z-[2] hidden -translate-y-1/2 rounded-full bg-black/30 p-2 text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-black/45 md:flex"
            onClick={onNext}
          >
            <Chevron dir="right" />
          </button>
        </>
      ) : null}
    </div>
  )
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      {dir === 'left' ? <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /> : null}
      {dir === 'right' ? <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /> : null}
    </svg>
  )
}
