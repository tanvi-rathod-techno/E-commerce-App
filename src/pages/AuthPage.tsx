import { useState } from 'react'
import { login, signup } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import Footer from '../components/Footer'

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
      {/* Auth Form */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
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

      {/* Footer */}
     
    </div>
  )
}
