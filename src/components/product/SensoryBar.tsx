type Props = {
  label: string
  value: number | null | undefined
  /** Компактные полоски для карточки каталога */
  compact?: boolean
}

export function SensoryBar({ label, value, compact = false }: Props) {
  const v = value != null && value >= 1 && value <= 5 ? value : 0
  const barH = compact ? 'h-1' : 'h-2'
  const textSm = compact ? 'text-[10px]' : 'text-sm'

  return (
    <div className={compact ? 'space-y-0.5' : 'space-y-1'}>
      <div className={`flex justify-between ${textSm}`}>
        <span className="text-[var(--cm-ink-muted)]">{label}</span>
        <span className="font-medium text-[var(--cm-ink)]">{v > 0 ? `${v}/5` : '—'}</span>
      </div>
      <div className="flex gap-0.5 sm:gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`${barH} flex-1 rounded-full ${
              v >= n ? 'bg-[var(--cm-maroon)]' : 'bg-[var(--cm-line)]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
