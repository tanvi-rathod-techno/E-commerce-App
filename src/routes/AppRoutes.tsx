import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import CartPage from '../pages/Cart/CartPage'
import CartCheckout from '../pages/Cart/CartCheckout'
import WishlistPage from '../pages/Wishlist/WishlistPage'
import ProfilePage from '../pages/Profile/ProfilePage'
import ProtectedRoute from '../components/ProtectedRoute'  // Import the ProtectedRoute component
import { useAuthStore } from '../store/authStore'

export default function AppRoutes() {
  const { user } = useAuthStore()  // Get user state from the store

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/cart"
        element={<ProtectedRoute element={<CartPage />} />}
      />
      <Route
        path="/wishlist"
        element={<ProtectedRoute element={<WishlistPage />} />}
      />
       <Route
        path="/checkout"
        element={<ProtectedRoute element={<CartCheckout />} />}
      />
      <Route
        path="/profile"
        element={user ? <Navigate to="/" replace /> : <ProfilePage />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
