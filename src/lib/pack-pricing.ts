/** Фасовки на витрине: множитель к базовой цене из CMS (цена за 150 г). */
export const PACK_GRAMS = [150, 500] as const

export type PackGrams = (typeof PACK_GRAMS)[number]

export function packMultiplier(grams: PackGrams): number {
  return grams >= 500 ? 500 / 150 : 1
}

export function formatPackGrindValue(baseGrind: string, grams: PackGrams): string {
  return `${baseGrind}___${grams}`
}

export function parsePackFromGrindValue(raw: string): { base: string; grams: PackGrams } {
  const i = raw.lastIndexOf('___')
  if (i < 0) {
    return { base: raw, grams: 150 }
  }
  const base = raw.slice(0, i)
  const g = raw.slice(i + 3)
  return { base, grams: g === '500' ? 500 : 150 }
}
