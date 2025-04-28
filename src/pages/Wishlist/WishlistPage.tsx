import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useWishlistStore } from '../../store/wishlistStore' // Import your Zustand wishlist store
import { useCartStore } from '../../store/cartStore' // Import Zustand cart store
import { Product } from '../../types/product' // Import Product type

export default function WishlistPage() {
  const navigate = useNavigate()

  const { wishlist, toggleWishlist } = useWishlistStore() // Zustand wishlist store
  const { addToCart } = useCartStore() // Zustand cart store

  // Handle add to cart logic
  const handleAddToCart = (product: Product) => {
    console.log('Adding product to cart:', product)

    // Add product to cart store
    addToCart(product)

    // Remove product from wishlist after adding to cart
    toggleWishlist(product)

    // Optionally, navigate to the cart page
    navigate('/cart')
  }

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (product: Product) => {
    toggleWishlist(product) // toggleWishlist removes the product if it exists
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 pt-6 pb-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-pink-600" />
            <h1 className="text-2xl font-bold">Wishlist</h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-pink-600 hover:text-pink-800"
          >
            <ArrowLeft />
          </button>
        </div>

        {wishlist.length === 0 ? (
          <p className="text-center">Your wishlist is empty!</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
            <table className="w-full table-auto">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-center">Image</th>
                  <th className="py-3 px-4 text-center">Product</th>
                  <th className="py-3 px-4 text-center">Price</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 text-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 object-contain mx-auto"
                      />
                    </td>
                    <td className="py-4 px-4 text-center">{item.title}</td>
                    <td className="py-4 px-4 text-center">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="px-4 py-2 bg-green-600 text-white rounded-full text-sm hover:bg-green-700"
                        >
                          <ShoppingCart className="w-4 h-4 inline-block mr-2" />
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(item)}
                          className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4 inline-block mr-2" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
