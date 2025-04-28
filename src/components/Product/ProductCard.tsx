import { Product } from '../../types/product'
import { Eye, Heart } from 'lucide-react'
import { useWishlistStore } from '../../store/wishlistStore'
import { toast } from 'react-toastify' // Import toastify
import 'react-toastify/dist/ReactToastify.css' // Import styles

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const isWishlisted = isInWishlist(product.id)

  // Function to show toast notification
  const handleWishlistToggle = (product: Product) => {
    toggleWishlist(product)
    if (isInWishlist(product.id)) {
      toast.success(`${product.title} added to wishlist!`) // Show success toast
    } else {
      toast.error(`${product.title} removed from wishlist!`) // Show error toast
    }
  }

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer border p-4 rounded shadow hover:shadow-lg transition"
    >
      {/* Hidden overlay that appears on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
        <span className="text-xl font-bold">
          <Eye className="w-5 h-5" />
        </span>
      </div>

      {/* Wishlist Heart Icon */}
      <button
        onClick={(e) => {
          e.stopPropagation() 
          handleWishlistToggle(product) // Toggle wishlist and show toast
        }}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-pink-100 transition"
      >
        {isWishlisted ? (
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
        ) : (
          <Heart className="w-5 h-5 text-pink-500" />
        )}
      </button>

      {/* Product Image */}
      <img src={product.image} alt={product.title} className="h-40 mx-auto" />
      
      {/* Product Title and Price */}
      <h3 className="text-sm font-semibold mt-2">{product.title}</h3>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
  )
}
