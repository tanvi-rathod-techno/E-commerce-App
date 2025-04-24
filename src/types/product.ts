// src/types/product.ts
export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
  }
  export interface User {
    id: number
    name: string
    email: string
  }
  
  export interface LoginPayload {
    email: string
    password: string
  }
  
  export interface SignupPayload {
    name: string
    email: string
    password: string
  }
  