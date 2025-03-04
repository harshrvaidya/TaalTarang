import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-orange-200 text-gray-800 py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Logo / Brand Name */}
        <div className="text-lg font-semibold text-gray-700">
          TaalTaraang
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 mt-3 md:mt-0">
          <Link to="/dashboard" className="text-gray-600 hover:text-orange-500 transition duration-300">Dashboard</Link>
          <Link to="/" className="text-gray-600 hover:text-orange-500 transition duration-300">Socials</Link>
          <Link to="/" className="text-gray-600 hover:text-orange-500 transition duration-300">Events</Link>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
