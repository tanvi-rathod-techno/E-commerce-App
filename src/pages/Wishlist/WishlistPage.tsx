import { useEffect, useState } from 'react'
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from 'lucide-react'
import axios from 'axios'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'

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
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // Fetching cart data (from fakestoreapi)
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get<Cart[]>('https://fakestoreapi.com/carts')
        const cart = response.data[0] // Use the first cart for simplicity
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
        setError('Failed to load wishlist items')
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

        {loading ? (
          <p className="text-center">Loading wishlist items...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
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
                {wishlist.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6">Your wishlist is empty!</td>
                  </tr>
                ) : (
                  wishlist.map((item) => (
                    <tr key={item.productId} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-20 w-20 object-contain"
                        />
                      </td>
                      <td className="py-4 px-4">{item.title}</td>
                      <td className="py-4 px-4">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="px-4 py-2 bg-green-600 text-white  rounded-full text-sm hover:bg-green-700"
                          >
                            <ShoppingCart className="w-4 h-4 inline-block mr-2" />
                          
                          </button>
                          <button
                            onClick={() => handleRemoveFromWishlist(item.productId)}
                            className="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700"
                          >
                            <Trash2 className="w-4 h-4 inline-block mr-2" />
                          
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
