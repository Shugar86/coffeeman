'use client'

import { useCallback, useEffect, useState } from 'react'

type Props = {
  min: number
  max: number
  step?: number
  valueMin: number
  valueMax: number
  onChange: (min: number, max: number) => void
  label?: string
  className?: string
}

/**
 * Двойной ползунок диапазона цены для каталога.
 */
export function RangeSlider({
  min,
  max,
  step = 50,
  valueMin,
  valueMax,
  onChange,
  label = 'Стоимость',
  className = '',
}: Props) {
  const [localMin, setLocalMin] = useState(valueMin)
  const [localMax, setLocalMax] = useState(valueMax)

  useEffect(() => {
    setLocalMin(valueMin)
    setLocalMax(valueMax)
  }, [valueMin, valueMax])

  const clamp = useCallback(
    (v: number) => Math.min(max, Math.max(min, v)),
    [min, max],
  )

  const onMinInput = (v: number) => {
    const next = clamp(v)
    const hi = Math.max(next, localMax)
    setLocalMin(next)
    setLocalMax(hi)
    onChange(next, hi)
  }

  const onMaxInput = (v: number) => {
    const next = clamp(v)
    const lo = Math.min(next, localMin)
    setLocalMax(next)
    setLocalMin(lo)
    onChange(lo, next)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--cm-ink-muted)]">
        <span>{label}</span>
        <span className="tabular-nums text-[var(--cm-ink)]">
          {localMin} — {localMax} ₽
        </span>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMin}
          onChange={(e) => onMinInput(Number(e.target.value))}
          className="h-2 w-full flex-1 cursor-pointer accent-[var(--cm-maroon)]"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localMax}
          onChange={(e) => onMaxInput(Number(e.target.value))}
          className="h-2 w-full flex-1 cursor-pointer accent-[var(--cm-maroon)]"
        />
      </div>
    </div>
  )
}
