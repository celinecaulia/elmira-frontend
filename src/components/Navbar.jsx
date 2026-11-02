import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Helper function untuk mendeteksi apakah link sedang aktif
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#FAF7F5] border-b border-[#F5EDEC] px-8 md:px-16 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm transition-all duration-300">
      
      {/* Logo ELMIRA SALON dengan efek gradasi warna rose gold yang senada */}
      <Link 
        to="/" 
        className="text-xl font-serif font-bold tracking-wider bg-gradient-to-r from-[#4A3B32] via-[#8C6D62] to-[#D4B5B0] bg-clip-text text-transparent transition-transform duration-300 hover:scale-105"
      >
        ELMIRA SALON
      </Link>

      {/* Menu navigasi dengan penanda aktif (active indicator) */}
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

      {/* Tombol Buat Janji dengan efek hover lift up */}
      <div>
        <Link 
          to="/booking" 
          className="bg-[#4A3B32] text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-[#382b24] transition-all duration-300 hover:-translate-y-0.5 shadow-sm inline-block"
        >
          Buat Janji
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;