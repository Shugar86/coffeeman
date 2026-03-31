import { TORN_EDGE_SVG_PATH } from '@/components/site/hero/hero-assets'

type Props = {
  /** CSS color для заливки «листа» под рваным краем (олива под фото). */
  fill: string
  className?: string
}

/**
 * Разделитель фото → олива. Геометрия из репозиторного ассета `public/images/torn-edge.svg`
 * (без border-radius — один path).
 */
export function HeroTornRibbon({ fill, className = '' }: Props) {
  return (
    <div className={`relative -mb-px block w-full leading-none ${className}`} aria-hidden>
      <svg className="h-8 w-full md:h-10" viewBox="0 0 1200 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={fill} d={TORN_EDGE_SVG_PATH} />
      </svg>
    </div>
  )
}
