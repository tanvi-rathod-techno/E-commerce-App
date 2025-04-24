import { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer border p-4 rounded shadow hover:shadow-lg transition"
    >
      {/* Hidden overlay that appears on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
        <span className="text-xl font-bold">View</span>
      </div>

      {/* Product Image */}
      <img src={product.image} alt={product.title} className="h-40 mx-auto" />
      
      {/* Product Title and Price */}
      <h3 className="text-sm font-semibold mt-2">{product.title}</h3>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
  )
}
