import React, { useState } from 'react'
import { Product } from '../../types/product'
import { Trash } from 'lucide-react'
import axios from 'axios'

interface TableProps {
  cartItems: { productId: number; quantity: number }[]
  products: Product[]
  onQtyChange: (productId: number, change: number) => void
  onRemove: (productId: number) => void
}

export default function Table({
  cartItems,
  products,
  onQtyChange,
  onRemove,
}: TableProps) {
  const [loading, setLoading] = useState(false)

  const handleRemove = async (productId: number) => {
    try {
      setLoading(true)
      // Assuming the user has a cart id, replace with actual cart ID
      const cartId = 1 // Placeholder cart ID, replace with actual cart ID from your state or context
      await axios.delete(`https://fakestoreapi.com/carts/${cartId}`, {
        data: {
          productId,
        },
      })

      // After the API call is successful, update the local state
      onRemove(productId)
    } catch (error) {
      console.error('Error removing product from cart:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-center text-sm sm:text-base">Product</th>
            <th className="py-2 text-center text-sm sm:text-base">Title</th>
            <th className="py-2 text-center text-sm sm:text-base">Price</th>
            <th className="py-2 text-center text-sm sm:text-base">Quantity</th>
            <th className="py-2 text-center text-sm sm:text-base">Total</th>
            <th className="py-2 text-center text-sm sm:text-base">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            const product = products.find((p) => p.id === item.productId)
            if (!product) return null

            return (
              <tr key={item.productId} className="border-b">
                {/* Product Image */}
                <td className="py-2 px-2 text-center">
                  <img
                    src={product.image}
                    alt={`Image of ${product.title}`}
                    className="w-16 h-16 object-contain mx-auto"
                  />
                </td>

                {/* Product Title */}
                <td className="py-2 text-center">
                  <span>{product.title}</span>
                </td>

                {/* Product Price */}
                <td className="py-2 text-center">${product.price.toFixed(2)}</td>

                {/* Quantity Control */}
                <td className="py-2 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => onQtyChange(item.productId, -1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onQtyChange(item.productId, 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Total Price */}
                <td className="py-2 text-center">
                  ${(product.price * item.quantity).toFixed(2)}
                </td>

                {/* Remove Button */}
                <td className="py-2 text-center">
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="text-red-600 hover:text-red-800"
                    disabled={loading} // Disable button while loading
                  >
                    <Trash className="w-4 h-4" /> {/* Trash icon */}
                    {loading && <span>Removing...</span>} {/* Show loading indicator */}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
