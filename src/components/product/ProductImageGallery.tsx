'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useState } from 'react'

type Props = {
  images: string[]
  alt: string
}

/**
 * Слайдер изображений товара (PDP).
 */
export function ProductImageGallery({ images, alt }: Props) {
  const [idx, setIdx] = useState(0)
  const go = useCallback(
    (d: number) => {
      if (images.length === 0) return
      setIdx((i) => (i + d + images.length) % images.length)
    },
    [images.length],
  )

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-[var(--cm-line-strong)] bg-[var(--cm-cream)] cm-botanical-bg text-[var(--cm-ink-muted)]">
        Нет фото
      </div>
    )
  }

  const src = images[idx]

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--cm-line-strong)] bg-[var(--cm-cream)] cm-botanical-bg">
        <AnimatePresence mode="wait">
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Предыдущее фото"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 px-2 py-1 text-white backdrop-blur-sm"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Следующее фото"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 px-2 py-1 text-white backdrop-blur-sm"
              onClick={() => go(1)}
            >
              ›
            </button>
            <p className="absolute bottom-2 right-3 rounded bg-black/40 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
              {idx + 1}/{images.length}
            </p>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setIdx(i)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-[var(--cm-sand)] ${
                i === idx ? 'border-[var(--cm-maroon)]' : 'border-[var(--cm-line)]'
              }`}
            >
              <Image src={url} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
