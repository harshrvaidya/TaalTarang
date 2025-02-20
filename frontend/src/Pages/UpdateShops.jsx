import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate} from 'react-router-dom';

const UpdateShops = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shopName, setShopName] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [shopContact, setShopContact] = useState('');
  const [shopImage, setShopImage] = useState('');
  const myCloudName = process.env.REACT_APP_CLOUD_NAME;
useEffect(() => {
  axios.get(`http://localhost:3001/api/shops/getshop/${id}`)
  .then((response)=>{console.log(response.data)
    setShopName(response.data.shopname)
    setShopLocation(response.data.shopAddress
    )
    setShopContact(response.data.shopContact)
    setShopImage(response.data.shopImage)
  })
  .catch((error)=>{console.log(error)})
}, []
)

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setShopImage(file);
    const reader = new FileReader();
    reader.onload = () => setShopImage(reader.result);
    reader.readAsDataURL(file);
  }
};
//funct to handle if the user is update and so i need to uplaod the new image to cloudinary
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

// when the updae button is clicked 
const update = async (e) => { 
  e.preventDefault();

  try {
    // Upload shop image to Cloudinary
    const uploadedImageUrl = await uploadToCloudinary(shopImage);// calling the userdefinded function uploadtoCloudinary

    // Prepare shop data
    const formdata = {
      shopName,
      shopLocation,
      shopContact,
      shopImage: uploadedImageUrl
    };

    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    const response = await axios.put('http://localhost:3001/api/shops/updateshops/'+id, formdata, {
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



  return (
    <div>
      <h1>Update Shop Form</h1>
      <form   onSubmit={update} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
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
        {shopImage && (
          <div className="mb-4">
            <p className="text-center font-semibold mb-2">Image Preview:</p>
            <img
              src={shopImage}
              alt="Shop Preview"
              className="w-full h-auto rounded-lg mx-auto object-cover border-2 border-[#A52A2A]"
            />
          </div>
        )}
        <button type="submit" className="w-full p-3 bg-[#A52A2A] text-white rounded-lg hover:bg-[#800000] transition">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateShops;
