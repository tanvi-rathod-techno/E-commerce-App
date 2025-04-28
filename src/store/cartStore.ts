import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  setCartItems: (cartItems: CartItem[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find((item) => item.productId === product.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        } else {
          return {
            cartItems: [...state.cartItems, { productId: product.id, quantity: 1 }],
          };
        }
      }),
      removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.productId !== productId),
      })),
      clearCart: () => set({ cartItems: [] }),
      updateQuantity: (productId, quantity) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        ),
      })),
      setCartItems: (cartItems) => set({ cartItems }),
    }),
    {
      name: 'cart-storage', // localStorage key name
    }
  )
);
