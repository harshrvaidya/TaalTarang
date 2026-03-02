// import React from 'react'

// const Welcome = () => {
//   return (
//     <div>
   
//       welcome admin 
//     </div>
//   )
// }

// export default Welcome
import React from 'react';

const Welcome = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome, Admin</h1>
        <p className="text-lg text-gray-600">Manage your dashboard with ease and control.</p>
      </div>
    </div>
  );
};

export default Welcome;
