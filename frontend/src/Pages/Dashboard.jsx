


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import Sidebar from '../Components/Sidebar';

const Dashboard = () => {
  const [shops, setShops] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const location = useLocation();
  const userId = useSelector((state) => state.login.myUserid);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/shops');
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError('Failed to fetch shops. Please try again later.');
      }
    };

    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
    fetchShops();
  }, [location.state?.refresh]);

  const deleteShop = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/shops/deleteshop/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShops(shops.filter((shop) => shop._id !== id));
    } catch (error) {
      console.error('Error deleting shop:', error);
      setError('Failed to delete shop. Please try again later.');
    }
  };

  const filteredShops = shops.filter((shop) => {
    const matchesSearchQuery =
      shop.shopname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.shopAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.shopContact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVerificationStatus = showVerifiedOnly ? shop.verified : true;
    return matchesSearchQuery && matchesVerificationStatus;
  });

  return (
    <div className="flex">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div
        className={`flex flex-col min-h-screen bg-gradient-to-r from-[#FFE4C4] via-[#FFCC99] to-[#FFA07A] transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } p-6 w-full`}
      >
        <h1 className="text-4xl font-extrabold text-[#A52A2A] mb-6 text-center">Dashboard</h1>

        {error && <p className="text-red-600 font-semibold text-lg text-center">{error}</p>}

        {/* Search Bar */}
        <div className="relative flex items-center max-w-3xl mx-auto w-full mb-6">
          <Search className="absolute left-4 text-gray-500" size={22} />
          <input
            type="text"
            placeholder="Search shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 w-full bg-white text-gray-800 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-center mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showVerifiedOnly}
              onChange={(e) => setShowVerifiedOnly(e.target.checked)}
              className="form-checkbox h-5 w-5 text-orange-500"
            />
            <span className="text-gray-700 font-medium">Show only verified shops</span>
          </label>
        </div>

        {/* Shop Display */}
        <div className="w-full max-w-6xl mx-auto">
          {filteredShops.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <div
                  key={shop._id}
                  className="bg-white border border-[#A52A2A] p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
                >
                  <Link to={`/shop/${shop._id}`} className="block no-underline">
                    {shop.shopImage && (
                      <img
                        src={shop.shopImage}
                        alt={shop.shopname}
                        className="w-full h-48 rounded-t-lg object-cover mb-4"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-bold mb-2 text-[#A52A2A]">{shop.shopname}</h3>
                      <p className="mb-2 text-gray-700">Location: {shop.shopAddress}</p>
                      <p className="mb-2 text-gray-700">Contact: {shop.shopContact}</p>
                      <p className="mb-2 text-gray-700">
                        Status:{' '}
                        {shop.verified ? (
                          <span className="text-green-600 font-semibold">Verified</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Not Verified</span>
                        )}
                      </p>
                      <p className="text-gray-700">
                        Added by:{' '}
                        {shop.addedBy && shop.addedBy.name ? shop.addedBy.name : 'Unknown'}
                      </p>
                    </div>
                  </Link>
                  {shop.addedBy && shop.addedBy._id === userId && (
                    <div className="mt-2 flex space-x-2">
                      <Link
                        to={`/UpdateShops/${shop._id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 no-underline"
                      >
                        Update Shop
                      </Link>
                      <button
                        onClick={() => deleteShop(shop._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                      >
                        Delete Shop
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-2xl font-semibold text-gray-700 mb-2">
                No shops found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Add Shop Button at Bottom */}
        <div className="flex justify-center mt-12">
          <Link to="/addshops">
            <button className="px-8 py-3 bg-[#A52A2A] text-white font-semibold rounded-full shadow-lg hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transition-all">
              + Add a New Shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
