// CartPage.tsx
import { useEffect, useState } from 'react'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Cart, getAllCarts, getAllProducts, Product } from '../../services/productService'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Table from '../../components/ui/Table'

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
      const product = products.find(p => p.id === item.productId)
      if (!product) return acc
      return acc + (product.price ?? 0) * item.quantity
    }, 0)
  }

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 pt-2">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-pink-600" />
            <h1 className="text-2xl font-bold">Cart</h1>
          </div>
          <button onClick={() => navigate(-1)} className="text-pink-600 hover:text-pink-800">
            <ArrowLeft />
          </button>
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

                <Table
                  cartId={cart.id}
                  products={cart.products}
                  allProducts={products}
                  onQtyChange={handleQtyChange}
                />

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
