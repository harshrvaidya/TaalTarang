import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../Pictures/logo.png';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const userId = useSelector((state) => state.login.myUserid);

  return (
    <div className={`bg-orange-100 h-screen transition-all duration-300 shadow-md ${isCollapsed ? 'w-16' : 'w-64'} fixed flex flex-col`}>
      {/* Sidebar Toggle Button */}
      <button 
        onClick={toggleSidebar} 
        className="absolute top-5 left-[100%] transform -translate-x-1/2 bg-orange-500 text-white p-2 rounded-full shadow-sm hover:bg-orange-600 transition duration-300 z-50"
      >
        {isCollapsed ? '☰' : '✕'}
      </button>

      {/* Sidebar Content */}
      {!isCollapsed && (
        <div className="flex flex-col h-screen">
          
          {/* Logo Section */}
          <div className="flex items-center justify-center h-16 bg-orange-200 border-b">
            <img src={logo} alt="TaalTaraang" className="h-8" />
          </div>

          {/* Navigation Links - Moved to the Top */}
          <nav className="mt-4 px-4">
            <Link 
              to="#" 
              className="block py-2 text-gray-700 text-sm font-medium rounded-md transition duration-200 hover:bg-orange-300 px-3"
            >
              Shops
            </Link>
            <Link 
              to="/marketplace" 
              className="block py-2 text-gray-700 text-sm font-medium rounded-md transition duration-200 hover:bg-orange-300 px-3"
            >
              Marketplace
            </Link>
            <Link 
              to="#" 
              className="block py-2 text-gray-700 text-sm font-medium rounded-md transition duration-200 hover:bg-orange-300 px-3"
            >
              Gallery
            </Link>

            <Link 
              to="/" 
              className="block py-2 text-gray-700 text-sm font-medium rounded-md transition duration-200 hover:bg-orange-300 px-3"
            >
           LandingPage
            </Link>
          </nav>

          {/* Push Profile Section to Bottom */}
          <div className="mt-auto flex items-center justify-center h-14 bg-orange-200 border-t">
            <Link 
              to={`/profile/${userId}`} 
              className="text-gray-700 text-sm font-medium hover:text-orange-600 transition duration-200"
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
