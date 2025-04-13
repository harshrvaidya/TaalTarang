import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 19.076, // Default: Mumbai
  lng: 72.8777,
};

const Editshop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [shopContact, setShopContact] = useState('');
  const [shopImage, setShopImage] = useState('');
  const [shopGoogleMap, setShopGoogleMap] = useState(defaultCenter); // Stores lat & lng
  const [description, setDescription] = useState('');
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const myCloudName = process.env.REACT_APP_CLOUD_NAME;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/shops/getshop/${id}`)
      .then((response) => {
        setShopName(response.data.shopname);
        setShopLocation(response.data.shopAddress);
        setShopContact(response.data.shopContact);
        setShopImage(response.data.shopImage);
        setShopGoogleMap(response.data.googleMapLoc || defaultCenter); // Set map location
        setDescription(response.data.description);
        setVerifiedStatus(response.data.verified);
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
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${myCloudName}/image/upload`,
        formData
      );
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

      // // Upload the image to Cloudinary if it's a new file
      // if (typeof shopImage === 'object') {
      //   uploadedImageUrl = await uploadToCloudinary(shopImage);
      // }

      const formdata = {
        shopName,
        shopLocation,
        shopContact,
        shopImage: uploadedImageUrl,
        googleMapLoc: shopGoogleMap, // Include map location
        description,
        verified: verifiedStatus,
      };

      const token = localStorage.getItem('authToken');
      await axios.put(`http://localhost:3001/api/admin/shops/${id}`, formdata, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/admin/ShopManagement', { state: { refresh: true } });
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Shop</h1>
      <form onSubmit={update} className="space-y-6">
        {/* Shop Name */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter shop name"
            required
          />
        </div>

        {/* Shop Location */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Shop Location</label>
          <input
            type="text"
            value={shopLocation}
            onChange={(e) => setShopLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter shop location"
            required
          />
        </div>

        {/* Shop Contact */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Shop Contact</label>
          <input
            type="text"
            value={shopContact}
            onChange={(e) => setShopContact(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter shop contact"
            required
          />
        </div>
        {/* shop description */}
        <textarea
            placeholder="Enter shop description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

        {/* Shop Image */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Shop Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full border border-gray-300 rounded-lg p-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {/* {shopImage && (
            <div className="mb-4">
              <p className="text-center font-semibold mb-2">Image Preview:</p>
              <img
                src={typeof shopImage === 'string' ? shopImage : preview}
                alt="Shop Preview"
                className="w-full h-auto rounded-lg mx-auto object-cover border-2 border-[#A52A2A]"
              />

            </div>
          )} */}

{shopImage && (
            <div className="mb-4">
              <p className="text-center font-semibold mb-2">Image Preview:</p>
              <img src={shopImage} alt="Shop Preview" className="w-full h-auto rounded-lg mx-auto object-cover border-2 border-[#A52A2A]" />
            </div>
          )}
        </div>

        {/* Map Section */}
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

        {/* Selected Coordinates */}
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

        {/* Verified Status */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Verified Status</label>
          <select
            value={verifiedStatus}
            onChange={(e) => setVerifiedStatus(e.target.value === 'true')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="false">Not Verified</option>
            <option value="true">Verified</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#A52A2A] text-white rounded-lg hover:bg-[#800000] transition-transform transform hover:-translate-y-1 shadow-md"
        >
          Update Shop
        </button>
      </form>
    </div>
  );
};

export default Editshop;