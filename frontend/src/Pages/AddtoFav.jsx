import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddToFav = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/shops/favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorite shops:', error);
        setError('Failed to fetch favorite shops. Please try again later.');
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFromFavorites = async (shopId) => {
    try {
      await axios.delete(`http://localhost:3001/api/shops/favorite/${shopId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setFavorites(favorites.filter((shop) => shop._id !== shopId));
      alert('Shop removed from favorites!');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      setError('Failed to remove shop from favorites. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-orange-300 text-white shadow-md">
        <h1 className="text-2xl font-bold">TaalTaraang</h1>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700"
        >
          Back to Dashboard
        </Link>
      </nav>

      <h1 className="text-4xl font-bold text-center text-orange-700 my-6">My Favorite Shops</h1>

      {error && <p className="text-red-700 text-center mt-6">{error}</p>}

      {!favorites.length ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-2xl font-semibold text-gray-700 mb-4">You have no favorite shops yet.</p>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700"
          >
            Explore Shops
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {favorites.map((shop) => (
            <div key={shop._id} className="bg-white border border-orange-500 p-6 rounded-lg shadow-lg">
              <img src={shop.shopImage} alt={shop.shopname} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold text-orange-700">{shop.shopname}</h3>
              <p className="text-gray-700">Location: {shop.shopAddress}</p>
              <p className="text-gray-700">Contact: {shop.shopContact}</p>
              <Link
                to={`/shop/${shop._id}`}
                className="mt-4 inline-block px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700"
              >
                View Details
              </Link>
              <button
                onClick={() => handleRemoveFromFavorites(shop._id)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddToFav;