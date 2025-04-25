// ui/table.tsx
import React from 'react'
import { Plus, Minus } from 'lucide-react'
import { Product } from '../../services/productService'

interface CartProduct {
  productId: number
  quantity: number
}

interface TableProps {
  cartId: number
  products: CartProduct[]
  allProducts: Product[]
  onQtyChange: (cartId: number, productId: number, change: number) => void
}

const Table: React.FC<TableProps> = ({ cartId, products, allProducts, onQtyChange }) => {
  const findProductDetails = (productId: number): Product | null => {
    return allProducts.find(p => p.id === productId) || null
  }

  return (
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
        {products.map(item => {
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
                  onClick={() => onQtyChange(cartId, item.productId, -1)}
                  className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onQtyChange(cartId, item.productId, 1)}
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
  )
}

export default Table
