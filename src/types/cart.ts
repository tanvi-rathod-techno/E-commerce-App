// types/cart.ts

export type CartProduct = {
    productId: number
    quantity: number
  }
  
  export type Cart = {
    id: number
    userId: number
    date: string
    products: CartProduct[]
  }
  