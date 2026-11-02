import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk manajemen kuota tanggal (Matrix Kalender Interaktif Admin & Sinkronisasi Real-time ke User)
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-11
  
  const [dateStatuses, setDateStatuses] = useState({
    '15/10/2026': 'Ready',
    '16/10/2026': 'Ready',
    '21/10/2026': 'Full',
    '28/10/2026': 'Full'
  });

  // Ambil data status kuota dari localStorage saat pertama kali dimuat
  useEffect(() => {
    const savedStatuses = localStorage.getItem('elmira_date_statuses');
    if (savedStatuses) {
      setDateStatuses(JSON.parse(savedStatuses));
    }
  }, []);

  // Logika Kalender Matriks Admin
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

  const toggleDateStatus = (dateStr) => {
    const currentStatus = dateStatuses[dateStr] || 'Ready';
    const newStatus = currentStatus === 'Ready' ? 'Full' : 'Ready';
    const updatedStatuses = {
      ...dateStatuses,
      [dateStr]: newStatus
    };
    setDateStatuses(updatedStatuses);
    
    // Simpan ke localStorage agar langsung tersinkronisasi ke sisi User (BookingPage)
    localStorage.setItem('elmira_date_statuses', JSON.stringify(updatedStatuses));
  };

  // Mengambil data booking dari backend Express & MongoDB
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings');
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (err) {
      console.error('Gagal mengambil data booking:', err);
      setLoading(false);
    }
  };

  // Fungsi untuk mengubah status booking (misal: Confirmed / Selesai)
  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Confirmed' : 'Completed';
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchBookings(); // Refresh data
      }
    } catch (err) {
      console.error('Gagal memperbarui status:', err);
    }
  };

  // Fungsi untuk menghapus data booking
  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data booking ini?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchBookings();
        }
      } catch (err) {
        console.error('Gagal menghapus booking:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#4A3B32] font-sans pb-20">
      {/* Top Header Bar */}
      <div className="bg-[#EEDDDC]/70 border-b border-[#E8D3CE] px-8 md:px-16 py-4 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-bold text-[#4A3B32]">Admin Dashboard</h1>
          <span className="text-xs text-gray-500">Kelola jadwal janji temu dan pesanan Elmira Salon</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xs font-bold bg-white px-4 py-2 rounded-xl border border-[#E8D3CE] hover:bg-[#E8D3CE]/30 transition">
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10 space-y-8">
        
        {/* Statistik Ringkas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8D3CE] space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Booking Masuk</span>
            <h2 className="text-3xl font-serif font-bold text-[#4A3B32]">{bookings.length}</h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8D3CE] space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Status Aktif</span>
            <h2 className="text-3xl font-serif font-bold text-[#8C6D62]">Terhubung ke DB</h2>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E8D3CE] space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Lokasi</span>
            <h2 className="text-3xl font-serif font-bold text-[#4A3B32]">Jakarta</h2>
          </div>
        </div>

        {/* Manajemen Kuota Tanggal (Matrix Kalender Interaktif Admin) */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#E8D3CE]/40 pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#4A3B32]">Manajemen Kuota Tanggal Salon</h3>
              <p className="text-gray-500 text-xs mt-0.5">Klik langsung pada tanggal di kalender untuk mengubah status ketersediaan (Ready / Full) yang tersinkronisasi ke sisi user.</p>
            </div>
            
            {/* Navigasi Bulan Kalender Admin */}
            <div className="flex items-center gap-3 bg-[#FAF7F5] px-4 py-2 rounded-2xl border border-[#E8D3CE]">
              <button onClick={prevMonth} className="px-2 py-0.5 rounded-lg bg-white border border-[#E8D3CE] text-xs font-bold hover:bg-[#E8D3CE] transition">‹</button>
              <span className="text-xs font-serif font-bold text-[#4A3B32]">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button onClick={nextMonth} className="px-2 py-0.5 rounded-lg bg-white border border-[#E8D3CE] text-xs font-bold hover:bg-[#E8D3CE] transition">›</button>
            </div>
          </div>

          <div className="bg-[#FAF7F5] p-6 rounded-3xl border border-[#E8D3CE]/60 space-y-3">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#8C6D62]">
              {weekDays.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: startDay }).map((_, index) => (
                <div key={`empty-${index}`} />
              ))}

              {Array.from({ length: totalDays }).map((_, index) => {
                const day = index + 1;
                const formattedDay = String(day).padStart(2, '0');
                const formattedMonth = String(currentMonth + 1).padStart(2, '0');
                const dateStr = `${formattedDay}/${formattedMonth}/${currentYear}`;
                
                const status = dateStatuses[dateStr] || 'Ready';
                const isFull = status === 'Full';

                return (
                  <button
                    key={day}
                    onClick={() => toggleDateStatus(dateStr)}
                    className={`p-3 rounded-2xl border text-xs flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 ${
                      isFull 
                        ? 'bg-red-50 border-red-200 text-red-600 shadow-sm' 
                        : 'bg-white border-[#E8D3CE] text-[#4A3B32] shadow-sm font-medium'
                    }`}
                  >
                    <span className="font-bold text-sm">{day}</span>
                    <span className={`text-[10px] mt-1 px-2 py-0.5 rounded-full font-bold ${
                      isFull ? 'bg-red-200 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {status}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-[#E8D3CE]/40">
              <span>💡 Tips: Klik tanggal untuk beralih status antara <b>Ready</b> dan <b>Full</b> secara real-time.</span>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Ready</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Full Kuota</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Daftar Booking */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#E8D3CE] space-y-6">
          <div className="flex justify-between items-center border-b border-[#E8D3CE]/40 pb-4">
            <h3 className="font-serif font-bold text-lg text-[#4A3B32]">Daftar Janji Temu Pelanggan</h3>
            <button 
              onClick={fetchBookings} 
              className="text-xs bg-[#FAF7F5] border border-[#E8D3CE] px-4 py-2 rounded-xl hover:bg-[#E8D3CE]/40 transition font-medium"
            >
              🔄 Refresh Data
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-8 text-sm">Memuat data dari database...</p>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-gray-500 text-sm">Belum ada data booking yang masuk ke database.</p>
              <p className="text-xs text-[#8C6D62]">Coba lakukan pemesanan melalui halaman *Booking* di website utama.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-[#E8D3CE]/60 text-gray-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Pelanggan</th>
                    <th className="py-3 px-4">Kontak (WhatsApp/Email)</th>
                    <th className="py-3 px-4">Jadwal</th>
                    <th className="py-3 px-4">Layanan</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8D3CE]/30">
                  {bookings.map((item) => (
                    <tr key={item._id} className="hover:bg-[#FAF7F5]/60 transition">
                      <td className="py-4 px-4 font-bold text-[#4A3B32]">{item.fullName}</td>
                      <td className="py-4 px-4 text-gray-600">
                        <div>{item.whatsapp}</div>
                        <div className="text-xs text-gray-400">{item.email}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        <div className="font-medium text-[#4A3B32]">{item.date}</div>
                        <div className="text-xs text-[#8C6D62]">{item.time}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          {item.services.map((srv, idx) => (
                            <span key={idx} className="inline-block bg-[#FAF7F5] border border-[#E8D3CE] px-2 py-0.5 rounded-lg text-[11px] text-[#4A3B32] mr-1 mb-1">
                              {srv}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          item.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {item.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center space-x-2">
                        <button 
                          onClick={() => handleUpdateStatus(item._id, item.status)}
                          className="bg-[#FAF7F5] border border-[#E8D3CE] text-[#4A3B32] px-3 py-1.5 rounded-xl text-xs hover:bg-[#E8D3CE] transition font-medium"
                        >
                          Update Status
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-xl text-xs hover:bg-red-100 transition font-medium"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;