'use client'

import { motion } from 'framer-motion'

type Row = { id?: string | null; value: string; label: string }

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
        >
          <p className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">{s.value}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{s.label}</p>
        </motion.div>
      ))}
    </>
  )
}
