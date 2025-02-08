import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar'; // Ensure this path is correct

const Dashboard = () => {
  const [shops, setShops] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const location = useLocation(); // Hook to get location state

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
  }, [location.state?.refresh]); // Re-fetch shops when navigated to with refresh state

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFE4C4] w-full ml-64 p-4 overflow-y-auto">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-xl mb-4">Token: {token}</h2> {/* Display the token */}
        {error && <p className="text-red-700">{error}</p>} {/* Display error message */}
        <h2 className="text-2xl font-semibold mb-4">Added Shops</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {shops.map((shop) => (
            <div key={shop._id} className="bg-white border border-[#A52A2A] p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105">
              {shop.shopImage && <img src={shop.shopImage} alt={shop.shopname} className="w-full h-48 rounded-t-lg object-cover mb-4" />}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-[#A52A2A]">{shop.shopname}</h3>
                <p className="mb-2 text-gray-700">Location: {shop.shopAddress}</p>
                <p className="mb-2 text-gray-700">Contact: {shop.shopContact}</p>
                <p className="text-gray-700">Added by: {shop.addedBy && shop.addedBy.name ? shop.addedBy.name : 'Unknown'}</p> {/* Check if addedBy exists and has a name */}
              </div>
            </div>
          ))}
        </div>
        <Link to="/addshops">
          <button className="mt-4 px-6 py-2 bg-[#A52A2A] text-white font-semibold rounded-lg shadow-md hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75">
            Add a New Shop
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
