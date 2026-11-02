import React from 'react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const allServices = [
    {
      title: "Hair Cut",
      price: "Mulai dari 35.000",
      desc: "Hair cut belum termasuk wash dry/blow in/catok/curly.",
      img: "/haircut.png"
    },
    {
      title: "Wash dan Blow Dry",
      price: "Mulai dari 20.000",
      desc: "Hanya keramas lalu di keringkan saja dengan hair dryer. Dipastikan rambut jadi bersih dan wangi.",
      img: "/service_washblow.png"
    },
    {
      title: "Wash dan Blow In",
      price: "Mulai dari 50.000",
      desc: "Dipastikan rambut jadi bersih, wangi, dan rapi. Sudah termasuk proses cuci dan blow in / catok rambut.",
      img: "/service_blowin.png"
    },
    {
      title: "Creambath",
      price: "Mulai dari 65.000",
      desc: "Perawatan nutrisi rambut mendalam disertai pijatan relaksasi pada kepala, leher, dan bahu.",
      img: "/creambath.png"
    },
    {
      title: "Hair Coloring",
      price: "Mulai dari 100.000",
      desc: "Pewarnaan rambut menggunakan bahan berkualitas tinggi untuk hasil warna yang tahan lama dan berkilau.",
      img: "/coloring.png"
    },
    {
      title: "Deep Cleansing Facial",
      price: "Mulai dari 150.000",
      desc: "Pembersihan komedo, ekstraksi, dan masker wajah untuk membersihkan pori-pori secara menyeluruh.",
      img: "/facial.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#4A3B32] font-sans pb-16">
      
      {/* Top Banner / Header Section dengan efek cross dissolve */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 flex flex-col md:flex-row items-center gap-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
        <div className="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-sm bg-white border border-[#E8D3CE] p-2 transition-transform duration-500 hover:shadow-md">
          <img 
            src="/layanan_header.png" 
            alt="Layanan Lengkap Elmira Salon" 
            className="w-full h-64 object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
            onError={(e) => { 
              e.target.style.display = 'none'; 
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback jika gambar belum ada */}
          <div className="w-full h-64 rounded-2xl bg-[#E8D3CE]/30 hidden items-center justify-center text-[#4A3B32] font-serif font-semibold text-sm">
            [Gambar Layanan Lengkap Elmira Salon]
          </div>
        </div>
        
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#4A3B32]">
            Layanan Lengkap
          </h1>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Elmira Salon menyediakan layanan perawatan rambut dan kecantikan yang lengkap dalam suasana rumah yang hangat dan nyaman.
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Yuk, mampir ke Elmira Salon! Tempat pas buat kamu yang mau santai dan merawat diri dengan nyaman serasa di rumah sendiri.
          </p>
          <span className="inline-block text-[#8C6D62] font-semibold text-sm tracking-wide transition-transform duration-300 hover:scale-105 cursor-default">
            #EleganceFromTheNile
          </span>
        </div>
      </div>

      {/* Main Services Container Box */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="bg-[#EEDDDC]/40 border border-[#E8D3CE] rounded-3xl p-6 md:p-10 shadow-sm space-y-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          
          {/* Sub Header Box */}
          <div className="bg-[#FAF7F5] border border-[#E8D3CE] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#4A3B32]">Layanan Kami</h2>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Pilih Layanan yang Ingin Anda Lihat</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-xs text-[#8C6D62] font-semibold uppercase tracking-wider">#EleganceFromTheNile</span>
              <Link 
                to="/pricing" 
                className="bg-white border border-[#E8D3CE] text-[#4A3B32] px-4 py-2 rounded-xl text-xs font-semibold shadow-sm hover:bg-[#FAF7F5] transition-all duration-300 hover:-translate-y-0.5 inline-block"
              >
                📄 Pricelist Lengkap
              </Link>
            </div>
          </div>

          {/* Grid Cards (6 Services) dengan animasi bertahap & hover lift */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-5 shadow-sm border border-[#E8D3CE] flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-md space-y-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}
              >
                <div className="space-y-3">
                  {/* Thumbnail Image */}
                  <div className="w-full h-40 bg-[#FAF7F5] rounded-2xl border border-[#F5EDEC] overflow-hidden flex items-center justify-center">
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="font-serif font-bold text-lg text-[#4A3B32]">{service.title}</h3>
                    <p className="text-xs font-semibold text-[#8C6D62]">{service.price}</p>
                    <p className="text-gray-600 text-xs mt-2 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Style CSS Keyframes untuk animasi cross dissolve & geser ke atas */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;