export interface LoginPayload {
  username: string
  password: string
}

export interface User {
  id: number
  username: string
  email: string
  token: string
}
