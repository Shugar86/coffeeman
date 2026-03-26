'use client'

import { motion } from 'framer-motion'

type Props = {
  /** CSS color для заливки края */
  fill?: string
  className?: string
}

/**
 * Горизонтальный разделитель с волнообразным краем.
 */
export function TornPaperDivider({ fill = 'var(--cm-cream)', className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className={`relative -mb-px h-8 w-full md:h-10 ${className}`}
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={fill}
          d="M0 48V12c40-4 80 8 120 6s80-14 120-10 80 18 120 14 80-22 120-18 80 20 120 16 80-16 120-12 80 14 120 10 80-18 120-14 80 22 120 18 80-12 120-8V48H0z"
        />
      </svg>
    </motion.div>
  )
}
