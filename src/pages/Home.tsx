import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import Footer from '../components/Footer'
import ProductList from './Product/ProductList'

export default function Home() {
  return (
    <div>
      <Header />
      <HeroBanner />
      <ProductList />
      <Footer />
    </div>
  )
}
