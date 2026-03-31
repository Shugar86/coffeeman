'use client'

import { motion } from 'framer-motion'

type Row = { id?: string | null; value: string; label: string }

function StatIcon({ index }: { index: number }) {
  const k = index % 4
  const cls = 'h-8 w-8 shrink-0 text-white/90'
  if (k === 0) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M5 11h14v8H5v-8z" strokeLinejoin="round" />
        <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
      </svg>
    )
  }
  if (k === 1) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M4 10c2-4 6-6 8-6s6 2 8 6c-2 4-6 6-8 6s-6-2-8-6z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (k === 2) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <ellipse cx="12" cy="14" rx="7" ry="4" />
        <path d="M12 10v-6M9 6l3-2 3 2" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" strokeLinejoin="round" />
      <path d="M12 11v4M10 13h4" strokeLinecap="round" />
    </svg>
  )
}

export function HomeStatsRow({ stats }: { stats: Row[] }) {
  return (
    <>
      {stats.map((s, i) => (
        <motion.div
          key={s.id ?? i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="flex flex-col items-center gap-3 text-center md:flex-row md:text-left"
        >
          <StatIcon index={i} />
          <div>
            <p className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{s.label}</p>
          </div>
        </motion.div>
      ))}
    </>
  )
}
