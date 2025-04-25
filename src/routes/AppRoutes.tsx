import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import CartPage from '../pages/Cart/CartPage'
import WishlistPage from '../pages/Wishlist/WishlistPage'
import ProfilePage from '../pages/Profile/ProfilePage'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}
