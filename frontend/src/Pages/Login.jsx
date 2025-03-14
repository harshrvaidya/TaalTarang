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
     

    if (email === "admin@gmail.com" && password === "123") {
      navigate("/admin"); // Redirect to Admin Panel
    } 
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

      if (response.status === 200) {
        toast.success('Redirecting to Dashboard...', {
          position: 'top-center',
          autoClose: 2000,
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

        dispatch(Usersetup(loggedinuser));
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.myUserid);

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.status === 400 ? 'Invalid credentials.' : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#FFE4C4] via-[#FFCC99] to-[#FFA07A] p-4">
      <ToastContainer />
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-[#A52A2A] mb-2">TaalTaraang</h1>
        <h2 className="text-xl text-gray-700 mb-6">Sign in to continue</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#A52A2A] text-white rounded-lg hover:bg-[#800000] transition-transform transform hover:-translate-y-1 shadow-md"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-gray-600 mt-4">
          Don't have an account? 
          <Link to="/signup" className="text-[#007BFF] hover:underline ml-1">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
