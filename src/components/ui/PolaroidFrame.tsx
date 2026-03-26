import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Случайный наклон в градусах, стабильный по `seed` */
  rotateDeg?: number
  className?: string
}

/**
 * Обёртка «полароид» для фото по макету главной / о нас.
 */
export function PolaroidFrame({ children, rotateDeg = 0, className = '' }: Props) {
  return (
    <div
      className={`cm-polaroid inline-block max-w-full ${className}`}
      style={{ transform: `rotate(${rotateDeg}deg)` }}
    >
      <div className="cm-polaroid-inner relative aspect-[4/5] w-full min-w-[140px] max-w-[280px] sm:min-w-[180px]">
        {children}
      </div>
    </div>
  )
}
