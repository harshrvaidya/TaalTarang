import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../../Components/AdminSidebar';

const EditUser = () => {
  const { id } = useParams(); // Get user ID from the route
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


useEffect(() => {
    axios.get(`http://localhost:3001/api/admin/users/${id}`)
    .then((response) => {
      console.log(response.data);
      const user = response.data;
      setName(user.name);
      setPhoneNumber(user.phone_no);
      setProfilePic(user.profilepic);
      setEmail(user.email);
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user details.');
    });
},[id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        `http://localhost:3001/api/admin/users/${id}`,
        { name, phone_no: phoneNumber, profilepic: profilePic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('User updated successfully!');
      setError('');
      setTimeout(() => navigate('/admin/users'), 2000); // Redirect to user management after 2 seconds
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Edit User</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                  No Image
                </div>
              )}
            </div>
            <label className="mt-3 cursor-pointer text-sm font-medium text-blue-600 hover:underline">
              Change Profile Picture
              <input type="file" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            
            />
          </div>

          {/* Email (Read-Only) */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;