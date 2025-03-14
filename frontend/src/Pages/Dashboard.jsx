// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Sidebar from '../Components/Sidebar';

// const Dashboard = () => {
//   const [shops, setShops] = useState([]);
//   const [token, setToken] = useState('');
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState(''); // State to store search query
//   const [sidebarVisible, setSidebarVisible] = useState(true); // State to manage sidebar visibility
//   const location = useLocation(); // Hook to get location state
//   const userId = useSelector((state) => state.login.myUserid); // Get logged-in user's ID from Redux store

//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/shops');
//         setShops(response.data);
//       } catch (error) {
//         console.error('Error fetching shops:', error);
//         setError('Failed to fetch shops. Please try again later.');
//       }
//     };

//     const storedToken = localStorage.getItem('authToken');
//     setToken(storedToken);
//     fetchShops();
//   }, [location.state?.refresh]); // Re-fetch shops when navigated to with refresh state

//   const deleteShop = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/api/shops/deleteshop/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setShops(shops.filter(shop => shop._id !== id));
//     } catch (error) {
//       console.error('Error deleting shop:', error);
//       setError('Failed to delete shop. Please try again later.');
//     }
//   };

//   // Filter shops based on search query
//   const filteredShops = shops.filter(shop =>
//     shop.shopname.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     shop.shopAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     shop.shopContact.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="flex">
//       {sidebarVisible && <Sidebar />}
//       <div className={`flex flex-col items-center justify-center min-h-screen bg-[#FFE4C4] ${sidebarVisible ? 'w-full ml-64' : 'w-full'} p-4 overflow-y-auto`}>
//         <button
//           onClick={() => setSidebarVisible(!sidebarVisible)}
//           className="mb-4 px-4 py-2 bg-[#A52A2A] text-white font-semibold rounded-lg shadow-md hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
//         >
//           {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
//         </button>
//         <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
//         <h2 className="text-xl mb-4">Token: {token}</h2> {/* Display the token */}
//         {error && <p className="text-red-700">{error}</p>} {/* Display error message */}
//         <h2 className="text-2xl font-semibold mb-4">Added Shops</h2>
        
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search shops by name, location, or phone number"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded"
//         />

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
//           {filteredShops.map((shop) => (
//             <div
//               key={shop._id}
//               className="bg-white border border-[#A52A2A] p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
//             >
//               {shop.shopImage && <img src={shop.shopImage} alt={shop.shopname} className="w-full h-48 rounded-t-lg object-cover mb-4" />}
//               <div className="p-4">
//                 <h3 className="text-xl font-bold mb-2 text-[#A52A2A]">{shop.shopname}</h3>
//                 <p className="mb-2 text-gray-700">Location: {shop.shopAddress}</p>
//                 <p className="mb-2 text-gray-700">Contact: {shop.shopContact}</p>
//                 <p className="text-gray-700">Added by: {shop.addedBy && shop.addedBy.name ? shop.addedBy.name : 'Unknown'}</p> {/* Check if addedBy exists and has a name */}
//                 {shop.addedBy && shop.addedBy._id === userId && (
//                   <>
//                     <Link to={`/UpdateShops/${shop._id}`} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
//                       Update Shop
//                     </Link>
//                     <button onClick={() => deleteShop(shop._id)} className="mt-2 ml-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">
//                       Delete Shop
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         <Link to="/addshops">
//           <button className="mt-4 px-6 py-2 bg-[#A52A2A] text-white font-semibold rounded-lg shadow-md hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75">
//             Add a New Shop
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import Sidebar from '../Components/Sidebar';

const Dashboard = () => {
  const [shops, setShops] = useState([]);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const userId = useSelector((state) => state.login.myUserid);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/shops');
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError('Failed to fetch shops. Please try again later.');
      }
    };

    const storedToken = localStorage.getItem('authToken');
    setToken(storedToken);
    fetchShops();
  }, [location.state?.refresh]);

  const deleteShop = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/shops/deleteshop/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShops(shops.filter(shop => shop._id !== id));
    } catch (error) {
      console.error('Error deleting shop:', error);
      setError('Failed to delete shop. Please try again later.');
    }
  };

  const filteredShops = shops.filter((shop) =>
    shop.shopname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.shopAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shop.shopContact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar isCollapsed={sidebarCollapsed} toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className={`flex flex-col min-h-screen bg-gradient-to-r from-[#FFE4C4] via-[#FFCC99] to-[#FFA07A] transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} p-6`}>
        
        <h1 className="text-4xl font-extrabold text-[#A52A2A] mb-6 text-center">Dashboard</h1>

        {error && <p className="text-red-600 font-semibold text-lg text-center">{error}</p>}

        <div className="relative flex items-center mb-6 w-full max-w-xl mx-auto">
          <Search className="absolute left-4 text-gray-500" size={22} />
          <input
            type="text"
            placeholder="Search shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 w-full bg-white text-gray-800 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
          />
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
          {filteredShops.map((shop) => (
            <Link 
              to={`/shop/${shop._id}`} 
              key={shop._id} 
              className="bg-white border border-gray-300 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl no-underline"
              style={{ textDecoration: 'none' }}
            >
              
              {shop.shopImage && (
                <img src={shop.shopImage} alt={shop.shopname} className="w-full h-48 rounded-lg object-cover mb-4" />
              )}

              <div>
                <h3 className="text-2xl font-bold mb-2 text-[#A52A2A]">{shop.shopname}</h3>
                <p className="mb-2 text-gray-700">📍 Location: {shop.shopAddress}</p>
                <p className="mb-2 text-gray-700">📞 Contact: {shop.shopContact}</p>
                <p className="text-gray-600">👤 Added by: {shop.addedBy && shop.addedBy.name ? shop.addedBy.name : 'Unknown'}</p>

                {shop.addedBy && shop.addedBy._id === userId && (
                  <div className="mt-3 flex space-x-3">
                    <Link to={`/UpdateShops/${shop._id}`} className="px-4 py-2 bg-[#007BFF] text-white font-medium rounded-lg shadow-md hover:bg-[#0056b3] transition-all">
                      Update
                    </Link>
                    <button onClick={() => deleteShop(shop._id)} className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-[#800000] transition-all">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div> */}


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
  {filteredShops.map((shop) => (
    <div
      key={shop._id}
      className="bg-white border border-[#A52A2A] p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <Link to={`/shop/${shop._id}`} className="block no-underline">
        {shop.shopImage && (
          <img
            src={shop.shopImage}
            alt={shop.shopname}
            className="w-full h-48 rounded-t-lg object-cover mb-4"
          />
        )}
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 text-[#A52A2A]">
            {shop.shopname}
          </h3>
          <p className="mb-2 text-gray-700">Location: {shop.shopAddress}</p>
          <p className="mb-2 text-gray-700">Contact: {shop.shopContact}</p>
          <p className="text-gray-700">
            Added by: {shop.addedBy && shop.addedBy.name ? shop.addedBy.name : 'Unknown'}
          </p>
        </div>
      </Link>
      {shop.addedBy && shop.addedBy._id === userId && (
        <div className="mt-2 flex space-x-2">
          <Link
            to={`/UpdateShops/${shop._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 no-underline"
          >
            Update Shop
          </Link>
          <button
            onClick={() => deleteShop(shop._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
          >
            Delete Shop
          </button>
        </div>
      )}
    </div>
  ))}
</div>

        <div className="flex justify-center mt-8">
          <Link to="/addshops">
            <button className="px-6 py-3 bg-[#A52A2A] text-white font-semibold rounded-lg shadow-md hover:bg-[#800000] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transition-all">
              + Add a New Shop
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
