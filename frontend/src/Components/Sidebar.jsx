
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Features/Login/Loginslice'; // Import the logout action
import logo from '../Pictures/logo.png';
const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const userId = useSelector((state) => state.login.myUserid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className={`bg-[#FFCC99] h-screen transition-all duration-300 shadow-md ${isCollapsed ? 'w-16' : 'w-64'} fixed flex flex-col`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-5 left-[100%] transform -translate-x-1/2 bg-[#A52A2A] text-white p-2 rounded-full shadow-sm hover:bg-[#800000] transition duration-300 z-50"
      >
        {isCollapsed ? '☰' : '✕'}
      </button>

      {/* Sidebar Content */}
      {!isCollapsed && (
        <div className="flex flex-col h-screen">
          {/* Logo Text */}
          <div className="flex items-center justify-center h-16 bg-[#FFA07A] border-b">
            <h1 className="text-2xl font-bold text-[#A52A2A]">TaalTarang</h1>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 px-4">
            <Link
              to="#"
              className="block py-2 text-[#A52A2A] text-sm font-medium rounded-md transition duration-200 hover:bg-[#FFCC99] px-3"
              style={{ textDecoration: 'none' }}
            >
              Shops
            </Link>
            <Link
              to="/marketplace"
              className="block py-2 text-[#A52A2A] text-sm font-medium rounded-md transition duration-200 hover:bg-[#FFCC99] px-3"
              style={{ textDecoration: 'none' }}
            >
              Marketplace
            </Link>
            <Link
              to="/Beatclassify"
              className="block py-2 text-[#A52A2A] text-sm font-medium rounded-md transition duration-200 hover:bg-[#FFCC99] px-3"
              style={{ textDecoration: 'none' }}
            >
              ML Beat Classifier
            </Link>
            <Link
              to="/favorites"
              className="block py-2 text-[#A52A2A] text-sm font-medium rounded-md transition duration-200 hover:bg-[#FFCC99] px-3"
              style={{ textDecoration: 'none' }}
            >
             Favourite
            </Link>
            <Link
              to="/order-history"
              className="block py-2 text-[#A52A2A] text-sm font-medium rounded-md transition duration-200 hover:bg-[#FFCC99] px-3"
              style={{ textDecoration: 'none' }}
            >
              Payment History
            </Link>
          </nav>

          {/* Profile Section */}
          <div className="mt-auto flex flex-col items-center justify-center h-20 bg-[#FFA07A] border-t">
            <Link
              to={`/profile/${userId}`}
              className="text-[#A52A2A] text-sm font-medium hover:text-[#800000] transition duration-200 mb-2"
              style={{ textDecoration: 'none' }}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
