const brands = [
  { id: 'honda', name: 'Honda' },
  { id: 'yamaha', name: 'Yamaha' },
  { id: 'bajaj', name: 'Bajaj' },
  { id: 'ktm', name: 'KTM' },
  { id: 'suzuki', name: 'Suzuki' },
  { id: 'royal-enfield', name: 'Royal Enfield' },
  { id: 'tvs', name: 'TVS' },
  { id: 'hero', name: 'Hero' },
]

export default function Brands() {
  return (
    <section data-testid="brands-section" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 data-testid="brands-title" className="font-montserrat text-4xl md:text-5xl font-bold mb-4">Available Brands</h2>
          <p data-testid="brands-description" className="text-[#A3A3A3] text-lg">Quality bikes from top manufacturers</p>
        </div>
        <div className="flex flex-wrap gap-10 items-center justify-center" data-testid="brands-marquee">
          {brands.map((brand) => (
            <div
              key={brand.id}
              data-testid={`brand-${brand.id}`}
              className="font-montserrat text-2xl font-bold text-[#A3A3A3] flex items-center gap-3 cursor-default hover:text-primary hover:scale-110 transition-all duration-300"
            >
              <i className="fas fa-motorcycle text-4xl"></i>
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
