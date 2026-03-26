'use client'

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
}

export function HeroSlider({ slides }: Props) {
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
      <section className="relative flex min-h-[320px] items-center justify-center bg-neutral-900 text-white">
        <div className="px-4 text-center">
          <h1 className="text-3xl font-semibold">CoffeeMan</h1>
          <p className="mt-2 text-neutral-300">Добавьте слайды в глобальных настройках сайта</p>
        </div>
      </section>
    )
  }

  const slide = slides[i]

  return (
    <section className="relative min-h-[380px] overflow-hidden bg-neutral-900">
      {slide.imageUrl ? (
        <Image
          src={slide.imageUrl}
          alt={slide.title || 'Hero'}
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
      ) : null}
      <div className="relative z-10 mx-auto flex min-h-[380px] max-w-6xl flex-col justify-center px-4 py-16 text-white">
        {slide.title ? <h1 className="text-4xl font-bold tracking-tight drop-shadow-md">{slide.title}</h1> : null}
        {slide.subtitle ? (
          <p className="mt-3 max-w-xl text-lg text-neutral-100 drop-shadow">{slide.subtitle}</p>
        ) : null}
        {slide.link ? (
          <Link
            href={slide.link}
            className="mt-6 inline-flex w-fit rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-500"
          >
            Смотреть каталог
          </Link>
        ) : null}
      </div>
      {slides.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Предыдущий слайд"
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Следующий слайд"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
            onClick={() => go(1)}
          >
            ›
          </button>
        </>
      ) : null}
    </section>
  )
}
