import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { Usersetup } from '../Features/Login/Loginslice';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3001/api/users/login', {
        email,
        password,
      });
      console.log("API Res from backend full ", response.data);  // Log the response to inspect the fields

      if (response.status === 200) {
        toast.success('Redirecting to Dashboard...', {
          position: 'top-center',
          autoClose: 2000, // Notification duration
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: false,
          closeOnClick: true,
        });

        const loggedinuser = {
          username: response.data.username,
          profilePic: response.data.profilePic,
          token: response.data.token,
          userId: response.data.myUserid,
        };

        dispatch(Usersetup(loggedinuser)); // Update the Redux store with the logged-in user

        // Save token and userId in localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.myUserid);

        // Redirect to Dashboard after a slight delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response && error.response.status === 400) {
        toast.error('Invalid credentials. Please check your email and password.');
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center h-screen bg-[#FFE4C4]">
        <div className="text-center mb-4 mt-2">
          <h1 className="text-4xl font-bold">Welcome to TaalTaraang!</h1>
          <h2 className="text-2xl mt-2">Sign in</h2>
        </div>
        <div className="bg-[#FFCC99] p-8 rounded-lg shadow-lg mb-4">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-80 md:w-96 lg:w-[400px] p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-80 md:w-96 lg:w-[400px] p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-[#A52A2A] text-white rounded-[30px] hover:bg-[#800000] hover:translate-y-[-2px] transition"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
        <div className="mt-4">
          <p>
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-[#007BFF] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;