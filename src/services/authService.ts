import { LoginPayload, SignupPayload, User } from '../types/product'

export const login = async (data: LoginPayload): Promise<User> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: 'Jane Doe', email: data.email }), 1000)
  )
}

export const signup = async (data: SignupPayload): Promise<User> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id: 2, name: data.name, email: data.email }), 1000)
  )
}
