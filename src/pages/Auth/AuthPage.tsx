import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'
import InputField from '../../components/ui/InputField'
import Button from '../../components/ui/Button'
import { LoginPayload,User } from '../../types/auth'
import { useNavigate } from 'react-router-dom'


export default function AuthPage() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [password, setPassword] = useState('')
  const [username, setName] = useState('')
  const { setUser } = useAuthStore()

  // TanStack Query's useMutation for login
  const { mutateAsync: loginMutate, error } = useMutation<User, Error, LoginPayload>({
    mutationFn: login
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const user: User = await loginMutate({ username, password })
      setUser(user)
      navigate('/')
    } catch (err) {
      console.error('Login Error:', err)  // Add detailed logging
      alert('Error during auth: ' + (err instanceof Error ? err.message : 'Unknown error'))
    }
  }
  

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
           
              <InputField
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setName(e.target.value)}
                name="username"
              />
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <Button type="submit">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>
          {error && <p className="text-red-500 text-center">{(error as Error).message}</p>}
          <p className="text-center text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-600 underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
