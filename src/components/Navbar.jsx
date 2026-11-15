import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  // [TAMBAHAN RESPONSIF HP]: State untuk buka/tutup menu Hamburger di layar HP
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper function untuk mendeteksi apakah link sedang aktif
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#FAF7F5] border-b border-[#F5EDEC] px-8 md:px-16 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm transition-all duration-300 relative">
      
      {/* Logo ELMIRA SALON dengan efek gradasi warna rose gold yang senada */}
      <Link 
        to="/" 
        className="text-xl font-serif font-bold tracking-wider bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent transition-transform duration-300 hover:scale-105"
      >
        ELMIRA SALON
      </Link>

      {/* Menu navigasi dengan penanda aktif (active indicator) - Tampil di Laptop */}
      <div className="hidden md:flex space-x-8 text-sm font-medium text-700">
        <Link 
          to="/" 
          className={`transition relative py-1 ${isActive('/') ? 'text-[#8C6D62] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8C6D62] after:rounded-full' : 'text-gray-700 hover:text-[#8C6D62]'}`}
        >
          Beranda
        </Link>
        <Link 
          to="/services" 
          className={`transition relative py-1 ${isActive('/services') ? 'text-[#8C6D62] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8C6D62] after:rounded-full' : 'text-gray-700 hover:text-[#8C6D62]'}`}
        >
          Layanan
        </Link>
        <Link 
          to="/pricing" 
          className={`transition relative py-1 ${isActive('/pricing') ? 'text-[#8C6D62] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8C6D62] after:rounded-full' : 'text-gray-700 hover:text-[#8C6D62]'}`}
        >
          Harga
        </Link>
        <Link 
          to="/about" 
          className={`transition relative py-1 ${isActive('/about') ? 'text-[#8C6D62] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8C6D62] after:rounded-full' : 'text-gray-700 hover:text-[#8C6D62]'}`}
        >
          Tentang Kami
        </Link>
      </div>

      {/* Tombol Buat Janji dengan efek hover lift up + Tombol Hamburger Khusus HP */}
      <div className="flex items-center gap-3">
        <Link 
          to="/booking" 
          className="bg-[#4A3B32] text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-[#382b24] transition-all duration-300 hover:-translate-y-0.5 shadow-sm inline-block"
        >
          Buat Janji
        </Link>

        {/* [TAMBAHAN RESPONSIF HP]: Tombol Ikon Hamburger (Hanya muncul di HP, hilang di Laptop) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#4A3B32] p-2 rounded-xl border border-[#E8D3CE] bg-white/70 hover:bg-[#E8D3CE]/40 transition focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* [TAMBAHAN RESPONSIF HP]: Panel Dropdown Menu saat tombol Hamburger diklik di HP */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FAF7F5] border-b border-[#E8D3CE] shadow-md px-8 py-4 flex flex-col space-y-3 text-sm font-medium z-50">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-2 border-b border-[#E8D3CE]/40 ${isActive('/') ? 'text-[#8C6D62] font-bold' : 'text-gray-700 hover:text-[#8C6D62]'}`}
          >
            Beranda
          </Link>
          <Link 
            to="/services" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-2 border-b border-[#E8D3CE]/40 ${isActive('/services') ? 'text-[#8C6D62] font-bold' : 'text-gray-700 hover:text-[#8C6D62]'}`}
          >
            Layanan
          </Link>
          <Link 
            to="/pricing" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-2 border-b border-[#E8D3CE]/40 ${isActive('/pricing') ? 'text-[#8C6D62] font-bold' : 'text-gray-700 hover:text-[#8C6D62]'}`}
          >
            Harga
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-2 ${isActive('/about') ? 'text-[#8C6D62] font-bold' : 'text-gray-700 hover:text-[#8C6D62]'}`}
          >
            Tentang Kami
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;