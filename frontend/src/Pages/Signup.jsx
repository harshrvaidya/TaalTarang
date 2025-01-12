import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [cloudurl, setCloudurl] = useState('');
  const mycloudname = process.env.REACT_APP_CLOUD_NAME;



  const handleImageChange = (e) => {
    const file = e.target.files[0];// get from list of mutiple images gets the first image
    if (file) { // proceed only if the file is present
      setProfilePic(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {

    //after click submit we will do 
    //1)
    e.preventDefault();
    if (!profilePic) {
      toast.error('Please upload a profile picture!');
      return;
    }
    // 2)
    const formData = new FormData()
    const uniquePublicId = `${Firstname}-${Date.now()}`;

    formData.append('file', profilePic)// key pair values
    formData.append('upload_preset', 'user_profile_preset') // the seconf is a string
    formData.append('public_id', uniquePublicId)// giving a proper name to image in cloudinary 

    //hitting the cloudinary end point ang giving it formdata that has file amd my preset
    try {
      console.log("i reached the axios post part")
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${mycloudname}/image/upload`, formData)
      console.log("axios post")
      console.log("what i recieved=", res.data)
      const cloudinaryurl = res.data.secure_url;
      setCloudurl(cloudinaryurl)

      const UserData = {
        name: `${Firstname} ${Lastname}`,
        password: password,
        email: email,
        phone_no: phone,
        profilepic: cloudinaryurl // directlt given from response from cloudinary 

      }
           try {
        const response = await axios.post("http://localhost:3001/api/users/register", UserData)
        console.log("the data has been sent to backend")
        toast.success('user regsitered')
        console.log(response.data)
          }
             catch (error) {
        console.error("Error uploading the image:", error);
        alert('Error uploading profile picture. Please try again.');
        }
    }
    catch {
      console.log()
    }


  };

  return (
    // here notice the min-h-screen class the dyanamic adding of bg colour
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFE4C4]">
     

      <div className="text-center mb-4">
      <ToastContainer />
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
            <div className="mb-4 ">
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
            onChange={(e) => { setFirstname(e.target.value) }}
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Enter last name"
            onChange={(e) => { setLastname(e.target.value) }}
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => { setPassword(e.target.value) }}
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Enter Email"
            onChange={(e) => { setEmail(e.target.value) }}
            className="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Enter phone number"
            onChange={(e) => { setPhone(e.target.value) }}
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
}


export default Signup;