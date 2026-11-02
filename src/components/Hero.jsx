import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Hero = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/pricing?search=${encodeURIComponent(searchKeyword)}`);
    } else {
      // [DIREVISI] Mengganti alert bawaan dengan pop-up SweetAlert2 yang elegan
      Swal.fire({
        icon: 'warning',
        title: 'Kolom Pencarian Kosong',
        text: 'Silakan masukkan kata kunci layanan terlebih dahulu!',
        confirmButtonColor: '#4A3B32',
        background: '#FAF7F5',
        color: '#4A3B32'
      });
    }
  };

  return (
    <section className="relative bg-[#FAF7F5] py-20 px-6 md:px-16 text-center overflow-hidden">
      {/* Container dengan efek cross dissolve & geser ke atas */}
      <div className="max-w-4xl mx-auto space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
        
        <span className="inline-block text-xs md:text-sm tracking-widest text-[#8C6D62] uppercase font-semibold transition-transform duration-300 hover:scale-105 cursor-default">
          #EleganceFromTheNile
        </span>

        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#4A3B32] leading-tight">
          Temukan Pesona Ratu dalam Dirimu Bersama <span className="text-[#8C6D62] transition-all duration-500 hover:opacity-90">Elmira Salon</span>
        </h1>

        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Nikmati pengalaman perawatan rambut dan tubuh eksklusif bernuansa kemewahan ratu Mesir di salon rumahan berkonsep homey.
        </p>
        
        {/* Search Bar / Booking Bar dengan transisi halus */}
        <div className="flex justify-center mt-6 pt-2">
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex items-center bg-white shadow-sm rounded-full px-4 py-2 border border-[#E8D3CE] w-full max-w-md transition-all duration-300 hover:shadow-md hover:border-[#8C6D62]"
          >
            <span className="text-gray-400 mr-2">🔍</span>
            <input 
              type="text" 
              placeholder="Cari Booking atau Layanan..." 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full outline-none text-sm text-gray-700 bg-transparent"
            />
            <button 
              type="submit" 
              className="bg-[#D4B5B0] text-[#4A3B32] px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:bg-[#8C6D62] hover:text-white hover:-translate-y-0.5 shadow-sm"
            >
              Cari
            </button>
          </form>
        </div>
      </div>

      {/* Tambahan style CSS keyframes untuk animasi geser ke atas & fade-in (cross dissolve) */}
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
    </section>
  );
};

export default Hero;