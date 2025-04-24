import { useEffect, useState } from 'react'

interface BannerItem {
  image: string
  title: string
  subtitle: string
}

export default function HeroBanner() {
  const [banners, setBanners] = useState<BannerItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const categories = ['fashion', 'shopping', 'clothing', 'ecommerce']
    const titles = [
      'Up to 35% Off Latest Collections',
      'Flash Sale on Trendy Styles!',
      'Discover the New Arrivals Today',
      'Big Savings on Fashion Picks',
    ]
    const subtitles = [
      'Shop the trendiest items now!',
      'Grab your favorites before they’re gone!',
      'Fresh fashion at unbeatable prices.',
      'Limited-time deals just for you!',
    ]

    const items = categories.map((cat, index) => ({
      image: `https://source.unsplash.com/random/1600x600/?${cat}&sig=${Math.random()}`,
      title: titles[index],
      subtitle: subtitles[index],
    }))

    setBanners(items)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [banners])

  const currentBanner = banners[currentIndex]

  return (
    <section
      className="w-full h-[500px] bg-cover bg-center relative flex items-center justify-center text-white transition-all duration-1000"
      style={{
        backgroundImage: `url(${currentBanner?.image || ''})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          {currentBanner?.title}
        </h1>
        <p className="text-lg md:text-2xl">{currentBanner?.subtitle}</p>
        <button className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white text-lg rounded-full shadow-lg transition">
          Shop Now
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 flex gap-3 z-10">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              currentIndex === i ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
