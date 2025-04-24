import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import CartPage from '../pages/CartPage'
import WishlistPage from '../pages/WishlistPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  )
}
