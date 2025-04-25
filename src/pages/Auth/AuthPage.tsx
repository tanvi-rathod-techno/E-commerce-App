import { useState } from 'react'
import { login, signup } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'
import InputField from '../../components/ui/InputField'
import Button from '../../components/ui/Button'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { setUser } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const user = isLogin
        ? await login({ email, password })
        : await signup({ name, email, password })
      setUser(user)
      alert(`${isLogin ? 'Logged in' : 'Signed up'} as ${user.name}`)
    } catch (err) {
      alert('Error during auth')
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
            {!isLogin && (
              <InputField
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
              />
            )}
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
          </form>
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
