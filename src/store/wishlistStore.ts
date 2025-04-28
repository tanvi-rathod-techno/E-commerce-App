// src/store/wishlistStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../types/product'

interface WishlistState {
  wishlist: Product[]
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: number) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (product) => {
        const { wishlist } = get()
        const exists = wishlist.some(item => item.id === product.id)
        if (exists) {
          set({ wishlist: wishlist.filter(item => item.id !== product.id) })
        } else {
          set({ wishlist: [...wishlist, product] })
        }
      },
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item.id === productId)
      }
    }),
    {
      name: 'wishlist-storage', // Name for localStorage key
      getStorage: () => localStorage, // Set storage to localStorage
    }
  )
)
