// src/services/productService.ts
import axios from 'axios'

import { Product } from '@/types/product'

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://fakestoreapi.com/products')
  return response.data
}
