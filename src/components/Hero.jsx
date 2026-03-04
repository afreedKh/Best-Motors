import { useEffect } from 'react'

export default function Hero() {
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('#home')
      if (hero) {
        hero.style.backgroundPositionY = `${window.pageYOffset * 0.5}px`
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1578047798395-2cbf6263c467?q=80&w=1920&auto=format&fit=crop')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/85 to-[#1F2937]/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-8">
        <h1
          data-testid="hero-title"
          className="animate-hero1 font-montserrat text-6xl md:text-7xl font-extrabold mb-4 tracking-tight"
        >
          Best Motors
        </h1>
        <p
          data-testid="hero-subtitle"
          className="animate-hero2 text-2xl md:text-3xl text-primary font-semibold mb-2"
        >
          Premium Pre-Owned Two-Wheelers
        </p>
        <p
          data-testid="hero-description"
          className="animate-hero3 text-lg text-[#A3A3A3] mb-8"
        >
          Trusted Second Hand Two Wheeler Showroom in Mukkam
        </p>
        <div
          data-testid="hero-buttons"
          className="animate-hero4 flex flex-wrap gap-6 justify-center"
        >
          <a
            href="#bikes"
            data-testid="view-bikes-btn"
            onClick={(e) => { e.preventDefault(); document.getElementById('bikes')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="bg-primary text-[#050505] px-10 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-3 hover:bg-primary-hover hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(245,158,11,0.3)] transition-all duration-300"
          >
            <i className="fas fa-motorcycle"></i>
            View Available Bikes
          </a>
          <a
            href="https://wa.me/918848435363"
            data-testid="whatsapp-cta-hero"
            className="bg-transparent text-white border-2 border-white px-10 py-4 rounded-full font-semibold text-lg inline-flex items-center gap-3 hover:bg-white hover:text-[#050505] hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fab fa-whatsapp"></i>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        data-testid="scroll-indicator"
        className="scroll-indicator absolute bottom-8 left-1/2 text-primary text-3xl"
      >
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  )
}
