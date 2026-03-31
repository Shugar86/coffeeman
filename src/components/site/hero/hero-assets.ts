/**
 * Пути к локальным ассетам hero (public + design handoff).
 * Marsala_Line: пунктирная «тропа» в макете — в репо как PNG с прозрачностью, не векторный SVG.
 */
export const HERO_ASSETS = {
  fallbackPhoto: '/images/hero-fallback.png',
  marsalaPathPng: '/images/hero/marsala-dashed-path.png',
  ctaPng: '/images/hero/cta-start-journey.png',
  /** Screen-3-back-1 из CoffeeMan __ CLIENT (2): бордовая рваная полоса; может иметь неидеальные края — см. комментарий в HeroPhotoStrip. */
  tornMaroonOverlay: '/images/hero/torn-maroon-overlay.png',
  stamp: '/images/hero/screen2-stamp.png',
  scrollChevronSvg: '/images/arrow-down.svg',
} as const

/** d-путь совпадает с public/images/torn-edge.svg — единый источник геометрии, заливка олива. */
export const TORN_EDGE_SVG_PATH =
  'M0 48V12c40-4 80 8 120 6s80-14 120-10 80 18 120 14 80-22 120-18 80 20 120 16 80-16 120-12 80 14 120 10 80-18 120-14 80 22 120 18 80-12 120-8V48H0z'
