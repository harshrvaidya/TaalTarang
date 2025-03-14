
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const mapContainerStyle = {
//   width: "100%",
//   height: "300px",
// };

// const defaultCenter = {
//   lat: 19.076, // Default: Mumbai
//   lng: 72.8777,
// };

// const AddShops = () => {
//   const token1 = localStorage.getItem("authToken");
//   const [shopName, setShopName] = useState("");
//   const [shopAddress, setShopAddress] = useState("");
//   const [shopContact, setShopContact] = useState("");
//   const [shopImage, setShopImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [shopGoogleMap, setShopGoogleMap] = useState(defaultCenter); // Stores lat & lng

//   const user = useSelector((state) => state.login.myname);
//   const myCloudName = process.env.REACT_APP_CLOUD_NAME;
//   // const GoogleApi=process.env.REACT_APP_GOOGLE_API_KEY;

  
//   const navigate = useNavigate();
 
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setShopImage(file);
//       const reader = new FileReader();
//       reader.onload = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     const uniquePublicId = `${shopName}-${Date.now()}`;

//     formData.append("file", file);
//     formData.append("upload_preset", "shop_image_preset");
//     formData.append("public_id", uniquePublicId);

//     try {
//       const res = await axios.post(
//         `https://api.cloudinary.com/v1_1/${myCloudName}/image/upload`,
//         formData
//       );
//       return res.data.secure_url;
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//       throw new Error("Image upload failed.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!shopName || !shopAddress || !shopContact || !shopImage) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       const uploadedImageUrl = await uploadToCloudinary(shopImage);

//       const formdata = {
//         shopName,
//         shopAddress,
//         shopGoogleMap, // Stores { lat, lng }
//         shopContact,
//         shopImage: uploadedImageUrl,
//       };
//       console.log("🚀 Sending Data to Backend:", formdata);

//       const token = localStorage.getItem("authToken");
//       const response = await axios.post(
//         "http://localhost:3001/api/shops/addshop",
//         formdata,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data);
//       navigate("/dashboard", { state: { refresh: true } });
//     } catch (error) {
//       console.error(
//         "Error during adding shop:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   const handleMapClick = (event) => {
//     if (event.latLng) {
//       const newLocation = {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       };
  
//       console.log("📌 New Map Location Selected:", newLocation); // ✅ Debug log
//       setShopGoogleMap(newLocation);
//     } else {
//       console.error("❌ Google Maps event missing latLng:", event);
//     }
//   };
  

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFE4C4]">
//       <h1 className="text-4xl font-bold mb-4">Add Shops</h1>
//       <h2 className="text-xl mb-4">You are logged in as {user}</h2>
//       <h2 className="text-xl mb-4">Token: {token1}</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
//       >
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Shop Name
//           </label>
//           <input
//             type="text"
//             placeholder="Enter shop name"
//             value={shopName}
//             onChange={(e) => setShopName(e.target.value)}
//             className="block w-full p-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Shop Address
//           </label>
//           <input
//             type="text"
//             placeholder="Enter shop address"
//             value={shopAddress}
//             onChange={(e) => setShopAddress(e.target.value)}
//             className="block w-full p-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Select Location on Map
//           </label>
// <LoadScript googleMapsApiKey="AIzaSyCdwrEOVFTOFZtN7sqHXS5P6FtIoWvxxWw">

//             <GoogleMap
//               mapContainerStyle={mapContainerStyle}
//               center={shopGoogleMap}
//               zoom={15}
//               onClick={handleMapClick}
//             >
//               <Marker position={shopGoogleMap} />
//             </GoogleMap>
//           </LoadScript>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Selected Coordinates (Lat, Lng)
//           </label>
//           <input
//             type="text"
//             readOnly
//             value={`${shopGoogleMap.lat}, ${shopGoogleMap.lng}`}
//             className="block w-full p-3 mb-4 border border-gray-300 rounded bg-gray-100"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Shop Contact
//           </label>
//           <input
//             type="text"
//             placeholder="Enter shop contact"
//             value={shopContact}
//             onChange={(e) => setShopContact(e.target.value)}
//             className="block w-full p-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Shop Image
//           </label>
//           <input
//             type="file"
//             onChange={handleImageChange}
//             className="block w-full p-3 mb-4 border border-gray-300 rounded"
//           />
//         </div>

//         {preview && (
//           <div className="mb-4">
//             <p className="text-center font-semibold mb-2">Image Preview:</p>
//             <img
//               src={preview}
//               alt="Shop Preview"
//               className="w-full h-auto rounded-lg object-cover border-2 border-[#A52A2A]"
//             />
//           </div>
//         )}

//         <button type="submit" className="w-full p-3 bg-[#A52A2A] text-white rounded-lg hover:bg-[#800000]">
//           Add Shop
//         </button>
//       </form>

//       <Link to="/dashboard">
//         <button className="mt-4 px-6 py-2 bg-[#A52A2A] text-white font-semibold rounded-lg">
//           Go to Dashboard
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default AddShops;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 19.076, // Default: Mumbai
  lng: 72.8777,
};

const AddShops = () => {
  const token1 = localStorage.getItem("authToken");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopContact, setShopContact] = useState("");
  const [shopImage, setShopImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [shopGoogleMap, setShopGoogleMap] = useState(defaultCenter); // Stores lat & lng

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

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${myCloudName}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopName || !shopAddress || !shopContact || !shopImage) {
      alert("All fields are required!");
      return;
    }

    try {
      const uploadedImageUrl = await uploadToCloudinary(shopImage);

      const formdata = {
        shopName,
        shopAddress,
        shopGoogleMap, // Stores { lat, lng }
        shopContact,
        shopImage: uploadedImageUrl,
      };
      console.log("🚀 Sending Data to Backend:", formdata);

      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3001/api/shops/addshop",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate("/dashboard", { state: { refresh: true } });
    } catch (error) {
      console.error(
        "Error during adding shop:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleMapClick = (event) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      console.log("📌 New Map Location Selected:", newLocation); // ✅ Debug log
      setShopGoogleMap(newLocation);
    } else {
      console.error("❌ Google Maps event missing latLng:", event);
    }
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      setShopGoogleMap(defaultCenter);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFE4C4]">
      <h1 className="text-4xl font-bold mb-4">Add Shops</h1>
      <h2 className="text-xl mb-4">You are logged in as {user}</h2>
      <h2 className="text-xl mb-4">Token: {token1}</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Shop Name
          </label>
          <input
            type="text"
            placeholder="Enter shop name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Shop Address
          </label>
          <input
            type="text"
            placeholder="Enter shop address"
            value={shopAddress}
            onChange={(e) => setShopAddress(e.target.value)}
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Shop Contact
          </label>
          <input
            type="text"
            placeholder="Enter shop contact"
            value={shopContact}
            onChange={(e) => setShopContact(e.target.value)}
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Shop Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full p-3 mb-4 border border-gray-300 rounded"
          />
        </div>

        {preview && (
          <div className="mb-4">
            <p className="text-center font-semibold mb-2">Image Preview:</p>
            <img
              src={preview}
              alt="Shop Preview"
              className="w-full h-auto rounded-lg object-cover border-2 border-[#A52A2A]"
            />
          </div>
        )}

        <button type="submit" className="w-full p-3 bg-[#A52A2A] text-white rounded-lg hover:bg-[#800000]">
          Add Shop
        </button>
      </form>

      <Link to="/dashboard">
        <button className="mt-4 px-6 py-2 bg-[#A52A2A] text-white font-semibold rounded-lg">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default AddShops;




