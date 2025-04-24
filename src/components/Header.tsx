// src/components/Header.tsx
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          🛒 MyStore
        </Link>
        <nav className="space-x-4 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600">Cart</Link>
          <Link to="/wishlist" className="text-gray-700 hover:text-blue-600">Wishlist</Link>
        </nav>
      </div>
    </header>
  )
}
