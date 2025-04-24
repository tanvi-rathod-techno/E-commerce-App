import { useEffect, useState } from 'react'
import { getAllProducts } from '../services/productService'
import { Product } from '@/types/product'

export default function EcommerceBannerWithSliding() {
  const [products, setProducts] = useState<Product[]>([]) // State to store products
  const [loading, setLoading] = useState<boolean>(true) // Loading state for product data
  const [currentIndex, setCurrentIndex] = useState(0) // Track the current banner index
  const [banners, setBanners] = useState<{ image: string; title: string; subtitle: string }[]>([])

  // Fetching products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getAllProducts()
        setProducts(productData)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Set banner images and text dynamically based on products
  useEffect(() => {
    if (products.length > 0) {
      const items = products.slice(0, 4).map((product, index) => ({
        image: product.image, // Use the product image for the banner
        title: `Limited Sale on ${product.title}`,
        subtitle: `${product.category} - Only a few left!`,
      }))
      setBanners(items)
    }
  }, [products])

  // Automatically change the banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners])

  // Select the current banner image and text based on the index
  const currentBanner = banners[currentIndex]

  return (
    <div>
      {/* Main Sliding Banner */}
      <div
        className="h-[500px] w-full bg-cover bg-center relative transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentBanner?.image})`, // Use product image as the banner image
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            {currentBanner?.title}
          </h1>
          <p className="text-lg md:text-2xl">{currentBanner?.subtitle}</p>
          <button className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-lg rounded-full shadow-lg transition">
            Shop Now
          </button>
        </div>

        {/* Dots to indicate the active slide */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {banners.map((_, index) => (
                <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
                />
            ))}
            </div>
      </div>
    </div>
  )
}
