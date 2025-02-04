import React from 'react';
import logo from '../Pictures/logo.png'; // Adjust the path to your image

const Sidebar = () => {
  return (
    <div className="bg-orange-200 h-screen w-64 flex flex-col justify-between fixed">
      <div>
        <div className="flex items-center justify-center h-16 bg-orange-300">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <nav className="mt-10">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-orange-300 hover:text-white">
            Shops
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-orange-300 hover:text-white">
            Events
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-orange-300 hover:text-white">
            Gallery
          </a>
        </nav>
      </div>
      <div className="flex items-center justify-center h-16 bg-orange-300">
        <button className="text-black">
          <i className="fas fa-cog"></i> Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
