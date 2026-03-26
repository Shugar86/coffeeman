import type { Media } from '@/payload-types'

/** Публичный URL файла медиа (локальное хранилище Payload). */
export function getMediaUrl(media: number | Media | null | undefined): string | null {
  if (media == null || typeof media === 'number') return null
  if (typeof media === 'object' && media.url) return media.url
  return null
}
