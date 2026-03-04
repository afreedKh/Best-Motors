
import { Routes,Route } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import Home from './pages/Home'


export default function App() {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<Home />} />
        {import.meta.env.VITE_APP_ENV === 'production' ? (
          <Route path="https://best-motors.vercel.app/add-product" element={<AddProduct />} />
        ) : 
          <Route path="/add-product" element={<AddProduct />} />
        }
      </Routes>


      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918848435363"
        target="_blank"
        rel="noreferrer"
        data-testid="floating-whatsapp-btn"
        className="whatsapp-float fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-3xl z-[999] hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-all duration-300"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  )
}
