type Props = {
  label: string
  value: number | null | undefined
}

export function SensoryBar({ label, value }: Props) {
  const v = value != null && value >= 1 && value <= 5 ? value : 0
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-neutral-600 dark:text-neutral-400">{label}</span>
        <span className="font-medium">{v > 0 ? `${v}/5` : '—'}</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`h-2 flex-1 rounded-full ${
              v >= n ? 'bg-amber-600' : 'bg-neutral-200 dark:bg-neutral-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
