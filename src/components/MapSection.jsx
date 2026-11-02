import React from 'react';

const MapSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 my-12">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-[#E8D3CE]/40 pb-4">
          <div>
            <span className="text-xs tracking-widest bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent uppercase font-semibold">
              LOKASI KAMI
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4A3B32] mt-0.5">
              Kunjungi Elmira Salon
            </h3>
          </div>
          <p className="text-gray-500 text-xs md:text-sm text-right">
            📍 Jl. Sawo No.19f, Cipedak, Jagakarsa, Jakarta Selatan
          </p>
        </div>

        {/* Real Google Maps Embed (Disesuaikan pas di titik lingkaran biru lo) */}
        <div className="w-full h-80 rounded-2xl overflow-hidden border border-[#E8D3CE] shadow-inner">
          <iframe 
            title="Elmira Salon Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.6174312815!2d106.81205!3d-6.33565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjAnMGUyLjQiUyAxMDbCsDQ4JzQzLjQiRk!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapSection;