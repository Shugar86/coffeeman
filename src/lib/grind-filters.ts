/**
 * Значения горизонтального скролла «помол» в каталоге → value в `grindOptions` товара.
 * Фильтрация на сервере: товар подходит, если любой `grindOptions.value` совпадает.
 */
export const GRIND_FILTER_OPTIONS: { param: string; label: string; values: string[] }[] = [
  { param: 'aeropress', label: 'Аэроэкспресс', values: ['aeropress', 'aero', 'аэропресс'] },
  { param: 'sets', label: 'Наборы', values: ['set', 'набор'] },
  { param: 'chemex', label: 'Кемекс', values: ['chemex', 'кемекс'] },
  { param: 'turk', label: 'Турка', values: ['turk', 'turkish', 'турка'] },
  { param: 'cup', label: 'Чашка', values: ['cup', 'чашка', 'filter'] },
  { param: 'espresso', label: 'Эспрессо', values: ['espresso', 'эспрессо'] },
]

export function grindParamMatchesProduct(
  param: string | undefined,
  grindOptions: { value?: string | null }[] | null | undefined,
): boolean {
  if (!param || !grindOptions?.length) return !param
  const cfg = GRIND_FILTER_OPTIONS.find((g) => g.param === param)
  if (!cfg) return true
  const vals = grindOptions.map((g) => (g.value || '').toLowerCase())
  return cfg.values.some((needle) => vals.some((v) => v.includes(needle)))
}
