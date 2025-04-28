import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Table from '../../components/ui/Table'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../../types/product'

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems)
  const { removeFromCart, updateQuantity } = useCartStore()
  const navigate = useNavigate()

  // Fetch products individually based on cart productIds
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['cart-products', cartItems.map(item => item.productId)],
    queryFn: async () => {
      const productFetches = cartItems.map((item) =>
        fetch(`https://fakestoreapi.com/products/${item.productId}`).then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch product')
          }
          return res.json()
        })
      )
      return Promise.all(productFetches) as Promise<Product[]>
    },
    enabled: cartItems.length > 0, // Only run if cart is not empty
  })

  const handleQtyChange = (productId: number, change: number) => {
    const product = cartItems.find(item => item.productId === productId)
    if (product) {
      const newQuantity = Math.max(1, product.quantity + change)
      updateQuantity(productId, newQuantity)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId)
      if (product) {
        return acc + (product.price ?? 0) * item.quantity
      }
      return acc
    }, 0)
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 pt-2">
          <p>Loading cart...</p>
        </div>
        <Footer />
      </>
    )
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

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-8">
            <div className="border rounded-lg shadow bg-white overflow-x-auto">
             

              {/* Cart Items Table */}
              <Table
                cartItems={cartItems}
                products={products}
                onQtyChange={handleQtyChange}
                onRemove={removeFromCart}
              />

              <div className="p-4 text-right font-bold text-lg border-t">
                Total: ${calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
