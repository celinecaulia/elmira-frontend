import React from 'react';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#4A3B32] font-sans pb-20 px-6 md:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto pt-10 space-y-16">
        
        {/* Header Section dengan cross dissolve */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <div className="space-y-3 md:w-1/2">
            <span className="text-xs tracking-widest bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent uppercase font-semibold">
              DAFTAR HARGA 2026
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#4A3B32] leading-tight">
              Daftar Harga <span className="text-[#8C6D62]">Jujur & Ramah</span> di Kantong
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Yuk, mampir ke Elmira Salon! Tempat pas buat kamu yang mau santai dan merawat diri dengan nyaman serasa di rumah sendiri.
            </p>
          </div>

          {/* Top Summary Card (Mulai Dari) dengan hover lift */}
          <div className="w-full md:w-5/12 bg-[#FCECE8]/60 border border-[#E8D3CE] rounded-3xl p-6 shadow-sm space-y-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <h3 className="text-xs uppercase tracking-wider bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent font-bold">Mulai Dari</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center border-b border-[#E8D3CE]/50 pb-2">
                <span className="text-gray-700">Potong Rambut</span>
                <span className="font-bold text-[#4A3B32]">Rp. 35.000</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#E8D3CE]/50 pb-2">
                <span className="text-gray-700">Cuci Blow</span>
                <span className="font-bold text-[#4A3B32]">Rp. 50.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Coloring</span>
                <span className="font-bold text-[#4A3B32]">Rp. 100.000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kategori 1: Hair Styling */}
        <div className="space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <div className="border-b border-[#E8D3CE] pb-3">
            <span className="text-xs tracking-widest bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent uppercase font-semibold">KATEGORI</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#4A3B32] mt-1">Hair Styling</h2>
            <p className="text-gray-500 text-xs mt-1">Potong, cuci, dan blow harian — layanan yang paling sering diambil dan bisa selesai dalam satu jam.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] space-y-6 transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="font-serif font-semibold text-lg text-[#4A3B32]">Hair Cut</span>
              <span className="font-bold text-[#4A3B32] text-lg">Rp. 20.000</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="font-serif font-semibold text-lg text-[#4A3B32]">Wash and Blow Dry</span>
              <span className="font-bold text-[#4A3B32] text-lg">Rp. 20.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-serif font-semibold text-lg text-[#4A3B32]">Wash and Blow In</span>
              <span className="font-bold text-[#4A3B32] text-lg">Rp. 50.000</span>
            </div>
          </div>
        </div>

        {/* Kategori 2: Treatments */}
        <div className="space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
          <div className="border-b border-[#E8D3CE] pb-3">
            <span className="text-xs tracking-widest bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent uppercase font-semibold">KATEGORI</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#4A3B32] mt-1">Treatments</h2>
            <p className="text-gray-500 text-xs mt-1">Perawatan rambut hingga wajah</p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] space-y-6 transition-all duration-300 hover:shadow-md">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="font-serif font-semibold text-lg text-[#4A3B32]">Creambath</span>
              <span className="font-bold text-[#4A3B32] text-lg">Rp. 65.000</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="font-serif font-semibold text-lg text-[#4A3B32]">Deep Facial Cleansing</span>
              <span className="font-bold text-[#4A3B32] text-lg">Rp. 50.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-serif font-semibold text-lg text-[#4A3B32]">Hair Mask & Spa</span>
              <span className="font-bold text-[#4A3B32] text-lg">Rp. 90.000</span>
            </div>
          </div>
        </div>

        {/* Kategori 3: Hair Coloring (Tabel Panjang Rambut) */}
        <div className="space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          <div className="border-b border-[#E8D3CE] pb-3">
            <span className="text-xs tracking-widest bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent uppercase font-semibold">KATEGORI</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#4A3B32] mt-1">Hair Coloring</h2>
            <p className="text-gray-500 text-xs mt-1">Pewarnaan tanpa bleaching. Harga mengikuti panjang rambut — makin panjang, makin banyak cat yang dipakai.</p>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] overflow-x-auto transition-all duration-300 hover:shadow-md">
            <table className="w-full min-w-[520px] text-left border-collapse">
              <thead>
                {/* [REVISI RESPONSIF TABEL]: Pindahkan gradasi teks dari <tr> ke <span> di dalam <th> agar tidak ngeblok kotak cokelat di HP */}
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-[#8C6D62]">
                  <th className="py-3 pr-4 font-bold whitespace-nowrap">
                    <span className="bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent">Layanan</span>
                  </th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap">
                    <span className="bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent">Short</span>
                  </th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap">
                    <span className="bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent">Medium</span>
                  </th>
                  <th className="py-3 px-3 font-bold whitespace-nowrap">
                    <span className="bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent">Long</span>
                  </th>
                  <th className="py-3 pl-3 font-bold whitespace-nowrap">
                    <span className="bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent">Extra Long</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                <tr>
                  <td className="py-4 pr-4 font-serif font-semibold text-[#4A3B32] whitespace-nowrap">Basic Color</td>
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">Rp. 120.000</td>
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">Rp. 145.000</td>
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">Rp. 180.000</td>
                  <td className="py-4 pl-3 text-gray-600 whitespace-nowrap">Rp. 200.000</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-serif font-semibold text-[#4A3B32] whitespace-nowrap">Balayage No Bleach</td>
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">Rp. 250.000</td>
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">Rp. 280.000</td>
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">Rp. 300.000</td>
                  <td className="py-4 pl-3 text-gray-600 whitespace-nowrap">Rp. 360.000</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-serif font-semibold text-[#4A3B32] whitespace-nowrap">Highlight No Bleach</td>
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">Rp. 400.000</td>
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">Rp. 420.000</td>
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap">Rp. 450.000</td>
                  <td className="py-4 pl-3 text-gray-600 whitespace-nowrap">Rp. 480.000</td>
                </tr>
              </tbody>
            </table>
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

export default PricingPage;