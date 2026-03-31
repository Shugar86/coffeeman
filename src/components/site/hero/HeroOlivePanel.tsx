'use client'

import { HERO_ASSETS } from '@/components/site/hero/hero-assets'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  headline: string
  subtitle?: string
  showAdminHint: boolean
}

/**
 * Оливковый блок: шум из SVG data-URL (лёгкая текстура), PNG Marsala_Line как «тропа»,
 * PNG штамп из макета, типографика и CTA-изображение.
 */
export function HeroOlivePanel({ headline, subtitle, showAdminHint }: Props) {
  return (
    <div className="relative overflow-hidden bg-[var(--cm-olive)] pb-10 pt-1 md:pb-14 md:pt-2">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Пунктирная кривая — только PNG из макета (векторного SVG пути в репо нет). */}
      <Image
        src={HERO_ASSETS.marsalaPathPng}
        alt=""
        width={640}
        height={280}
        className="pointer-events-none absolute bottom-0 left-1/2 z-[1] h-auto max-h-[min(38vh,320px)] w-[min(120%,900px)] -translate-x-1/2 object-contain object-bottom opacity-[0.55]"
        sizes="900px"
      />

      <div className="pointer-events-none absolute bottom-6 left-3 z-[2] flex flex-col items-center gap-2 md:bottom-10 md:left-6">
        <Image
          src={HERO_ASSETS.stamp}
          alt=""
          width={88}
          height={88}
          className="h-16 w-16 opacity-80 drop-shadow-md md:h-[5.5rem] md:w-[5.5rem]"
          sizes="88px"
        />
        <CompassMark />
        <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/70">journey</span>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-4 text-center md:pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/90 md:text-xs">COFFEEMAN</p>
        <h1 className="mt-3 font-display text-2xl font-bold uppercase leading-[1.12] tracking-wide text-white drop-shadow-sm md:text-4xl lg:text-[2.65rem]">
          {headline}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">{subtitle}</p>
        ) : null}
        {showAdminHint ? (
          <p className="mx-auto mt-4 max-w-md text-xs text-white/65 md:text-sm">
            Добавьте слайды в админке (Настройки сайта), чтобы заменить фото в верхней части.
          </p>
        ) : null}
      </div>

      <div className="relative z-10 mt-8 flex flex-col items-center gap-4 md:mt-10">
        <Link href="#story" className="transition hover:opacity-92 active:opacity-85">
          <Image
            src={HERO_ASSETS.ctaPng}
            alt="Начать путешествие"
            width={300}
            height={72}
            className="h-auto w-[min(88vw,300px)] drop-shadow-lg"
            sizes="300px"
          />
        </Link>
        <a
          href="#story"
          className="flex flex-col items-center gap-1 text-white/70 transition hover:text-white"
          aria-label="Прокрутить к истории"
        >
          <Image src={HERO_ASSETS.scrollChevronSvg} alt="" width={22} height={14} className="animate-bounce opacity-90" />
        </a>
      </div>
    </div>
  )
}

function CompassMark() {
  const stroke = 'rgba(255,255,255,0.92)'
  return (
    <svg width="52" height="52" viewBox="0 0 64 64" fill="none" className="text-white drop-shadow-md" aria-hidden>
      <circle cx="32" cy="32" r="28" stroke={stroke} strokeWidth="1.2" opacity="0.85" />
      <circle cx="32" cy="32" r="20" stroke={stroke} strokeWidth="0.9" opacity="0.5" />
      <path d="M32 10v6M32 48v6M10 32h6M48 32h6" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
      <path
        d="M32 22l3 12 12 2-8 8 2 12-9-5-9 5 2-12-8-8 12-2 3-12z"
        fill="rgba(255,255,255,0.2)"
        stroke={stroke}
        strokeWidth="1"
      />
    </svg>
  )
}
