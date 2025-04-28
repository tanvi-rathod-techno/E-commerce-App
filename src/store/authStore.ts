// src/store/authStore.ts
import { create } from 'zustand'
import { User } from '@/types/auth'

type AuthState = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

const storedUser = localStorage.getItem('user')
const initialUser = storedUser ? JSON.parse(storedUser) : null

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user)) // Save to localStorage
    set({ user })
  },
  logout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  }
}))
