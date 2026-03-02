

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 19.076, // Default: Mumbai
  lng: 72.8777,
};

const UpdateShops = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [shopContact, setShopContact] = useState('');
  const [shopImage, setShopImage] = useState('');
  const [shopGoogleMap, setShopGoogleMap] = useState(defaultCenter); // Stores lat & lng
  const [description, setDescription] = useState(''); // New state for description
  const myCloudName = process.env.REACT_APP_CLOUD_NAME;

  useEffect(() => {
    axios.get(`http://localhost:3001/api/shops/getshop/${id}`)
      .then((response) => {
        setShopName(response.data.shopname);
        setShopLocation(response.data.shopAddress);
        setShopContact(response.data.shopContact);
        setShopImage(response.data.shopImage);
        setShopGoogleMap(response.data.googleMapLoc || defaultCenter); // Set map location
        setDescription(response.data.description); // Set description
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShopImage(file);
      const reader = new FileReader();
      reader.onload = () => setShopImage(reader.result);
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

  const update = async (e) => {
    e.preventDefault();
    try {
      const uploadedImageUrl = await uploadToCloudinary(shopImage);
      const formdata = {
        shopName,
        shopLocation,
        shopContact,
        shopImage: uploadedImageUrl,
        googleMapLoc: shopGoogleMap, // Include map location
        description, // Include description
      };
      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:3001/api/shops/updateshops/${id}`, formdata, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard', { state: { refresh: true } });
    } catch (error) {
      console.error('Error during updating shop:', error.response ? error.response.data : error.message);
    }
  };

  const handleMapClick = (event) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setShopGoogleMap(newLocation);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#FFE4C4] via-[#FFCC99] to-[#FFA07A] p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-[#A52A2A] mb-2">TaalTaraang</h1>
        <h2 className="text-xl text-gray-700 mb-6">Update Shop Details</h2>
        <form onSubmit={update} className="space-y-4">
          <input type="text" placeholder="Shop Name" value={shopName} onChange={(e) => setShopName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input type="text" placeholder="Shop Location" value={shopLocation} onChange={(e) => setShopLocation(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <input type="text" placeholder="Shop Contact" value={shopContact} onChange={(e) => setShopContact(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          <textarea
            placeholder="Enter shop description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input type="file" onChange={handleImageChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          {shopImage && (
            <div className="mb-4">
              <p className="text-center font-semibold mb-2">Image Preview:</p>
              <img src={shopImage} alt="Shop Preview" className="w-full h-auto rounded-lg mx-auto object-cover border-2 border-[#A52A2A]" />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Location on Map
            </label>
           
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={shopGoogleMap}
                zoom={15}
                onClick={handleMapClick}
              >
                <Marker position={shopGoogleMap} />
              </GoogleMap>
            
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Selected Coordinates (Lat, Lng)
            </label>
            <input
              type="text"
              readOnly
              value={`${shopGoogleMap.lat}, ${shopGoogleMap.lng}`}
              className="block w-full p-3 mb-4 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-[#A52A2A] text-white rounded-lg hover:bg-[#800000] transition-transform transform hover:-translate-y-1 shadow-md">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateShops;


