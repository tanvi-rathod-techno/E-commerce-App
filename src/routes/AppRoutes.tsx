import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import CartPage from '../pages/Cart/CartPage'
import WishlistPage from '../pages/Wishlist/WishlistPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import { useAuthStore } from '../store/authStore'

export default function AppRoutes() {
  const { user } = useAuthStore()  // Get user state from the store

  return (
    <Routes>
      {/* Redirect to Home if user is logged in */}
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route
        path="/profile"
        element={user ? <Navigate to="/" replace /> : <ProfilePage />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
