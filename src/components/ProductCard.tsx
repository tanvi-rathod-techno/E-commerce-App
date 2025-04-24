import { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border p-4 rounded shadow hover:shadow-lg transition"
    >
      <img src={product.image} alt={product.title} className="h-40 mx-auto" />
      <h3 className="text-sm font-semibold mt-2">{product.title}</h3>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
  )
}
