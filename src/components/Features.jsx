import React from 'react';

const Features = () => {
  return (
    <section className="bg-white px-8 md:px-16 py-16 space-y-16 max-w-6xl mx-auto rounded-3xl my-8 shadow-sm border border-[#F5EDEC]">
      
      {/* Feature 1: Sentuhan Ahli (Gambar geser dari Kiri ke Kanan, Teks Cross Dissolve) */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Gambar dengan animasi slide in dari kiri */}
        <div className="md:w-1/3 w-full opacity-0 animate-[slideInLeft_0.8s_ease-out_0.2s_forwards]">
          <div className="bg-[#FAF7F5] p-2.5 rounded-3xl shadow-md border border-[#E8D3CE] transition-all duration-300 hover:shadow-lg">
            <img 
              src="/sentuhanahli.png" 
              alt="Sentuhan Ahli" 
              className="rounded-2xl w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => { 
                e.target.style.display = 'none'; 
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback jika foto gagal dimuat */}
            <div className="rounded-2xl w-full h-48 bg-[#E8D3CE]/30 hidden items-center justify-center text-[#4A3B32] font-serif font-semibold text-sm">
              [Gambar Sentuhan Ahli]
            </div>
          </div>
        </div>

        {/* Teks dengan efek cross dissolve */}
        <div className="md:w-2/3 space-y-3 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#4A3B32]">Sentuhan Ahli</h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            Setiap helai rambut dan detail perawatan Anda dikerjakan oleh para tenaga ahli berpengalaman yang berdedikasi tinggi pada kesempurnaan. Kami memadukan teknik tata rias modern dengan produk berkualitas tinggi berstandar premium, untuk memastikan hasil akhir yang memancarkan pesona megah dan elegan pada diri Anda.
          </p>
        </div>
      </div>

      {/* Feature 2: Kemewahan Rasional (Gambar geser dari Kanan ke Kiri, Teks Cross Dissolve) */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10">
        
        {/* Gambar dengan animasi slide in dari kanan */}
        <div className="md:w-1/3 w-full opacity-0 animate-[slideInRight_0.8s_ease-out_0.4s_forwards]">
          <div className="bg-[#FAF7F5] p-2.5 rounded-3xl shadow-md border border-[#E8D3CE] transition-all duration-300 hover:shadow-lg">
            <img 
              src="/kemewahanrasional.png" 
              alt="Kemewahan Rasional" 
              className="rounded-2xl w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => { 
                e.target.style.display = 'none'; 
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback jika foto belum dimasukkan */}
            <div className="rounded-2xl w-full h-48 bg-[#E8D3CE]/30 hidden items-center justify-center text-[#4A3B32] font-serif font-semibold text-sm">
              [Gambar Kemewahan Rasional]
            </div>
          </div>
        </div>

        {/* Teks dengan efek cross dissolve */}
        <div className="md:w-2/3 space-y-3 md:text-right opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#4A3B32]">Kemewahan Rasional</h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            Nikmati pengalaman perawatan eksklusif layaknya ratu Mesir dengan penawaran harga yang transparan dan bijak. Di Elmira Salon, kemewahan tidak harus mahal—karena setiap wanita berhak merawat diri tanpa keraguan. Perjalanan Anda menuju versi tercantik dimulai di sini dengan kenyamanan seutuhnya.
          </p>
        </div>
      </div>

      {/* Style CSS Keyframes untuk animasi geser kiri/kanan & cross dissolve */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Features;