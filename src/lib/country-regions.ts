/** Регион для табов каталога; slug страны → регион (дополнять по мере наполнения CMS). */
export type CountryRegion = 'asia' | 'africa' | 'south_america' | 'other'

const ASIA = new Set([
  'indonesia',
  'vietnam',
  'india',
  'china',
  'thailand',
  'yemen',
  'papua-new-guinea',
])

const AFRICA = new Set([
  'ethiopia',
  'kenya',
  'rwanda',
  'burundi',
  'tanzania',
  'uganda',
  'cameroon',
])

const SOUTH_AMERICA = new Set([
  'brazil',
  'colombia',
  'peru',
  'guatemala',
  'honduras',
  'nicaragua',
  'costa-rica',
  'panama',
])

/**
 * Возвращает регион по slug страны (латиница, как в Payload).
 */
export function countrySlugToRegion(slug: string): CountryRegion {
  const s = slug.toLowerCase()
  if (ASIA.has(s)) return 'asia'
  if (AFRICA.has(s)) return 'africa'
  if (SOUTH_AMERICA.has(s)) return 'south_america'
  return 'other'
}

export function regionLabel(region: string): string {
  switch (region) {
    case 'all':
      return 'Все'
    case 'asia':
      return 'Азия'
    case 'africa':
      return 'Африка'
    case 'south_america':
      return 'Южная Америка'
    default:
      return 'Все'
  }
}
