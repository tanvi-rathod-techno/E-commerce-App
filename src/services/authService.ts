import { User, LoginPayload } from '@/types/auth'

export const login = async (data: LoginPayload): Promise<User> => {
  const response = await fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Login failed with status: ${response.status}`)
  }

  const result = await response.json()

  return {
    id: 1,
    username: data.username,
    email: `${data.username}@example.com`,
    token: result.token,
  }
}
