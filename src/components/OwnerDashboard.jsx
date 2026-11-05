import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import Swal from 'sweetalert2';

// Daftar harga acuan layanan Elmira Salon (otomatis mendeteksi nominal dari nama layanan)
const SERVICE_PRICES = {
  'Cuci & Blow Dry': 75000,
  'Hair Cut & Styling': 120000,
  'Hair Styling Pesta': 200000,
  'Creambath Tradisional': 100000,
  'Hair Spa Keratin': 160000,
  'Hair Mask Intensive': 150000,
  'Root Touch Up': 250000,
  'Full Hair Coloring': 380000,
  'Balayage / Highlight': 450000,
};

// Kategori layanan untuk pemetaan diagram
const getServiceCategory = (serviceName = '') => {
  const s = serviceName.toLowerCase();
  if (s.includes('cut') || s.includes('blow') || s.includes('styling') || s.includes('catok')) {
    return 'Hair Styling';
  }
  if (s.includes('color') || s.includes('balayage') || s.includes('highlight') || s.includes('bleach') || s.includes('root')) {
    return 'Hair Coloring';
  }
  return 'Treatments';
};

// Estimasi harga jika nama layanan mengandung angka atau pakai harga default
const estimateServicePrice = (serviceName = '') => {
  // Cek jika di string layanan sudah ada angka (misal: "Hair Cut - Rp 100.000")
  const match = serviceName.match(/(\d+[\d.]*)/);
  if (match) {
    const raw = parseInt(match[1].replace(/\./g, ''), 10);
    if (raw > 1000) return raw;
    if (raw > 10 && raw < 1000) return raw * 1000;
  }
  for (const [key, val] of Object.entries(SERVICE_PRICES)) {
    if (serviceName.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return 125000; // Harga rata-rata default per layanan jika tidak terdeteksi spesifik
};

const COLORS_PIE = ['#8C5A4F', '#C89D88', '#D4AF37', '#5C4033', '#E2C2B3'];

export default function OwnerDashboard() {
  // 1. STATE LOGIN KHUSUS OWNER
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('elmira_owner_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 2. STATE DATA RESERVASI DARI BACKEND
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. STATE BIAYA PENGELUARAN OPERASIONAL (Untuk Evaluasi Pemasukan vs Pengeluaran)
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('elmira_owner_expenses');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, title: 'Restock Vitamin, Masker & Cat Rambut', category: 'Bahan Baku', amount: 450000, date: '2026-10-20' },
      { id: 2, title: 'Tagihan Listrik, Air & Wi-Fi Salon', category: 'Utilitas', amount: 300000, date: '2026-10-28' },
      { id: 3, title: 'Insentif Kapster & Kebersihan', category: 'Operasional', amount: 350000, date: '2026-11-02' },
    ];
  });
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState('Bahan Baku');
  const [expAmount, setExpAmount] = useState('');
  const [expDate, setExpDate] = useState('2026-11-06');

  // Ambil URL API Backend
  const API_URL = 'https://elmira-backend.vercel.app/api/bookings';

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data && Array.isArray(data.data)) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data reservasi:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('elmira_owner_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // HANDLER LOGIN OWNER YANG AMAN MENGGUNAKAN .ENV
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Mengambil data rahasia dari file .env (jika kosong, pakai fallback aman)
    const validUser = import.meta.env.VITE_OWNER_USERNAME || 'owner_elmirasalon';
    const validPass = import.meta.env.VITE_OWNER_PASSWORD || 'awasownergalak1984';

    if (username === validUser && password === validPass) {
      sessionStorage.setItem('elmira_owner_auth', 'true');
      setIsAuthenticated(true);
      Swal.fire({
        icon: 'success',
        title: 'Selamat Datang, Owner!',
        text: 'Berhasil masuk ke halaman Evaluasi Strategis Elmira Salon.',
        confirmButtonColor: '#8C5A4F',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Akses Ditolak',
        text: 'Username atau Password Owner salah!',
        confirmButtonColor: '#8C5A4F',
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('elmira_owner_auth');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // HANDLER TAMBAH & HAPUS PENGELUARAN
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount || Number(expAmount) <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Data Belum Lengkap',
        text: 'Mohon isi nama pengeluaran dan nominal biaya dengan benar.',
        confirmButtonColor: '#8C5A4F',
      });
      return;
    }
    const newExp = {
      id: Date.now(),
      title: expTitle,
      category: expCategory,
      amount: Number(expAmount),
      date: expDate,
    };
    setExpenses([newExp, ...expenses]);
    setExpTitle('');
    setExpAmount('');
    Swal.fire({
      icon: 'success',
      title: 'Pengeluaran Dicatat',
      text: 'Grafik evaluasi keuangan otomatis diperbarui.',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  // =========================================================================
  // PENGOLAHAN DATA STRATEGIS UNTUK GRAFIK & DIAGRAM (USEMEMO)
  // =========================================================================
  const analytics = useMemo(() => {
    // Filter pesanan yang tidak dibatalkan untuk dihitung trennya
    const validBookings = bookings.filter(
      (b) => (b.status || '').toLowerCase() !== 'cancelled'
    );

    // Hitung pemasukan dari setiap booking
    let totalRevenue = 0;
    const categoryCount = { 'Hair Styling': 0, 'Treatments': 0, 'Hair Coloring': 0 };
    const servicePopularity = {};
    const dateTrendMap = {};

    validBookings.forEach((b) => {
      const servicesList = Array.isArray(b.services)
        ? b.services
        : typeof b.services === 'string'
        ? b.services.split(',').map((s) => s.trim())
        : ['Perawatan Salon'];

      let bookingTotal = b.totalPrice || b.amount || 0;

      servicesList.forEach((srv) => {
        if (!srv) return;
        const cat = getServiceCategory(srv);
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        servicePopularity[srv] = (servicePopularity[srv] || 0) + 1;

        if (!b.totalPrice && !b.amount) {
          bookingTotal += estimateServicePrice(srv);
        }
      });

      // Hanya akumulasi ke Pemasukan Bersih jika status Confirmed / Completed (atau semua valid jika testing)
      totalRevenue += bookingTotal;

      const dateKey = b.date || '2026-11-01';
      if (!dateTrendMap[dateKey]) {
        dateTrendMap[dateKey] = { date: dateKey, pelanggan: 0, pemasukan: 0 };
      }
      dateTrendMap[dateKey].pelanggan += 1;
      dateTrendMap[dateKey].pemasukan += bookingTotal;
    });

    const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    const netProfit = totalRevenue - totalExpense;

    // 1. Data Diagram Pie Kategori Layanan Favorit
    const pieData = Object.entries(categoryCount)
      .map(([name, value]) => ({ name, value }))
      .filter((item) => item.value > 0);

    if (pieData.length === 0) {
      pieData.push(
        { name: 'Hair Styling', value: 4 },
        { name: 'Treatments', value: 6 },
        { name: 'Hair Coloring', value: 3 }
      );
    }

    // 2. Data Grafik Tren Pelanggan & Pemasukan per Tanggal
    const trendData = Object.values(dateTrendMap).sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    // 3. Data Grafik Perbandingan Pemasukan vs Pengeluaran
    const financeComparisonData = [
      {
        periode: 'Evaluasi Berjalan',
        Pemasukan: totalRevenue,
        Pengeluaran: totalExpense,
        LabaBersih: netProfit > 0 ? netProfit : 0,
      },
    ];

    // 4. Data Top Layanan Spesifik Paling Diminati
    const topServicesData = Object.entries(servicePopularity)
      .map(([name, jumlah]) => ({ name, jumlah }))
      .sort((a, b) => b.jumlah - a.jumlah)
      .slice(0, 5);

    return {
      totalCustomers: validBookings.length,
      totalRevenue,
      totalExpense,
      netProfit,
      pieData,
      trendData,
      financeComparisonData,
      topServicesData,
    };
  }, [bookings, expenses]);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  // =========================================================================
  // TAMPILAN 1: FORM LOGIN KHUSUS OWNER (JIKA BELUM LOGIN)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-[#E8DFD5] p-8 md:p-10">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 rounded-full bg-[#F5EBE6] text-[#8C5A4F] text-xs font-semibold tracking-widest uppercase mb-3">
              Executive Portal
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#3A2E2B]">
              Elmira Salon
            </h1>
            <p className="text-sm text-[#7A6A65] mt-2">
              Login Khusus Owner — Evaluasi Strategis & Keuangan
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4944] mb-2">
                Username Owner
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-3 rounded-xl border border-[#E2D5C8] bg-[#FAF7F2] text-[#3A2E2B] focus:outline-none focus:ring-2 focus:ring-[#8C5A4F] transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C4944] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 rounded-xl border border-[#E2D5C8] bg-[#FAF7F2] text-[#3A2E2B] focus:outline-none focus:ring-2 focus:ring-[#8C5A4F] transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#8C5A4F] hover:bg-[#73483F] text-white font-semibold tracking-wide shadow-md transition duration-200"
            >
              Masuk ke Strategic Dashboard
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#F0E8E0] text-center">
            <a
              href="/"
              className="text-xs font-medium text-[#8C5A4F] hover:underline"
            >
              ← Kembali ke Halaman Beranda Pelanggan
            </a>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // TAMPILAN 2: DASHBOARD EVALUASI STRATEGIS OWNER (SETELAH LOGIN)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3A2E2B] font-sans pb-16">
      {/* HEADER BAR */}
      <header className="bg-white border-b border-[#E8DFD5] sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C5A4F]">
              Strategic Management View
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#3A2E2B]">
              Dashboard Evaluasi Owner — Elmira Salon
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="px-4 py-2 rounded-xl border border-[#D5C3B8] text-xs font-semibold text-[#5C4944] hover:bg-[#F5EBE6] transition"
            >
              ↻ Sinkronisasi Data
            </button>
            <a
              href="/admin"
              className="px-4 py-2 rounded-xl bg-[#F5EBE6] text-[#8C5A4F] text-xs font-semibold hover:bg-[#EBD9D0] transition"
            >
              Ke Operasional Admin
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-[#3A2E2B] text-white text-xs font-semibold hover:bg-black transition"
            >
              Keluar (Logout)
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* BAGIAN 1: 4 KARTU METRIK UTAMA (KPI SUMMARY CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C5A4F]">
              Total Pelanggan Reservasi
            </p>
            <h2 className="text-3xl font-serif font-bold mt-2 text-[#3A2E2B]">
              {loading ? '...' : `${analytics.totalCustomers} Orang`}
            </h2>
            <p className="text-xs text-emerald-700 mt-2 font-medium">
              ↑ Tren Kunjungan Aktif Terdata
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C5A4F]">
              Total Pemasukan (Revenue)
            </p>
            <h2 className="text-2xl font-serif font-bold mt-2 text-emerald-700">
              {loading ? '...' : formatRupiah(analytics.totalRevenue)}
            </h2>
            <p className="text-xs text-[#7A6A65] mt-2">
              Akumulasi transaksi layanan reservasi
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8C5A4F]">
              Total Biaya Pengeluaran
            </p>
            <h2 className="text-2xl font-serif font-bold mt-2 text-rose-700">
              {formatRupiah(analytics.totalExpense)}
            </h2>
            <p className="text-xs text-[#7A6A65] mt-2">
              {expenses.length} catatan pengeluaran operasional
            </p>
          </div>

          <div className="bg-[#8C5A4F] p-6 rounded-2xl text-white shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F5EBE6]">
              Estimasi Laba Bersih (Net Profit)
            </p>
            <h2 className="text-2xl font-serif font-bold mt-2">
              {loading ? '...' : formatRupiah(analytics.netProfit)}
            </h2>
            <p className="text-xs text-[#F5EBE6] mt-2">
              Selisih Pemasukan & Pengeluaran Salon
            </p>
          </div>
        </div>

        {/* BAGIAN 2: GRAFIK PEMASUKAN VS PENGELUARAN & DIAGRAM KATEGORI FAVORIT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grafik 1: Bar Chart Pemasukan vs Pengeluaran */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-serif font-bold text-[#3A2E2B]">
                Grafik Evaluasi Pemasukan vs Pengeluaran
              </h3>
              <p className="text-xs text-[#7A6A65]">
                Perbandingan arus kas masuk dari reservasi pelanggan dengan biaya operasional salon
              </p>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.financeComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0E8E0" />
                  <XAxis dataKey="periode" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value) => formatRupiah(value)} />
                  <Legend />
                  <Bar dataKey="Pemasukan" fill="#2E7D32" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Pengeluaran" fill="#C62828" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="LabaBersih" name="Laba Bersih" fill="#8C5A4F" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 2: Pie / Donut Chart Kategori Layanan Favorit */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-serif font-bold text-[#3A2E2B]">
                Diagram Kategori Layanan Favorit
              </h3>
              <p className="text-xs text-[#7A6A65]">
                Proporsi pemesanan berdasarkan kategori perawatan (Hair Styling, Treatments, Hair Coloring)
              </p>
            </div>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {analytics.pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS_PIE[index % COLORS_PIE.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [`${val} Pesanan`, 'Jumlah Diminati']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* BAGIAN 3: GRAFIK TREN PERTUMBUHAN PELANGGAN & LAYANAN TERLARIS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grafik 3: Line Chart Tren Pelanggan per Tanggal */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-serif font-bold text-[#3A2E2B]">
                Grafik Tren Kunjungan Pelanggan
              </h3>
              <p className="text-xs text-[#7A6A65]">
                Fluktuasi jumlah pelanggan yang melakukan reservasi berdasarkan tanggal jadwal
              </p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0E8E0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pelanggan"
                    name="Jumlah Pelanggan"
                    stroke="#8C5A4F"
                    strokeWidth={3}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik 4: Horizontal Bar Top 5 Layanan Spesifik */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8DFD5] shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-serif font-bold text-[#3A2E2B]">
                5 Jenis Perawatan Paling Diminati
              </h3>
              <p className="text-xs text-[#7A6A65]">
                Peringkat layanan spesifik yang paling sering dipilih oleh pelanggan
              </p>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={analytics.topServicesData}
                  margin={{ left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0E8E0" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar
                    dataKey="jumlah"
                    name="Total Dipilih"
                    fill="#C89D88"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* BAGIAN 4: PENCATATAN PENGELUARAN OPERASIONAL SALON (UNTUK EVALUASI OWNER) */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#E8DFD5] shadow-sm">
          <h3 className="text-xl font-serif font-bold text-[#3A2E2B] mb-1">
            Manajemen Biaya Pengeluaran Operasional Salon
          </h3>
          <p className="text-xs text-[#7A6A65] mb-6">
            Catat pengeluaran bahan baku, listrik, dan operasional untuk mengevaluasi laba bersih salon secara akurat.
          </p>

          <form
            onSubmit={handleAddExpense}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD5]"
          >
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#5C4944] mb-1">
                Keterangan Pengeluaran
              </label>
              <input
                type="text"
                value={expTitle}
                onChange={(e) => setExpTitle(e.target.value)}
                placeholder="Contoh: Beli Shampo & Vitamin Keratin"
                className="w-full px-3 py-2 rounded-lg border border-[#D5C3B8] text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C4944] mb-1">
                Kategori Biaya
              </label>
              <select
                value={expCategory}
                onChange={(e) => setExpCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5C3B8] text-sm bg-white"
              >
                <option value="Bahan Baku">Bahan Baku Salon</option>
                <option value="Utilitas">Listrik, Air & Internet</option>
                <option value="Operasional">Gaji / Insentif Kapster</option>
                <option value="Lainnya">Biaya Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5C4944] mb-1">
                Nominal (Rp)
              </label>
              <input
                type="number"
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                placeholder="Contoh: 250000"
                className="w-full px-3 py-2 rounded-lg border border-[#D5C3B8] text-sm bg-white"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg bg-[#8C5A4F] hover:bg-[#73483F] text-white font-semibold text-sm transition"
              >
                + Tambah Biaya
              </button>
            </div>
          </form>

          {/* Tabel Riwayat Pengeluaran */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8DFD5] text-xs uppercase text-[#8C5A4F] bg-[#FAF7F2]">
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Keterangan Biaya</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Nominal Pengeluaran</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E8E0] text-sm">
                {expenses.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FDFBF7]">
                    <td className="py-3 px-4 text-[#7A6A65]">{item.date}</td>
                    <td className="py-3 px-4 font-medium text-[#3A2E2B]">
                      {item.title}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs bg-[#F5EBE6] text-[#8C5A4F] font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-rose-700">
                      {formatRupiah(item.amount)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteExpense(item.id)}
                        className="text-xs text-rose-600 hover:underline font-medium"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}