type Props = {
  /** Плотность тела 1–5 */
  density: number | null | undefined
  /** Кислотность 1–5 */
  acidity: number | null | undefined
  /** Горечь 1–5 */
  bitterness: number | null | undefined
}

function clampProfile(v: number | null | undefined): number {
  if (v == null || Number.isNaN(v)) return 0
  return Math.min(5, Math.max(0, v))
}

/**
 * Компактная «радарная» визуализация трёх осей сенсорики (равносторонний треугольник).
 */
export function SensoryRadar({ density, acidity, bitterness }: Props) {
  const d = clampProfile(density)
  const a = clampProfile(acidity)
  const b = clampProfile(bitterness)
  const hasAny = d > 0 || a > 0 || b > 0

  const cx = 100
  const cy = 100
  const r = 72
  const deg = (t: number) => (t * Math.PI) / 180
  const point = (value: number, angleDeg: number) => {
    const t = deg(angleDeg - 90)
    const rr = (value / 5) * r
    return { x: cx + rr * Math.cos(t), y: cy + rr * Math.sin(t) }
  }
  const pD = point(d, -90)
  const pA = point(a, 150)
  const pB = point(b, 30)
  const path = hasAny ? `M ${pD.x} ${pD.y} L ${pA.x} ${pA.y} L ${pB.x} ${pB.y} Z` : ''

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 200 200" className="h-44 w-44 text-[var(--cm-maroon)]" aria-hidden>
        {[1, 2, 3, 4, 5].map((step) => {
          const t1 = point(5, -90)
          const t2 = point(5, 150)
          const t3 = point(5, 30)
          const scale = step / 5
          return (
            <polygon
              key={step}
              fill="none"
              stroke="currentColor"
              strokeOpacity={0.12 + step * 0.06}
              strokeWidth={1}
              points={`${cx + (t1.x - cx) * scale},${cy + (t1.y - cy) * scale} ${cx + (t2.x - cx) * scale},${cy + (t2.y - cy) * scale} ${cx + (t3.x - cx) * scale},${cy + (t3.y - cy) * scale}`}
            />
          )
        })}
        <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1} />
        <line x1={cx} y1={cy} x2={point(5, 150).x} y2={point(5, 150).y} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1} />
        <line x1={cx} y1={cy} x2={point(5, 30).x} y2={point(5, 30).y} stroke="currentColor" strokeOpacity={0.25} strokeWidth={1} />
        {hasAny ? (
          <path d={path} fill="currentColor" fillOpacity={0.22} stroke="currentColor" strokeWidth={1.5} />
        ) : null}
      </svg>
      <div className="grid w-full max-w-[200px] grid-cols-3 gap-1 text-center text-[11px] text-[var(--cm-ink-muted)]">
        <span>Плотность</span>
        <span>Кислотность</span>
        <span>Горечь</span>
      </div>
    </div>
  )
}
