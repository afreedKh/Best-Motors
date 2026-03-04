export default function CTA() {
  return (
    <section data-testid="cta-section" className="py-24 bg-gradient-to-br from-[#121212] to-[#1E1E1E] text-center">
      <div className="max-w-2xl mx-auto px-8">
        <h2 data-testid="cta-title" className="font-montserrat text-4xl md:text-5xl font-bold mb-4">Looking for a bike?</h2>
        <p data-testid="cta-subtitle" className="text-[#A3A3A3] text-xl mb-10">Chat with Best Motors on WhatsApp now</p>
        <a
          href="https://wa.me/918848435363"
          data-testid="cta-whatsapp-btn"
          className="bg-primary text-[#050505] px-12 py-5 rounded-full font-semibold text-xl inline-flex items-center gap-4 hover:bg-primary-hover hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(245,158,11,0.4)] transition-all duration-300"
        >
          <i className="fab fa-whatsapp"></i>
          Start WhatsApp Chat
        </a>
      </div>
    </section>
  )
}
