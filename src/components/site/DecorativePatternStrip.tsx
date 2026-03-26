type Props = {
  className?: string
}

/**
 * Декоративная полоса между секциями (паттерн без внешнего файла).
 */
export function DecorativePatternStrip({ className = '' }: Props) {
  return (
    <div
      className={`relative h-14 w-full overflow-hidden bg-[var(--cm-cream)] cm-botanical-bg opacity-90 md:h-16 ${className}`}
      aria-hidden
    />
  )
}
