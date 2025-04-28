import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Heart, ShoppingCart, User } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'

export default function Header() {
  const cartItems = useCartStore((state) => state.cartItems)
  const wishlistCount = useWishlistStore((state) => state.wishlist.length)
  const { user, logout } = useAuthStore()
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    logout()
    setShowMenu(false)
    navigate('/profile')
  }

  const handleProfileClick = () => {
    if (user) {
      setShowMenu(!showMenu) 
    } else {
      navigate('/profile') 
    }
  }
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-pink-600">
          <ShoppingBag className="w-6 h-6" />
          <span>ShopSphere</span>
        </Link>

        <nav className="flex items-center gap-6 text-gray-700 relative">
          <Link to="/wishlist" className="relative hover:text-pink-600">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative hover:text-pink-600">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Icon and Dropdown */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-1 hover:text-pink-600"
            >
              <User className="w-6 h-6" />
              {user ? (
                <span className="text-sm">{user.username}</span>
              ) : (
                <span className="text-sm">Sign In</span> // Display "Sign In" if not logged in
              )}
            </button>

            {showMenu && user && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
