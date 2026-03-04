import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.pageYOffset > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#121212]/90 backdrop-blur-md shadow-2xl py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <div data-testid="logo" className="flex items-center gap-3 font-montserrat text-2xl font-bold text-primary cursor-pointer" onClick={() => scrollTo('home')}>
          <i className="fas fa-motorcycle text-3xl"></i>
          <span>Best Motors</span>
        </div>

        {/* Desktop Nav */}
        <ul data-testid="nav-menu" className={`hidden md:flex list-none items-center gap-8`}>
          {['home','bikes','why-us','reviews','location'].map((id) => (
            <li key={id}>
              <button
                data-testid={`nav-link-${id}`}
                onClick={() => scrollTo(id)}
                className="nav-link text-white font-medium hover:text-primary transition-colors duration-300 capitalize bg-transparent border-none cursor-pointer"
              >
                {id === 'why-us' ? 'Why Us' : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/918848435363"
              data-testid="nav-whatsapp-btn"
              className="bg-primary text-[#050505] px-6 py-2.5 rounded-full font-semibold hover:bg-primary-hover hover:-translate-y-0.5 transition-all duration-300"
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          data-testid="hamburger"
          className="flex md:hidden flex-col gap-1.5 cursor-pointer bg-transparent border-none p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'hamburger-line-1 active' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'hamburger-line-2 active' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'hamburger-line-3 active' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-[#121212]/98 backdrop-blur-md flex flex-col justify-start pt-8 px-8 gap-6 transition-all duration-300 ${menuOpen ? 'left-0' : '-left-full'}`}
        style={{ left: menuOpen ? 0 : '-100%' }}>
        {['home','bikes','why-us','reviews','location'].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-white text-lg font-medium hover:text-primary transition-colors text-left bg-transparent border-none cursor-pointer capitalize"
          >
            {id === 'why-us' ? 'Why Us' : id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
        <a
          href="https://wa.me/918848435363"
          className="bg-primary text-[#050505] px-6 py-3 rounded-full font-semibold text-center hover:bg-primary-hover transition-colors"
        >
          Contact Us
        </a>
      </div>
    </nav>
  )
}
