import React from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  // Ganti kalimat atau nama file gambar di sini sesuai kebutuhan lo
  const serviceList = [
    { 
      title: "Hair Cut & Styling", 
      desc: "Potongan rambut modis disesuaikan bentuk wajah.", 
      img: "/haircut.png" // Ganti dengan nama file gambar lo di folder public
    },
    { 
      title: "Creambath", 
      desc: "Perawatan relaksasi kulit kepala dan nutrisi rambut.", 
      img: "/creambath.png" 
    },
    { 
      title: "Hair Coloring", 
      desc: "Pewarnaan rambut premium tahan lama dan berkilau.", 
      img: "/coloring.png" 
    },
    { 
      title: "Skin Treatments", 
      desc: "Perawatan wajah glowing ala ratu Cleopatra.", 
      img: "/facial.png" 
    }
  ];

  return (
    <section className="bg-[#FAF7F5] px-8 md:px-16 py-16 max-w-6xl mx-auto overflow-hidden">
      
      {/* Judul & Deskripsi dengan efek cross dissolve (fade-in slide-up) */}
      <div className="text-center mb-12 space-y-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#4A3B32]">Galeri Elmira Salon</h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          Temukan mahakarya transformasi kecantikan di Elmira Salon, ekspresikan gaya terbaikmu, dan pancarkan pesona ratu sejati dalam dirimu.
        </p>
      </div>
      
      {/* Grid kartu layanan dengan efek geser/muncul bertahap */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceList.map((item, index) => (
          <div 
            key={index} 
            className="opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] transition-all duration-300 hover:-translate-y-2"
            style={{ animationDelay: `${0.2 + (index * 0.15)}s` }}
          >
            <ServiceCard 
              title={item.title} 
              desc={item.desc} 
              price={item.price} 
              img={item.img}
            />
          </div>
        ))}
      </div>

      {/* Style CSS Keyframes untuk animasi cross dissolve & geser ke atas */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Services;