import React from 'react';

const ServiceCard = ({ title, desc, price, img }) => {
  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#E8D3CE] space-y-4 flex flex-col justify-between hover:shadow-md transition">
      <div className="space-y-3">
        {/* Gambar Galeri Layanan */}
        <div className="w-full h-40 bg-[#FAF7F5] rounded-2xl border border-[#F5EDEC] overflow-hidden flex items-center justify-center">
          <img 
            src={img} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        {/* Teks Rata Tengah */}
        <div className="space-y-1 text-center">
          <h3 className="text-lg font-serif font-bold text-[#4A3B32]">{title}</h3>
          <p className="text-gray-600 text-xs leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="text-center pt-2 border-t border-gray-100">
        <span className="text-xs font-bold text-[#8C6D62]">{price}</span>
      </div>
    </div>
  );
};

export default ServiceCard;