import type { Where } from 'payload'

export type CatalogSegment = 'all' | 'coffee' | 'tea' | 'recommended' | 'popular' | 'new' | 'microlot'

const RECOMMENDED_MIN_POPULARITY = 10

/**
 * Разбор сегмента каталога из query: влияет на where и sort в `payload.find`.
 */
export function parseCatalogSegment(raw: string | undefined): CatalogSegment {
  const v = (raw || 'all').toLowerCase()
  if (
    v === 'coffee' ||
    v === 'tea' ||
    v === 'recommended' ||
    v === 'popular' ||
    v === 'new' ||
    v === 'microlot'
  ) {
    return v
  }
  return 'all'
}

export type SegmentQueryResult = {
  productType?: 'coffee' | 'tea'
  extraWhere: Where[]
  sort: string
}

/**
 * Сегмент «Рекомендован»: popularity >= порога (без отдельного поля в CMS).
 */
export function segmentToQuery(segment: CatalogSegment): SegmentQueryResult {
  const extraWhere: Where[] = []
  let sort = '-popularity'
  let productType: 'coffee' | 'tea' | undefined

  switch (segment) {
    case 'coffee':
      productType = 'coffee'
      break
    case 'tea':
      productType = 'tea'
      break
    case 'new':
      extraWhere.push({ isNew: { equals: true } })
      sort = '-createdAt'
      break
    case 'popular':
      sort = '-popularity'
      break
    case 'recommended':
      extraWhere.push({ popularity: { greater_than_equal: RECOMMENDED_MIN_POPULARITY } })
      sort = '-popularity'
      break
    case 'microlot':
      /* id категории microlot подставляется на странице каталога после загрузки categories */
      break
    default:
      break
  }

  return { productType, extraWhere, sort }
}
