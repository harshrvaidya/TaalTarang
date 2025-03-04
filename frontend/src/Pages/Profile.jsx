import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState(""); // State to store email
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = useSelector((state) => state.login.myUserid);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const myCloudName = process.env.REACT_APP_CLOUD_NAME;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/users/getUserById/${userId}`
        );
        setName(response.data.name);
        setPhoneNumber(response.data.phone_no);
        setProfilePic(response.data.profilepic);
        setEmail(response.data.email); // Set email state
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    const uniquePublicId = `${name}-${Date.now()}`;

    formData.append("file", file);
    formData.append("upload_preset", "user_profile_preset");
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
    try {
      const uploadedImageUrl = await uploadToCloudinary(profilePic);
      const response = await axios.put(
        `http://localhost:3001/api/users/${userId}`,
        {
          name,
          phone_no: phoneNumber,
          profilepic: uploadedImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response from backend", response.data);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Profile Management
        </h1>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-400 shadow-md">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                No Image
              </div>
            )}
          </div>
          <label className="mt-3 cursor-pointer text-sm font-medium text-orange-600 hover:underline">
            Change Profile Picture
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              value={email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none"
              placeholder="Email"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200"
          >
            Update Profile
          </button>
        </form>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;