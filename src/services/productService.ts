import axios from 'axios'
import { Product } from '@/types/product'

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://fakestoreapi.com/products')
  return response.data
}

export interface CartItem {
  productId: number
  quantity: number
}

export interface Cart {
  id: number
  userId: number
  date: string
  products: CartItem[]
}

export const getAllCarts = async (): Promise<Cart[]> => {
  const response = await axios.get('https://fakestoreapi.com/carts')
  return response.data
}
