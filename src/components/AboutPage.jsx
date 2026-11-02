import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#4A3B32] font-sans pb-20 px-6 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto pt-10 space-y-16">
        
        {/* Top Section: Image & Header Info dengan cross dissolve */}
        <div className="flex flex-col lg:flex-row items-center gap-12 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          {/* Left: Image Container */}
          <div className="w-full lg:w-1/2 bg-white p-3 rounded-3xl shadow-sm border border-[#E8D3CE] transition-all duration-300 hover:shadow-md">
            <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden bg-[#FAF7F5] flex items-center justify-center">
              <img 
                src="/about_interior.png" 
                alt="Tentang Elmira Salon" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => { 
                  e.target.style.display = 'none'; 
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback jika gambar gagal dimuat */}
              <div className="w-full h-full bg-[#E8D3CE]/30 hidden items-center justify-center text-[#4A3B32] font-serif font-semibold text-sm p-4 text-center">
                [Gambar Interior Elmira Salon]
              </div>
            </div>
          </div>

          {/* Right: Title, Visi Kami */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <span className="text-xl md:text-2xl font-serif bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent font-semibold">Tentang</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#4A3B32] mt-1">
                Elmira Salon
              </h1>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-lg text-[#4A3B32]">Visi Kami</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Menjadi salon rumahan terfavorit dan terpercaya yang menghadirkan perawatan kecantikan berkualitas, nyaman serasa di rumah sendiri, dan terjangkau bagi semua wanita.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: 4 Cards (M - I - R - A) dengan animasi bertahap & hover lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          
          {/* Card M */}
          <div 
            className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8D3CE] space-y-3 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
            style={{ animationDelay: '0.2s' }}
          >
            <h3 className="font-serif font-bold text-lg bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent tracking-wider text-center border-b border-[#E8D3CE]/40 pb-3">
              M - MODERN
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Menjadi salon rumahan terfavorit dan terpercaya yang menghadirkan perawatan kecantikan berkualitas, nyaman serasa di rumah sendiri, dan terjangkau bagi semua wanita.
            </p>
          </div>

          {/* Card I */}
          <div 
            className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8D3CE] space-y-3 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
            style={{ animationDelay: '0.3s' }}
          >
            <h3 className="font-serif font-bold text-lg bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent tracking-wider text-center border-b border-[#E8D3CE]/40 pb-3">
              I - INSPIRING
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Membantu kamu menemukan gaya dan perawatan paling cocok agar makin percaya diri setiap hari.
            </p>
          </div>

          {/* Card R */}
          <div 
            className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8D3CE] space-y-3 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
            style={{ animationDelay: '0.4s' }}
          >
            <h3 className="font-serif font-bold text-lg bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent tracking-wider text-center border-b border-[#E8D3CE]/40 pb-3">
              R - RELAXING
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Menghadirkan suasana salon rumahan yang tenang, bersih, dan nyaman buat tempat santai sejenak dari kesibukan.
            </p>
          </div>

          {/* Card A */}
          <div 
            className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8D3CE] space-y-3 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
            style={{ animationDelay: '0.5s' }}
          >
            <h3 className="font-serif font-bold text-lg bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent tracking-wider text-center border-b border-[#E8D3CE]/40 pb-3">
              A - AFFORDABLE
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Perawatan berkualitas tinggi dengan harga yang jujur, transparan, dan pastinya ramah di kantong.
            </p>
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

export default AboutPage;