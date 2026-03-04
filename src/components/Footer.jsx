export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer data-testid="footer" className="bg-[#1E1E1E] pt-12 pb-6 border-t border-[#27272a]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* About */}
          <div data-testid="footer-about">
            <div className="flex items-center gap-3 font-montserrat text-2xl font-bold text-primary mb-4">
              <i className="fas fa-motorcycle text-3xl"></i>
              <span>Best Motors</span>
            </div>
            <p className="text-[#A3A3A3]">Premium Pre-Owned Two-Wheeler Showroom in Mukkam, Kerala</p>
          </div>

          {/* Quick Links */}
          <div data-testid="footer-links">
            <h4 className="font-montserrat text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {[['home','Home'],['bikes','Featured Bikes'],['why-us','Why Us'],['reviews','Reviews']].map(([id, label]) => (
                <li key={id}>
                  <button
                    data-testid={`footer-link-${id}`}
                    onClick={() => scrollTo(id)}
                    className="text-[#A3A3A3] hover:text-primary transition-colors duration-300 bg-transparent border-none cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div data-testid="footer-contact">
            <h4 className="font-montserrat text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-[#A3A3A3]">
                <i className="fas fa-map-marker-alt text-primary"></i> Mukkam, Kerala 673602
              </li>
              <li className="flex items-center gap-2 text-[#A3A3A3]">
                <i className="fas fa-phone text-primary"></i> +91 8848435363
              </li>
              <li className="flex items-center gap-2 text-[#A3A3A3]">
                <i className="fas fa-clock text-primary"></i> Open till 7:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div data-testid="footer-bottom" className="text-center pt-6 border-t border-[#27272a] text-[#A3A3A3]">
          <p>© 2024 Best Motors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
