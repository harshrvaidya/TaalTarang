import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddShops = () => {
  const token1 = localStorage.getItem('authToken');
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [shopContact, setShopContact] = useState('');
  const [shopImage, setShopImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Replace with actual authentication logic
  const user = useSelector((state) => state.login.myname); // Access user's name from Redux state
  const myCloudName = process.env.REACT_APP_CLOUD_NAME;
  const navigate = useNavigate(); // Hook for navigation

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShopImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    const uniquePublicId = `${shopName}-${Date.now()}`;

    formData.append('file', file);
    formData.append('upload_preset', 'shop_image_preset');
    formData.append('public_id', uniquePublicId);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${myCloudName}/image/upload`, formData);
      return res.data.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Image upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!shopName || !shopLocation || !shopContact || !shopImage) {
      alert('All fields are required!');
      return;
    }

    try {
      // Upload shop image to Cloudinary
      const uploadedImageUrl = await uploadToCloudinary(shopImage);

      // Prepare shop data
      const formdata = {
        shopName,
        shopLocation,
        shopContact,
        shopImage: uploadedImageUrl
      };

      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      const response = await axios.post('http://localhost:3001/api/shops/addshop', formdata, {
        headers: {
          Authorization: `Bearer ${token}` // Send token with request
        }
      });
      console.log(response.data);

      // Navigate to dashboard and refresh shop list
      navigate('/dashboard', { state: { refresh: true } });
    } catch (error) {
      console.error('Error during adding shop:', error.response ? error.response.data : error.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login page if not authenticated
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFE4C4]">
      <h1 className="text-4xl font-bold mb-4">Add Shops</h1>
      <h2 className="text-xl mb-4">You are logged in as {user}</h2>
      <h2 className="text-xl mb-4">token is  {token1}</h2>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopName">
            Shop Name
          </label>
          <input 
            type="text" 
            id="shopName"
            placeholder="Enter shop name" 
            value={shopName}
            onChange={(e) => setShopName(e.target.value)} 
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopLocation">
            Shop Location
          </label>
          <input 
            type="text" 
            id="shopLocation"
            placeholder="Enter shop location" 
            value={shopLocation}
            onChange={(e) => setShopLocation(e.target.value)} 
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopContact">
            Shop Contact
          </label>
          <input 
            type="text" 
            id="shopContact"
            placeholder="Enter shop contact" 
            value={shopContact}
            onChange={(e) => setShopContact(e.target.value)} 
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shopImage">
            Shop Image
          </label>
          <input 
            type="file" 
            id="shopImage"
            placeholder="Upload shop image" 
            onChange={handleImageChange} 
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        {preview && (
          <div className="mb-4">
            <p className="text-center font-semibold mb-2">Image Preview:</p>
            <img
              src={preview}
              alt="Shop Preview"
              className="w-full h-auto rounded-lg mx-auto object-cover border-2 border-[#A52A2A]"
            />
          </div>
        )}
        <button type="submit" className="w-full p-3 bg-[#A52A2A] text-white rounded-lg hover:bg-[#800000] transition">
          Add shop
        </button>
      </form>
      <Link to="/dashboard">
        <button className="mt-4 px-6 py-2 bg-[#A52A2A] text-white font-semibold rounded-lg shadow-md hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75">
          Go to Dashboard
        </button>
      </Link>
    </div>
  )
}

export default AddShops;
