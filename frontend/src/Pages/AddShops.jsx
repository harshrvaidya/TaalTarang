import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleMap, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 19.076,
  lng: 72.8777,
};

const AddShops = () => {
  const token = localStorage.getItem("authToken");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopContact, setShopContact] = useState("");
  const [shopImage, setShopImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [shopGoogleMap, setShopGoogleMap] = useState(defaultCenter);
  const [description, setDescription] = useState("");

  const user = useSelector((state) => state.login.myname);
  const myCloudName = process.env.REACT_APP_CLOUD_NAME;
  const navigate = useNavigate();

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

    formData.append("file", file);
    formData.append("upload_preset", "shop_image_preset");
    formData.append("public_id", uniquePublicId);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${myCloudName}/image/upload`,
      formData
    );
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopName || !shopAddress || !shopContact || !shopImage || !description) {
      alert("All fields are required!");
      return;
    }

    try {
      const uploadedImageUrl = await uploadToCloudinary(shopImage);

      const formdata = {
        shopName,
        shopAddress,
        shopGoogleMap,
        shopContact,
        shopImage: uploadedImageUrl,
        description,
      };

      await axios.post(
        "http://localhost:3001/api/shops/addshop",
        formdata,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/dashboard", { state: { refresh: true } });
    } catch (error) {
      console.error("Add Shop Error:", error);
    }
  };

  const handleMapClick = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setShopGoogleMap(newLocation);
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      setShopGoogleMap(defaultCenter);
    }
  }, []);

  return (
    <div className="min-h-screen bg-orange-300 flex flex-col items-center py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#A52A2A] mb-2">Add a New Tabla Shop</h1>
        <p className="text-lg text-gray-600">Welcome, {user}</p>
      </div>

      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700">Shop Name</label>
            <input
              type="text"
              placeholder="Tabla Paradise"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Shop Address</label>
            <input
              type="text"
              placeholder="Mumbai, India"
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Description</label>
            <textarea
              placeholder="Tell us about your shop..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Shop Contact</label>
            <input
              type="text"
              placeholder="9876543210"
              value={shopContact}
              onChange={(e) => setShopContact(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Shop Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="w-full rounded-lg shadow-sm" />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#A52A2A] text-white font-bold rounded-lg hover:bg-[#8B0000] transition-all"
          >
            Submit Shop
          </button>
        </form>

        {/* Map Section */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
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

          <div>
            <label className="text-sm font-semibold text-gray-700">Coordinates</label>
            <input
              type="text"
              readOnly
              value={`${shopGoogleMap.lat}, ${shopGoogleMap.lng}`}
              className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>

          <Link to="/dashboard">
            <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddShops;
