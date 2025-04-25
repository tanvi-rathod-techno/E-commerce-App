import { useEffect, useState } from 'react'
import { getAllProducts } from '../../services/productService'
import { Product } from '../../types/product'
import ProductCard from '../../components/Product/ProductCard'
import ProductModal from '../../components/Product/ProductModal'
import Pagination from '../../components/ui/Pagination'

function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const PRODUCTS_PER_PAGE = 8
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)

  useEffect(() => {
    getAllProducts().then(setProducts)
  }, [])

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product)
    // TODO: integrate Zustand cart store
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  return (
    <div className="p-4 relative">
      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Product Modal */}
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
