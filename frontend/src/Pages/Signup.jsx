import React from 'react';

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFE4C4]">
      <div className="text-center mb-4">
        <h3 className="text-4xl font-bold mb-4">Sign up here</h3>
      </div>
      <div className="bg-[#FFCC99] p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="fields mb-4">
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
            onClick={() => alert('Hello')}
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
