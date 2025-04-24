import { useEffect, useState } from 'react'
import { Heart, ShoppingCart, ArrowLeft ,Trash2 } from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom'

interface WishlistItem {
  productId: number
  title: string
  price: number
  image: string
}

interface CartItem {
  productId: number
  quantity: number
}

interface Cart {
  id: number
  userId: number
  date: string
  products: CartItem[]
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetching cart data (from fakestoreapi)
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get<Cart[]>('https://fakestoreapi.com/carts')
        // Assuming you want to show products from the first cart for simplicity
        const cart = response.data[0] // You can modify this to show all carts if needed
        const productIds = cart.products.map(item => item.productId)

        // Fetch the products based on productIds
        const productData = await axios.get(`https://fakestoreapi.com/products`)
        const wishlistItems = productData.data.filter((product: any) =>
          productIds.includes(product.id)
        )

        // Map products to WishlistItem format
        const wishlistItemsFormatted = wishlistItems.map((item: any) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
        }))

        setWishlist(wishlistItemsFormatted)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching cart data:', error)
        setLoading(false)
      }
    }

    fetchCarts()
  }, [])

  // Handle add to cart logic (example with console, should be updated for actual cart management)
  const handleAddToCart = (product: WishlistItem) => {
    console.log('Adding product to cart:', product)
    // TODO: Integrate cart logic with Zustand or any other state management
  }

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.productId !== productId)
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header with Back Button */}
      <header className="flex justify-between items-center mb-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-pink-600">
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
        <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-red-600" />
            Your Wishlist
        </h1>
        </div>


      </header>

      {loading ? (
        <p>Loading wishlist items...</p>
      ) : (
        <div className="space-y-6">
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty!</p>
          ) : (
            wishlist.map((item) => (
                <div
                key={item.productId}
                className="flex flex-col md:flex-row items-center gap-6 p-4 border rounded-xl shadow-sm bg-white transition hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-36 w-36 object-contain"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                  <h3 className="text-md text-gray-600">${item.price}</h3>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-4 py-2 bg-green-600 text-white rounded-full  items-center  text-sm hover:bg-green-700"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.productId)}
                      className="px-4 py-2 bg-red-600 text-white rounded-full flex items-center gap-2 text-sm hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                     
                    </button>
                  </div>
                </div>
              </div>
              
            ))
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-6 text-center text-sm text-gray-600">
        <p>&copy; 2025 ShopSphere. All rights reserved.</p>
      </footer>
    </div>
  )
}
