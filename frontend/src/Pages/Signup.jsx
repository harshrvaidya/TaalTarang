import React, { useState } from 'react';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];// get from list of mutiple images gets the first image
    if (file) { // proceed only if the file is present
      setProfilePic(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (profilePic) {
      console.log('Profile Picture:', profilePic);
      alert('Profile Picture Uploaded Successfully');
    } else {
      alert('Please upload a profile picture!');
    }
  };

  return (
    <div className="  flex flex-col items-center justify-center h-screen bg-[#FFE4C4]">
      <div className="text-center mb-4">
        <h3 className="text-4xl font-bold mb-4">Sign up here</h3>
      </div>
      <div className="bg-[#FFCC99] p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="fields mb-4">
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
            placeholder="Enter first name"
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Enter last name"
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Enter phone number"
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          
          
        </div>
        <div className="mysubmit">
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-[#A52A2A] text-white rounded-[30px] hover:bg-[#800000] hover:translate-y-[-2px] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
