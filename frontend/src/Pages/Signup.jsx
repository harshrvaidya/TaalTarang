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
  const [cloudUrl, setCloudUrl] = useState('');
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
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Image upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !password || !phone || !profilePic) {
      toast.error('All fields are required!');
      return;
    }

    try {
      // Upload profile picture to Cloudinary
      toast.info('Uploading profile picture...');
      const uploadedImageUrl = await uploadToCloudinary(profilePic);
      setCloudUrl(uploadedImageUrl);

      // Prepare user data
      const userData = {
        name: `${firstName} ${lastName}`,
        password,
        email,
        phone_no: phone,
        profilepic: uploadedImageUrl,
      };

      // Send user data to backend
      const res = await axios.post('http://localhost:3001/api/users/register', userData);
      toast.success('User registered successfully!');
      console.log('Backend response:', res.data);
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
      if (error.response) {
        const { status } = error.response;

        if (status === 409) {
          // Custom toast for user already exists
          toast.error('The user already exists. Please try logging in.');
        }
      }
    };
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFE4C4]">
      <ToastContainer />
      <div className="text-center mb-4">
        <h3 className="text-4xl font-bold mb-4">Sign Up Here</h3>
      </div>
      <div className="bg-[#FFCC99] p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-center text-red-700">Choose your profile picture</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {preview && (
          <div className="mb-4">
            <p className="text-center font-semibold mb-2">Image Preview:</p>
            <img
              src={preview}
              alt="Profile Preview"
              className="w-36 h-36 rounded-full mx-auto object-cover border-2 border-[#A52A2A]"
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-[#A52A2A] text-white rounded-[30px] hover:bg-[#800000] hover:translate-y-[-2px] transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Signup;
