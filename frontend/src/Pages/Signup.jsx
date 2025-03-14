import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const myCloudName = process.env.REACT_APP_CLOUD_NAME;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    const uniquePublicId = `${firstName}-${Date.now()}`;

    formData.append('file', file);
    formData.append('upload_preset', 'user_profile_preset');
    formData.append('public_id', uniquePublicId);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${myCloudName}/image/upload`, formData);
      return res.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !phone || !profilePic) {
      toast.error('All fields are required!');
      return;
    }
    try {
      toast.info('Uploading profile picture...');
      const uploadedImageUrl = await uploadToCloudinary(profilePic);
      const userData = {
        name: `${firstName} ${lastName}`,
        password,
        email,
        phone_no: phone,
        profilepic: uploadedImageUrl,
      };
      await axios.post('http://localhost:3001/api/users/register', userData);
      toast.success('User registered successfully!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-100 to-orange-300 p-4">
      <ToastContainer />
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h3>
        <label className="block text-center font-semibold text-gray-700 mb-2">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {preview && (
          <div className="flex justify-center mb-4">
            <img src={preview} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-orange-500" />
          </div>
        )}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-transform transform hover:-translate-y-1"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
