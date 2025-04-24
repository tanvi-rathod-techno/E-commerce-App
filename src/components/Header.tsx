// src/components/Header.tsx
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-pink-600">
          <ShoppingBag className="w-6 h-6" />
          <span>ShopSphere</span>
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-4 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-pink-600">Home</Link>
          <Link to="/cart" className="text-gray-700 hover:text-pink-600">Cart</Link>
          <Link to="/wishlist" className="text-gray-700 hover:text-pink-600">Wishlist</Link>
        </nav>
      </div>
    </header>
  )
}
