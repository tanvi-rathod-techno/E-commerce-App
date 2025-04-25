import { User, LoginPayload } from '@/types/auth'

export const login = async (data: LoginPayload): Promise<User> => {
  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,  // Using username from the payload
        password: data.password,  // Using password from the payload
      }),
    })

    // Log request payload for debugging
    console.log('Request payload:', {
      username: data.username,
      password: data.password,
    })

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Login response:', result)  // Log the response

    return {
      id: 1,
      username: data.username,
      email: `${data.username}@example.com`,
      token: result.token,  // The actual token returned by the API
    }
  } catch (err) {
    console.error('Error during login:', err)
    throw err  // Re-throw error to be handled in the component
  }
}
