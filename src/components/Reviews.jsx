import { useScrollReveal } from '../hooks/useScrollReveal'

const reviews = [
  {
    id: 1,
    text: "Best Motors gave me a great deal on my Classic 350. The condition was exactly as described.",
    author: 'Rahul K.', location: 'Mukkam',
    img: 'https://images.unsplash.com/photo-1766162689608-b14a572cf9d4?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 2,
    text: 'Trusted dealership in Mukkam. Very transparent with paperwork and pricing.',
    author: 'Fatima S.', location: 'Calicut',
    img: 'https://images.unsplash.com/photo-1622632405663-f43782a098b5?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 3,
    text: 'Highly recommended for second-hand bikes. The EMI options helped me a lot.',
    author: 'Arun M.', location: 'Mukkam',
    img: 'https://images.unsplash.com/photo-1677901766272-8c9d7b49f07c?q=80&w=200&auto=format&fit=crop',
  },
]

function ReviewCard({ review, delay }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      data-testid={`review-card-${review.id}`}
      className={`bg-[#1E1E1E] p-8 rounded-xl border border-[#27272a] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${visible ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div data-testid={`review-stars-${review.id}`} className="text-primary text-lg mb-4">
        {'★★★★★'}
      </div>
      <p data-testid={`review-text-${review.id}`} className="text-white leading-relaxed mb-6">
        "{review.text}"
      </p>
      <div className="flex items-center gap-4">
        <img
          src={review.img}
          alt={review.author}
          data-testid={`review-image-${review.id}`}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 data-testid={`review-author-${review.id}`} className="font-montserrat font-semibold">{review.author}</h4>
          <p data-testid={`review-location-${review.id}`} className="text-[#A3A3A3] text-sm">{review.location}</p>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" data-testid="reviews-section" className="py-24 bg-[#121212]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 data-testid="reviews-title" className="font-montserrat text-4xl md:text-5xl font-bold mb-4">Customer Reviews</h2>
          <p data-testid="reviews-description" className="text-[#A3A3A3] text-lg">What our happy customers say</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="reviews-grid">
          {reviews.map((r, i) => <ReviewCard key={r.id} review={r} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  )
}
