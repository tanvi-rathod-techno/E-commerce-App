import { useEffect, useState } from 'react'
import { getAllProducts } from '../services/productService'
import { Product } from '../types/product'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'

function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    getAllProducts().then(setProducts)
  }, [])

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product)
    // TODO: integrate Zustand cart store
  }

  return (
    <div className="p-4 relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  )
}

export default ProductList
