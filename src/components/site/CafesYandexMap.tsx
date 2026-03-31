'use client'

import type { Cafe } from '@/payload-types'
import Script from 'next/script'
import { useEffect, useMemo, useId, useRef, useState } from 'react'

declare global {
  interface Window {
    ymaps?: {
      ready: (cb: () => void) => void
      Map: new (
        el: HTMLElement,
        opts: { center: number[]; zoom: number; controls?: string[] },
      ) => { geoObjects: { add: (o: unknown) => void }; destroy: () => void }
      Placemark: new (coords: number[], opts?: { balloonContent?: string }) => unknown
    }
  }
}

type Props = {
  cafes: Pick<Cafe, 'id' | 'name' | 'address' | 'location'>[]
  className?: string
}

/**
 * Яндекс.Карты: пины по location.lat / location.lng. Ключ `NEXT_PUBLIC_YMAPS_KEY`.
 */
export function CafesYandexMap({ cafes, className = '' }: Props) {
  const mapId = useId().replace(/:/g, '')
  const elRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<{ destroy: () => void } | null>(null)
  const [ready, setReady] = useState(false)
  const key = process.env.NEXT_PUBLIC_YMAPS_KEY

  const points = useMemo(
    () =>
      cafes
        .map((c) => {
          const lat = c.location?.lat
          const lng = c.location?.lng
          if (lat == null || lng == null) return null
          return { lat, lng, name: c.name, address: c.address }
        })
        .filter(Boolean) as { lat: number; lng: number; name: string; address: string }[],
    [cafes],
  )

  useEffect(() => {
    if (!ready || !key || !elRef.current || points.length === 0) return
    const el = elRef.current
    mapRef.current?.destroy()
    mapRef.current = null

    window.ymaps?.ready(() => {
      if (!window.ymaps || !el) return
      const center: [number, number] = [points[0].lat, points[0].lng]
      const map = new window.ymaps.Map(el, {
        center,
        zoom: points.length > 1 ? 11 : 15,
        controls: ['zoomControl'],
      })
      mapRef.current = map
      for (const p of points) {
        const pm = new window.ymaps.Placemark([p.lat, p.lng], {
          balloonContent: `<strong>${p.name}</strong><br/>${p.address}`,
        })
        map.geoObjects.add(pm)
      }
    })

    return () => {
      mapRef.current?.destroy()
      mapRef.current = null
    }
  }, [ready, key, points])

  if (!key) {
    return (
      <div
        className={`flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-[var(--cm-line-strong)] bg-[var(--cm-sand)] text-center text-sm text-[var(--cm-ink-muted)] ${className}`}
      >
        Укажите NEXT_PUBLIC_YMAPS_KEY для карты
      </div>
    )
  }

  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU`}
        onLoad={() => setReady(true)}
        strategy="lazyOnload"
      />
      <div
        id={`ymap-${mapId}`}
        ref={elRef}
        className={`min-h-[280px] w-full overflow-hidden rounded-2xl border-2 border-[var(--cm-line-strong)] bg-[#f0ebe3] shadow-inner sepia-[.12] contrast-[.96] md:min-h-[360px] ${className}`}
      />
    </>
  )
}
