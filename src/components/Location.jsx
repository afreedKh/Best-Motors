export default function Location() {
  return (
    <section id="location" data-testid="location-section" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 data-testid="location-title" className="font-montserrat text-4xl md:text-5xl font-bold mb-4">Visit Our Showroom</h2>
          <p data-testid="location-description" className="text-[#A3A3A3] text-lg">Find us near Mukkam Police Station</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Info */}
          <div data-testid="location-info" className="flex flex-col gap-8">
            <div data-testid="address-info" className="flex gap-6 items-start">
              <i className="fas fa-map-marker-alt text-3xl text-primary w-10 mt-1"></i>
              <div>
                <h4 className="font-montserrat text-xl font-semibold mb-2">Address</h4>
                <p className="text-[#A3A3A3]">Near Mukkam Police Station<br />8XGR+8H4, Mukkam, Kerala 673602</p>
              </div>
            </div>
            <div data-testid="hours-info" className="flex gap-6 items-start">
              <i className="fas fa-clock text-3xl text-primary w-10 mt-1"></i>
              <div>
                <h4 className="font-montserrat text-xl font-semibold mb-2">Opening Hours</h4>
                <p className="text-[#A3A3A3]">Open Daily<br />Closes at 8:30 PM</p>
              </div>
            </div>
            <div data-testid="contact-info" className="flex gap-6 items-start">
              <i className="fas fa-phone text-3xl text-primary w-10 mt-1"></i>
              <div>
                <h4 className="font-montserrat text-xl font-semibold mb-2">Contact</h4>
                <p className="text-[#A3A3A3]">+91 8848435363</p>
              </div>
            </div>
            <a
              href="https://wa.me/918848435363"
              data-testid="location-whatsapp-btn"
              className="bg-primary text-[#050505] px-8 py-4 rounded-full font-semibold inline-flex items-center justify-center gap-3 hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300 mt-2"
            >
              <i className="fab fa-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>

          {/* Map */}
          <div data-testid="map-container" className="rounded-xl overflow-hidden h-[450px] border-2 border-[#27272a]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.1224513630887!2d75.98887367491605!3d11.325759488858399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64300314e632d%3A0x76a2596391e8bf6d!2sBest%20motors%20mukkam!5e0!3m2!1sen!2sin!4v1772619631193!5m2!1sen!2sin"
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="google-map"
              title="Best Motors Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
