import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  { id: 1, icon: 'fas fa-shield-alt', title: 'Verified Bikes', text: 'Every bike undergoes thorough inspection and verification' },
  { id: 2, icon: 'fas fa-tags', title: 'Affordable Pricing', text: 'Best prices in Mukkam with transparent pricing policy' },
  { id: 3, icon: 'fas fa-file-alt', title: 'Easy Transfer', text: 'Hassle-free ownership transfer and documentation' },
  { id: 4, icon: 'fas fa-handshake', title: 'Trusted Dealer', text: 'Established local dealership with proven track record' },
  { id: 5, icon: 'fab fa-whatsapp', title: 'Quick Support', text: 'Instant WhatsApp support for all your queries' },
]

function FeatureCard({ feature, delay }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      data-testid={`feature-card-${feature.id}`}
      className={`bg-[#1E1E1E] p-8 rounded-xl text-center border border-[#27272a] transition-all duration-300 hover:-translate-y-2.5 hover:border-primary hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)] ${visible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div data-testid={`feature-icon-${feature.id}`} className="text-5xl text-primary mb-4">
        <i className={feature.icon}></i>
      </div>
      <h3 data-testid={`feature-title-${feature.id}`} className="font-montserrat text-xl font-semibold mb-3">{feature.title}</h3>
      <p data-testid={`feature-text-${feature.id}`} className="text-[#A3A3A3] text-sm leading-relaxed">{feature.text}</p>
    </div>
  )
}

export default function WhyUs() {
  return (
    <section id="why-us" data-testid="why-us-section" className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 data-testid="why-us-title" className="font-montserrat text-4xl md:text-5xl font-bold mb-4">Why Choose Best Motors</h2>
          <p data-testid="why-us-description" className="text-[#A3A3A3] text-lg">Your trusted partner for pre-owned two-wheelers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6" data-testid="features-grid">
          {features.map((f, i) => <FeatureCard key={f.id} feature={f} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  )
}
