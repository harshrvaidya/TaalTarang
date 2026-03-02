import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MainShopmangement = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3001/api/shops', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError('Failed to fetch shops.');
      }
    };

    fetchShops();
  }, []);

  const deleteShop = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shop?')) return;

    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3001/api/shops/deleteshop/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShops(shops.filter((shop) => shop._id !== id));
      alert('Shop deleted successfully!');
    } catch (error) {
      console.error('Error deleting shop:', error);
      alert('Failed to delete shop. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shop Management</h1>
      {error && <p className="text-red-600">{error}</p>}
      <button
          onClick={() => navigate('/admin/shops/add')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Shop
        </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop) => (
              <tr key={shop._id} className="border-b">
                <td className="p-4">{shop.shopname}</td>
                <td className="p-4">
                  {shop.verified ? (
                    <span className="text-green-600 font-semibold">Verified</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Not Verified</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/shops/edit/${shop._id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deleteShop(shop._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainShopmangement;