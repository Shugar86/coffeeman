import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Секция с бордовым фоном (текстура через градиент + шум).
 */
export function SectionMaroonBand({ children, className = '' }: Props) {
  return (
    <section
      className={`relative overflow-hidden bg-[var(--cm-maroon-band)] ${className}`}
      style={{
        backgroundImage: `radial-gradient(ellipse 120% 80% at 50% 0%, var(--cm-maroon-deep) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgb(0 0 0 / 0.12), transparent 40%)`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </section>
  )
}
