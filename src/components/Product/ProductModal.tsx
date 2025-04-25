// src/components/ProductModal.tsx
import { Product } from '../../types/product'
import Label from '../ui/Label'
import Button from '../ui/Button'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

interface ProductModalProps {
  product: Product
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!user) {
      // If the user is not logged in, redirect to the login page
      navigate('/profile')
    } else {
      // If the user is logged in, add the product to the cart
      onAddToCart(product)
      // Redirect to the cart page after adding the product
      navigate('/cart')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>
        
        {/* Product Image */}
        <img src={product.image} alt={product.title} className="h-48 mx-auto" />
        
        {/* Product Title */}
        <h2 className="text-xl font-bold mt-4">{product.title}</h2>
        
        {/* Product Description */}
        <p className="text-gray-600 mt-2">{product.description}</p>
        
        {/* Category Label */}
        <div className="mt-2">
          <Label text={`Category: ${product.category}`} />
        </div>

        {/* Price Label */}
        <div className="mt-2">
          <Label text={`Price: $${product.price}`} className="text-lg font-bold" />
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="mt-4 w-full"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
