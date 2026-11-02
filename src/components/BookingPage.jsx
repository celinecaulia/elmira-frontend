import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  
  // Inisialisasi tanggal default hari ini secara otomatis (Real-time system date)
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11
  const [selectedDate, setSelectedDate] = useState(
    `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`
  );
  
  // State untuk status kuota tanggal yang disinkronkan dari Admin Dashboard (localStorage)
  const [dateStatuses, setDateStatuses] = useState({
    '15/10/2026': 'Ready',
    '16/10/2026': 'Ready',
    '21/10/2026': 'Full',
    '28/10/2026': 'Full'
  });

  // Ambil data status kuota dari localStorage saat halaman dibuka
  useEffect(() => {
    const savedStatuses = localStorage.getItem('elmira_date_statuses');
    if (savedStatuses) {
      setDateStatuses(JSON.parse(savedStatuses));
    }
  }, []);
  
  // [DIREVISI] Kosongkan array default agar tidak ada layanan bawaan yang nyangkut dan menumpuk
  const [selectedServices, setSelectedServices] = useState([]);

  const [formData, setFormData] = useState({
    time: '15.00 WIB',
    whatsapp: '',
    fullName: '',
    email: ''
  });

  // [BARU] State untuk menyimpan pesan error validasi input
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    whatsapp: ''
  });

  // Daftar lengkap pricelist per kategori
  const serviceCategories = {
    hairStyling: [
      { name: 'Hair Cut', price: 'Rp. 35.000' },
      { name: 'Wash dan Blow Dry', price: 'Rp. 20.000' },
      { name: 'Wash dan Blow In', price: 'Rp. 50.000' }
    ],
    treatments: [
      { name: 'Creambath', price: 'Rp. 65.000' },
      { name: 'Hair Mask / Spa', price: 'Rp. 85.000' }
    ],
    hairColoring: [
      { name: 'Basic Color', price: 'Rp. 100.000' },
      { name: 'Balayage / Highlight', price: 'Rp. 250.000' }
    ]
  };

  // Fungsi untuk Handle Check / Uncheck Service
  const handleCheckboxChange = (serviceName, price) => {
    const itemString = `${serviceName}\n${price}`;
    if (selectedServices.includes(itemString)) {
      setSelectedServices(selectedServices.filter(item => item !== itemString));
    } else {
      setSelectedServices([...selectedServices, itemString]);
    }
  };

  // Logika Kalender Dinamis & Status Kuota (Ready / Full)
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const weekDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const startDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleNext = () => {
    if (selectedServices.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Silakan pilih minimal 1 layanan terlebih dahulu!',
        confirmButtonColor: '#4A3B32',
        background: '#FAF7F5',
        color: '#4A3B32'
      });
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  // [BARU] Fungsi validasi real-time saat user ngetik
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errorMsg = '';

    if (name === 'fullName') {
      if (value && !/^[a-zA-Z\s]*$/.test(value)) {
        errorMsg = 'Nama hanya boleh berisi huruf dan spasi ya.';
      }
    } else if (name === 'email') {
      // Regex standar untuk cek format email
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = 'Format email tidak valid (harus pakai @).';
      }
    } else if (name === 'whatsapp') {
      if (value && !/^[0-9]*$/.test(value)) {
        errorMsg = 'Nomor WhatsApp hanya boleh diisi angka.';
      }
    }

    setFormErrors({ ...formErrors, [name]: errorMsg });
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk mengirim data ke Backend Express, simpan ke MongoDB, & Munculkan Midtrans Snap
  const handleBookingSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.whatsapp) {
      Swal.fire({
        icon: 'warning',
        title: 'Data Belum Lengkap!',
        text: 'Mohon lengkapi Nama, Email, dan Nomor WhatsApp terlebih dahulu!',
        confirmButtonColor: '#4A3B32',
        background: '#FAF7F5',
        color: '#4A3B32'
      });
      return;
    }

    // [BARU] Blokir submit kalau masih ada error validasi
    if (formErrors.fullName || formErrors.email || formErrors.whatsapp) {
      Swal.fire({
        icon: 'error',
        title: 'Format Salah!',
        text: 'Terdapat kesalahan format pada form, mohon perbaiki peringatan yang berwarna merah.',
        confirmButtonColor: '#4A3B32',
        background: '#FAF7F5',
        color: '#4A3B32'
      });
      return;
    }

    try {
      const response = await fetch('https://elmira-backend.vercel.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          date: selectedDate,
          time: formData.time,
          services: selectedServices
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.token) {
        // Panggil Popup Pembayaran Midtrans Snap
        if (window.snap) {
          window.snap.pay(data.token, {
            onSuccess: async function(result){
              // [BARU] Otomatis update status ke database jadi 'Confirmed' setelah bayar
              try {
                await fetch(`https://elmira-backend.vercel.app/${data.data._id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ status: 'Confirmed' })
                });
              } catch (e) {
                console.error('Gagal update status:', e);
              }
              
              Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Pembayaran Berhasil!',
                confirmButtonColor: '#4A3B32',
                background: '#FAF7F5',
                color: '#4A3B32'
              }).then(() => {
                setStep(3); // Pindah ke halaman sukses setelah user klik OK
              });
            },
            onPending: function(result){
              Swal.fire({
                icon: 'info',
                title: 'Menunggu Pembayaran',
                text: 'Menunggu pembayaran Anda!',
                confirmButtonColor: '#4A3B32',
                background: '#FAF7F5',
                color: '#4A3B32'
              }).then(() => {
                setStep(3);
              });
            },
            onError: function(result){
              Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Pembayaran Gagal!',
                confirmButtonColor: '#4A3B32',
                background: '#FAF7F5',
                color: '#4A3B32'
              });
            },
            onClose: function(){
              Swal.fire({
                icon: 'warning',
                title: 'Dibatalkan',
                text: 'Anda menutup popup pembayaran.',
                confirmButtonColor: '#4A3B32',
                background: '#FAF7F5',
                color: '#4A3B32'
              });
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error Sistem',
            text: 'Library Midtrans Snap belum termuat di browser.',
            confirmButtonColor: '#4A3B32',
            background: '#FAF7F5',
            color: '#4A3B32'
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Booking Gagal!',
          text: data.error || 'Token tidak ditemukan',
          confirmButtonColor: '#4A3B32',
          background: '#FAF7F5',
          color: '#4A3B32'
        });
      }
    } catch (err) {
      console.error('Error connecting to backend:', err);
      Swal.fire({
        icon: 'error',
        title: 'Koneksi Terputus!',
        text: 'Terjadi kesalahan saat menyambungkan ke server backend.',
        confirmButtonColor: '#4A3B32',
        background: '#FAF7F5',
        color: '#4A3B32'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#4A3B32] font-sans pb-20 overflow-hidden">
      
      {/* Top Header Bar */}
      <div className="bg-[#EEDDDC]/70 border-b border-[#E8D3CE] px-8 md:px-16 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <h1 className="text-xl md:text-2xl font-serif font-bold text-[#4A3B32]">Proses Booking</h1>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="font-serif font-bold text-xs tracking-wider block bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent">ELMIRA</span>
            <span className="text-[9px] text-gray-500 tracking-tighter uppercase">SALON</span>
          </div>
          <Link to="/" className="text-gray-600 hover:text-[#4A3B32] font-bold text-lg bg-white/60 p-2 rounded-full border border-[#E8D3CE] transition-all duration-300 hover:scale-105">
            ✕
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-10 space-y-10">
        
        {/* STEP 1: Kalender Matrix, Checkbox Services, & Jam */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            
            {/* Kolom Kiri: Kalender Matrix & Pilihan Service Checkbox */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Kalender Matrix Interaktif dengan Navigasi Bulan & Status Kuota */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Pilih Tanggal Booking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={prevMonth} className="px-2.5 py-1 rounded-xl bg-[#FAF7F5] border border-[#E8D3CE] text-xs font-bold hover:bg-[#E8D3CE] transition">‹</button>
                    <span className="text-xs font-serif font-bold bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <button onClick={nextMonth} className="px-2.5 py-1 rounded-xl bg-[#FAF7F5] border border-[#E8D3CE] text-xs font-bold hover:bg-[#E8D3CE] transition">›</button>
                  </div>
                </div>
                
                <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-[#E8D3CE]/60">
                  {/* Hari Header */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#8C6D62] mb-2">
                    {weekDays.map((d, i) => (
                      <div key={i}>{d}</div>
                    ))}
                  </div>

                  {/* Tanggal Matrix */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Padding untuk hari kosong di awal bulan */}
                    {Array.from({ length: startDay }).map((_, index) => (
                      <div key={`empty-${index}`} />
                    ))}

                    {/* Render Hari dalam Bulan */}
                    {Array.from({ length: totalDays }).map((_, index) => {
                      const day = index + 1;
                      const formattedDay = String(day).padStart(2, '0');
                      const formattedMonth = String(currentMonth + 1).padStart(2, '0');
                      const dateStr = `${formattedDay}/${formattedMonth}/${currentYear}`;
                      const isSelected = selectedDate === dateStr;

                      // Cek status kuota secara real-time dari sinkronisasi Admin
                      const status = dateStatuses[dateStr] || 'Ready';
                      const isFull = status === 'Full';

                      return (
                        <button
                          key={day}
                          disabled={isFull}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`py-2 px-1 rounded-xl text-xs flex flex-col items-center justify-center transition-all ${
                            isFull 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60' 
                              : isSelected 
                                ? 'bg-[#4A3B32] text-white shadow-sm font-bold scale-105' 
                                : 'hover:bg-[#E8D3CE]/40 text-[#4A3B32] font-medium'
                          }`}
                        >
                          <span>{day}</span>
                          <span className={`text-[9px] mt-0.5 font-semibold ${isFull ? 'text-red-400' : isSelected ? 'text-[#D4B5B0]' : 'text-[#8C6D62]'}`}>
                            {status}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
                  <span>Tanggal terpilih: <span className="font-bold text-[#4A3B32]">{selectedDate}</span></span>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#8C6D62]"></span> Ready</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Full Kuota</span>
                  </div>
                </div>
              </div>

              {/* Checkbox Services Berdasarkan Kategori */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Kategori & Service (Bisa Pilih Lebih dari 1)</label>
                  <span className="text-[11px] text-[#8C6D62] italic">Sesuai Pricelist Elmira Salon</span>
                </div>

                <div className="space-y-6">
                  
                  {/* Hair Styling */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider block border-b border-[#E8D3CE]/30 pb-1">Hair Styling</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {serviceCategories.hairStyling.map((srv, idx) => {
                        const itemStr = `${srv.name}\n${srv.price}`;
                        const isChecked = selectedServices.includes(itemStr);
                        return (
                          <label key={idx} className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer text-xs transition-all duration-300 ${isChecked ? 'border-[#4A3B32] bg-[#FAF7F5] font-semibold text-[#4A3B32] shadow-sm' : 'border-[#E8D3CE] bg-white text-gray-600 hover:bg-gray-50'}`}>
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(srv.name, srv.price)}
                                className="accent-[#4A3B32] w-4 h-4 rounded"
                              />
                              <span>{srv.name}</span>
                            </div>
                            <span className="text-[11px] text-[#8C6D62]">{srv.price}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Treatments */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider block border-b border-[#E8D3CE]/30 pb-1">Treatments</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {serviceCategories.treatments.map((srv, idx) => {
                        const itemStr = `${srv.name}\n${srv.price}`;
                        const isChecked = selectedServices.includes(itemStr);
                        return (
                          <label key={idx} className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer text-xs transition-all duration-300 ${isChecked ? 'border-[#4A3B32] bg-[#FAF7F5] font-semibold text-[#4A3B32] shadow-sm' : 'border-[#E8D3CE] bg-white text-gray-600 hover:bg-gray-50'}`}>
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(srv.name, srv.price)}
                                className="accent-[#4A3B32] w-4 h-4 rounded"
                              />
                              <span>{srv.name}</span>
                            </div>
                            <span className="text-[11px] text-[#8C6D62]">{srv.price}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Hair Coloring */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider block border-b border-[#E8D3CE]/30 pb-1">Hair Coloring</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {serviceCategories.hairColoring.map((srv, idx) => {
                        const itemStr = `${srv.name}\n${srv.price}`;
                        const isChecked = selectedServices.includes(itemStr);
                        return (
                          <label key={idx} className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer text-xs transition-all duration-300 ${isChecked ? 'border-[#4A3B32] bg-[#FAF7F5] font-semibold text-[#4A3B32] shadow-sm' : 'border-[#E8D3CE] bg-white text-gray-600 hover:bg-gray-50'}`}>
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(srv.name, srv.price)}
                                className="accent-[#4A3B32] w-4 h-4 rounded"
                              />
                              <span>{srv.name}</span>
                            </div>
                            <span className="text-[11px] text-[#8C6D62]">{srv.price}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Kolom Kanan: Pilih Jam */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8D3CE] space-y-4">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Pilih Jam</label>
                <div className="grid grid-cols-2 gap-3">
                  {['10.00 WIB', '12.00 WIB', '15.00 WIB', '17.00 WIB'].map((timeSlot, idx) => (
                    <label key={idx} className={`flex items-center justify-center p-3 rounded-2xl border cursor-pointer text-xs font-medium transition-all duration-300 ${formData.time === timeSlot ? 'border-[#4A3B32] bg-[#FAF7F5] font-bold shadow-sm' : 'border-[#E8D3CE] bg-white text-gray-600 hover:bg-gray-50'}`}>
                      <input 
                        type="radio" 
                        name="timeSlot" 
                        checked={formData.time === timeSlot}
                        onChange={() => setFormData({...formData, time: timeSlot})}
                        className="hidden" 
                      />
                      <span>{timeSlot}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNext}
                  className="bg-[#FAF7F5] border border-[#E8D3CE] text-[#4A3B32] px-8 py-3 rounded-2xl text-xs font-bold shadow-sm hover:bg-[#E8D3CE] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Lanjutkan →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 2: Detail Pesanan & Nomor WhatsApp / Data Diri */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            
            {/* Kolom Kiri: Ringkasan & Data Diri */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] space-y-3">
                <h3 className="font-serif font-bold text-xl text-[#4A3B32] border-b border-gray-100 pb-3">Ringkasan Jadwal</h3>
                <div className="text-xs text-gray-500">Tanggal: <span className="font-bold text-[#4A3B32]">{selectedDate} ({formData.time})</span></div>
                <div className="space-y-1 text-sm text-gray-700 pt-2">
                  {selectedServices.map((srv, index) => (
                    <div key={index} className="py-1.5 border-b border-gray-50 flex items-center justify-between">
                      <span>✨ {srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] space-y-4">
                
                {/* [DIREVISI] Input Nama Lengkap dengan Validasi */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Masukkan Nama" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full bg-[#FAF7F5] border rounded-2xl px-4 py-3 text-sm text-[#4A3B32] outline-none transition ${formErrors.fullName ? 'border-red-500 focus:border-red-500' : 'border-[#E8D3CE] focus:border-[#8C6D62]'}`}
                  />
                  {formErrors.fullName && <span className="text-red-500 text-xs mt-1 block pl-2">{formErrors.fullName}</span>}
                </div>
                
                {/* [DIREVISI] Input Email dengan Validasi */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Masukkan Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-[#FAF7F5] border rounded-2xl px-4 py-3 text-sm text-[#4A3B32] outline-none transition ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-[#E8D3CE] focus:border-[#8C6D62]'}`}
                  />
                  {formErrors.email && <span className="text-red-500 text-xs mt-1 block pl-2">{formErrors.email}</span>}
                </div>

              </div>
            </div>

            {/* Kolom Kanan: Nomor WhatsApp & Tombol Lanjut */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8D3CE] space-y-3">
                
                {/* [DIREVISI] Input WhatsApp dengan Validasi */}
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Nomor WhatsApp</label>
                <input 
                  type="text" 
                  name="whatsapp"
                  placeholder="Masukkan Nomor WhatsApp" 
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className={`w-full bg-[#FAF7F5] border rounded-2xl px-4 py-3 text-sm text-[#4A3B32] outline-none transition ${formErrors.whatsapp ? 'border-red-500 focus:border-red-500' : 'border-[#E8D3CE] focus:border-[#8C6D62]'}`}
                />
                {formErrors.whatsapp && <span className="text-red-500 text-xs mt-1 block pl-2">{formErrors.whatsapp}</span>}
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleBookingSubmit}
                  className="bg-[#4A3B32] text-white px-8 py-3 rounded-2xl text-xs font-bold shadow-sm hover:bg-[#382b24] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Bayar Sekarang (Midtrans) 💳
                </button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: Konfirmasi Pembayaran & Informasi WhatsApp */}
        {step === 3 && (
          <div className="max-w-xl mx-auto space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8D3CE] text-center space-y-6">
              <div className="w-16 h-16 bg-[#FAF7F5] border border-[#E8D3CE] rounded-full flex items-center justify-center mx-auto text-2xl shadow-sm">
                ✨
              </div>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <p className="font-bold text-[#4A3B32] text-lg font-serif">
                  Pembayaran & Booking Berhasil!
                </p>
                <p>
                  Terima kasih, data pesanan dan jadwal Anda sudah tersimpan dengan aman di database.
                </p>
                <p className="text-gray-500 text-xs">
                  Butuh bantuan? Hubungi kami via WhatsApp: 628111702328
                </p>
              </div>
              <div className="pt-2">
                <button 
                  onClick={() => { setStep(1); window.location.href = '/'; }}
                  className="bg-[#FAF7F5] border border-[#E8D3CE] text-[#4A3B32] px-10 py-3 rounded-2xl text-xs font-bold shadow-sm hover:bg-[#E8D3CE] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Selesai / Kembali ke Beranda
                </button>
              </div>
            </div>
          </div>
        )}

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

export default BookingPage;