'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export type HeroSlide = {
  id?: string | null
  imageUrl: string | null
  title?: string | null
  subtitle?: string | null
  link?: string | null
}

type Props = {
  slides: HeroSlide[]
  className?: string
}

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
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [slides.length, go])

  if (slides.length === 0) {
    return (
      <section
        className={`relative flex min-h-[100svh] items-center justify-center bg-[var(--cm-olive)] text-white ${className}`}
      >
        <div className="px-4 text-center">
          <h1 className="font-display text-3xl font-semibold uppercase tracking-wide md:text-5xl">
            Кофе с историей и сердцем
          </h1>
          <p className="mt-3 text-white/85">Добавьте слайды в настройках сайта (админка)</p>
        </div>
      </section>
    )
  }

  const slide = slides[i]

  return (
    <section className={`relative min-h-[100svh] overflow-hidden bg-[#1a0a0c] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id ?? i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {slide.imageUrl ? (
            <Image
              src={slide.imageUrl}
              alt={slide.title || 'Hero'}
              fill
              className="object-cover opacity-85"
              priority
              sizes="100vw"
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" aria-hidden />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 py-20 text-white md:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id ?? i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            {slide.title ? (
              <h1 className="font-display text-4xl font-bold uppercase leading-[1.1] tracking-wide drop-shadow-md md:text-6xl lg:text-7xl">
                {slide.title}
              </h1>
            ) : (
              <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide drop-shadow-md md:text-6xl">
                Кофе с историей и сердцем
              </h1>
            )}
            {slide.subtitle ? (
              <p className="mt-5 max-w-xl text-lg text-white/95 drop-shadow md:text-xl">{slide.subtitle}</p>
            ) : null}
            {slide.link ? (
              <Link
                href={slide.link}
                className="mt-10 inline-flex w-fit rounded-lg bg-[var(--cm-maroon)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--cm-maroon-hover)]"
              >
                Смотреть каталог
              </Link>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <a
          href="#story"
          className="flex flex-col items-center gap-1 text-white/80 transition hover:text-white"
          aria-label="Прокрутить вниз"
        >
          <svg width="24" height="24" viewBox="0 0 15.33 9.57" fill="currentColor" className="animate-bounce">
            <path d="M8.45 9.57c-5.19 0-8.33-3.6-8.45-9.57h2.62c.09 4.39 2.08 6.25 3.61 6.63V0h2.52v3.79c1.47-.16 3.02-1.88 3.54-3.79h2.48c-.19.98-.58 1.9-1.14 2.73-.56.82-1.29 1.52-2.13 2.05.94.49 1.77 1.16 2.43 1.99.66.83 1.14 1.78 1.41 2.8h-2.72c-.57-1.82-1.98-3.23-3.87-3.42v3.42h-.3z"/>
          </svg>
        </a>
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Предыдущий слайд"
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 md:flex"
            onClick={() => go(-1)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Следующий слайд"
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20 md:flex"
            onClick={() => go(1)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      ) : null}
    </section>
  )
}
