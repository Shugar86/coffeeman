import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartLine = {
  /** Уникальный ключ строки (товар + помол) */
  key: string
  productId: number
  slug: string
  title: string
  unitPrice: number
  quantity: number
  grindLabel: string
  grindValue: string
}

type CartState = {
  items: CartLine[]
  addItem: (line: Omit<CartLine, 'key'> & { key?: string }) => void
  removeItem: (key: string) => void
  setQuantity: (key: string, quantity: number) => void
  clear: () => void
}

function makeKey(productId: number, grindValue: string) {
  return `${productId}::${grindValue || 'default'}`
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (line) => {
        const key = line.key ?? makeKey(line.productId, line.grindValue)
        const existing = get().items.find((i) => i.key === key)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + line.quantity } : i,
            ),
          })
        } else {
          set({ items: [...get().items, { ...line, key }] })
        }
      },
      removeItem: (key) => set({ items: get().items.filter((i) => i.key !== key) }),
      setQuantity: (key, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((i) => i.key !== key) })
          return
        }
        set({
          items: get().items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        })
      },
      clear: () => set({ items: [] }),
    }),
    { name: 'coffeeman-cart-v1' },
  ),
)
