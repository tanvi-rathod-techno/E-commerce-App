import { useEffect, useState } from 'react'
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Cart, getAllCarts, getAllProducts } from '../services/productService'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CartPage() {
  const [carts, setCarts] = useState<Cart[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartData, productData] = await Promise.all([getAllCarts(), getAllProducts()])
        setCarts(cartData)
        setProducts(productData)
      } catch (error) {
        console.error('Error fetching cart or products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const findProductDetails = (productId: number) => products.find(p => p.id === productId)

  const handleQtyChange = (cartId: number, productId: number, change: number) => {
    setCarts(prev =>
      prev.map(cart => {
        if (cart.id === cartId) {
          return {
            ...cart,
            products: cart.products.map(item =>
              item.productId === productId
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
            )
          }
        }
        return cart
      })
    )
  }

  const calculateTotal = (cart: Cart) => {
    return cart.products.reduce((acc, item) => {
      const product = findProductDetails(item.productId)
      return acc + (product?.price ?? 0) * item.quantity
    }, 0)
  }

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-pink-600 hover:text-pink-800">
            <ArrowLeft />
          </button>
          <ShoppingCart className="w-6 h-6 text-pink-600" />
          <h1 className="text-2xl font-bold">Cart</h1>
        </div>

        {loading ? (
          <p>Loading cart data...</p>
        ) : (
          <div className="space-y-8">
            {carts.map(cart => (
              <div key={cart.id} className="border rounded-lg shadow bg-white overflow-x-auto">
                <div className="p-4 border-b flex justify-between">
                  <h2 className="font-semibold text-lg">
                    User #{cart.userId} - Cart #{cart.id}
                  </h2>
                  <span className="text-sm text-gray-500">
                    Date: {new Date(cart.date).toLocaleDateString()}
                  </span>
                </div>

                <table className="min-w-full table-auto">
                  <thead className="bg-gray-100 text-left text-sm">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Quantity</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products.map(item => {
                      const product = findProductDetails(item.productId)
                      if (!product) return null
                      const subtotal = product.price * item.quantity
                      return (
                        <tr key={item.productId} className="border-t">
                          <td className="p-3">
                            <img src={product.image} alt={product.title} className="h-16" />
                          </td>
                          <td className="p-3">{product.title}</td>
                          <td className="p-3 flex items-center gap-2">
                            <button
                              onClick={() => handleQtyChange(cart.id, item.productId, -1)}
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <Minus size={16} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => handleQtyChange(cart.id, item.productId, 1)}
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <Plus size={16} />
                            </button>
                          </td>
                          <td className="p-3">${product.price.toFixed(2)}</td>
                          <td className="p-3 font-medium">${subtotal.toFixed(2)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>

                <div className="p-4 text-right font-bold text-lg border-t">
                  Total: ${calculateTotal(cart).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
