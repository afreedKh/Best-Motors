import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Bikes from '../components/Bikes'
import WhyUs from '../components/WhyUs'
import Brands from '../components/Brands'
import Reviews from '../components/Reviews'
import Location from '../components/Location'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
     <Navbar />
      <Hero />
      <Bikes />
      <WhyUs />
      <Brands />
      <Reviews />
      <Location />
      <CTA />
      <Footer />
    </>
  )
}

export default Home