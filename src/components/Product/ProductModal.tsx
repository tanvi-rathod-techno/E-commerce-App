import { Product } from '../../types/product'
import Label from '../ui/Label'
import Button from '../ui/Button'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { addProductToCart } from '../../services/cartService';
import { useCartStore } from '../../store/cartStore';

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const handleAddToCart = async () => {
    if (!user) {
      // If the user is not logged in, redirect to the login page
      navigate('/profile');
    } else {
      try {
        console.log(product)
        // Call the cart service to add the product to the cart
        await addProductToCart(product, user.id);
        addToCart(product);
        // Redirect to the cart page after adding the product
        navigate('/cart');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg relative shadow-lg overflow-y-auto max-h-[80vh]">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <span className="text-2xl">✕</span>
        </button>

        {/* Product Image */}
        <img src={product.image} alt={product.title} className="h-64 mx-auto object-cover" />
        
        {/* Product Title */}
        <h2 className="text-2xl font-bold mt-4 text-center text-gray-800">{product.title}</h2>

        {/* Scrollable Product Info Section */}
        <div className="mt-2">
          {/* Product Description */}
          <p className="text-gray-600 text-center">{product.description}</p>

          {/* Category Label */}
          <div className="mt-4">
            <Label text={`Category: ${product.category}`} className="text-center" />
          </div>

          {/* Price Label */}
          <div className="mt-2">
            <Label text={`Price: $${product.price}`} className="text-lg font-bold text-center" />
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-pink-600 text-white hover:bg-pink-700"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
