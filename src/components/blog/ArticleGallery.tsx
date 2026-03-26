'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useCallback, useState } from 'react'

type Props = {
  images: string[]
  title: string
}

/**
 * Слайдер изображений статьи (обложка + gallery из CMS).
 */
export function ArticleGallery({ images, title }: Props) {
  const [idx, setIdx] = useState(0)
  const go = useCallback(
    (d: number) => {
      if (!images.length) return
      setIdx((i) => (i + d + images.length) % images.length)
    },
    [images.length],
  )

  if (images.length === 0) {
    return (
      <div className="relative flex min-h-[320px] items-center justify-center rounded-2xl border border-[var(--cm-line-strong)] bg-[var(--cm-sand)] text-[var(--cm-ink-muted)]">
        Нет изображений
      </div>
    )
  }

  const src = images[idx]

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-[3/4] max-h-[min(80vh,640px)] overflow-hidden rounded-2xl border border-[var(--cm-line-strong)] bg-[var(--cm-sand)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Image src={src} alt={title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
          </motion.div>
        </AnimatePresence>
        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Предыдущее"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/35 px-2 py-1 text-white"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Следующее"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/35 px-2 py-1 text-white"
              onClick={() => go(1)}
            >
              ›
            </button>
            <p className="absolute bottom-3 left-3 rounded bg-black/45 px-2 py-1 text-xs text-white">
              {idx + 1}/{images.length}
            </p>
          </>
        ) : null}
      </div>
    </div>
  )
}
