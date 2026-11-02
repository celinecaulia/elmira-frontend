import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F5] text-[#4A3B32] font-sans selection:bg-[#E8D3CE] selection:text-[#4A3B32]">
      <Routes>
        {/* Halaman Booking khusus (Tanpa Navbar utama & Tanpa Map) */}
        <Route path="/booking" element={<BookingPage />} />

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