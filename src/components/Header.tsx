// src/components/Header.tsx
import { Link } from 'react-router-dom'
import { ShoppingBag, Heart, ShoppingCart } from 'lucide-react'

export default function Header() {
  // Example count values — replace with actual Zustand/cart/wishlist logic
  const cartCount = 3
  const wishlistCount = 2

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-pink-600">
          <ShoppingBag className="w-6 h-6" />
          <span>ShopSphere</span>
        </Link>

        {/* Navigation Icons with Count */}
        <nav className="flex items-center gap-6 text-gray-700">
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
        </nav>
      </div>
    </header>
  )
}
