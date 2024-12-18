import React from 'react';

const Login = () => {
  return (
    <div>
      
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFE4C4]">
      <div className="text-center mb-4 mt-2">
        <h1 className="text-4xl font-bold">Welcome to TaalTaraang!</h1>
        <h2 className="text-2xl mt-2">Sign in</h2>
      </div>
      <div className="bg-[#FFCC99] p-8 rounded-lg shadow-lg mb-4">
        <input 
          type="email" 
          placeholder="Enter email" 
          className="block w-80 md:w-96 lg:w-[400px] p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" 
        />
        <input 
          type="password" 
          placeholder="Enter Password" 
          className="block w-80 md:w-96 lg:w-[400px] p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500" 
        />
        <button className="w-full p-3 bg-[#007BFF] text-white rounded hover:bg-[#0056B3] transition">
          Sign in
        </button>
      </div>
      <div className="mt-4">
        <p>Don't have an account yet? <a href="/signup" className="text-[#007BFF] hover:underline">Sign Up</a></p>
      </div>
    </div>
    </div>
  );
}

export default Login;