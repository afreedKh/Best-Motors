import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

function BikeCard({ bike, delay }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      data-testid={`bike-card-${bike.id}`}
      className={`bg-surface rounded-xl overflow-hidden border border-[#27272a] transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group ${visible ? "animate-fadeInUp opacity-100" : "opacity-0 translate-y-8"}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={bike.image}
          alt={bike.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          data-testid={`bike-badge-${bike.id}`}
          className="absolute top-4 right-4 bg-primary text-[#050505] px-4 py-1.5 rounded-full text-sm font-semibold"
        >
          {bike.brand}
        </div>
      </div>
      <div className="p-6">
        <h3
          data-testid={`bike-name-${bike.id}`}
          className="font-montserrat text-xl font-semibold mb-2 text-white"
        >
          {bike.name}
        </h3>
        <p
          data-testid={`bike-info-${bike.id}`}
          className="text-[#A3A3A3] mb-4 text-sm"
        >
          {bike.description}
        </p>
        <div className="flex justify-between items-center">
          <span
            data-testid={`bike-price-${bike.id}`}
            className="font-montserrat text-2xl font-bold text-primary"
          >
            {bike.price}
          </span>
          <a
            href={`https://wa.me/918848435363?text=I'm interested in ${bike.name}`}
            data-testid={`enquiry-btn-${bike.id}`}
            className="bg-primary text-[#050505] px-5 py-2.5 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-primary-hover hover:scale-105 transition-all duration-300"
          >
            <i className="fab fa-whatsapp"></i> Enquire
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Bikes() {
  const [bikes, setBikes] = useState([]);
  console.log(bikes);

  useEffect(() => {
    const getBikes = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const bikeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBikes(bikeList);
    };

    getBikes();
  }, []);
  return (
    <section
      id="bikes"
      data-testid="bikes-section"
      className="py-24 bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2
            data-testid="bikes-title"
            className="font-montserrat text-4xl md:text-5xl font-bold mb-4"
          >
            Featured Bikes
          </h2>
          <p data-testid="bikes-description" className="text-[#A3A3A3] text-lg">
            Handpicked quality pre-owned motorcycles
          </p>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-testid="bikes-grid"
        >
          {bikes.map((bike, i) => (
            <BikeCard key={bike.id} bike={bike} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
