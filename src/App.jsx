import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // <-- Ditambahkan: Import Link untuk tombol 404
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import ServicesPage from './components/ServicesPage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import BookingPage from './components/BookingPage';
import AdminDashboard from './components/AdminDashboard';
import MapSection from './components/MapSection'; // <-- Ditambahkan: Import MapSection
import OwnerDashboard from './components/OwnerDashboard';

// <-- DITAMBAHKAN: Komponen 404 sederhana (Biar lu ga usah repot bikin file baru) -->
const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <h1 className="text-8xl font-bold text-[#4A3B32] mb-4">404</h1>
    <h2 className="text-2xl font-semibold mb-2">Halaman Tidak Ditemukan</h2>
    <p className="mb-8">Rute URL yang lu tuju nggak terdaftar di sistem Elmira Salon.</p>
    <Link to="/" className="px-6 py-2 bg-[#4A3B32] text-white rounded-md hover:bg-[#3A2E27] transition">
      Kembali ke Beranda
    </Link>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#4A3B32] font-sans selection:bg-[#E8D3CE] selection:text-[#4A3B32]">
      <Routes>
        {/* Halaman Booking khusus (Tanpa Navbar utama & Tanpa Map) */}
        <Route path="/booking" element={<BookingPage />} />
        
        <Route path="/owner" element={<OwnerDashboard />} />

        {/* Halaman Admin khusus (Tanpa Navbar utama & Tanpa Map) */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Halaman utama publik dengan Navbar & MapSection di bawahnya */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Features />
                  <Services />
                </>
              } />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* <-- DITAMBAHKAN: Penangkap URL Ngasal (404 Not Found) ditaruh paling bawah --> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* <-- Ditambahkan: Peta Google Maps otomatis tampil di semua halaman publik (Beranda, Layanan, Harga, Tentang Kami), KECUALI Booking & Admin --> */}
            <MapSection />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;