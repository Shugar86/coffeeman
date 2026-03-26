/**
 * Флаг по ISO-коду страны (2 буквы), для подписи «страна» на карточке.
 */
export function flagEmojiFromCode(code: string | null | undefined): string {
  if (!code || code.length < 2) return ''
  const u = code.slice(0, 2).toUpperCase()
  if (!/^[A-Z]{2}$/.test(u)) return ''
  const A = 0x1f1e6
  return String.fromCodePoint(A + u.charCodeAt(0) - 65, A + u.charCodeAt(1) - 65)
}
