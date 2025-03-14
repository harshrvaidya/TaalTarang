import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const userId = useSelector((state) => state.login.myUserid);
  const GoogleApi = process.env.REACT_APP_GOOGLE_API_KEY;

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/shops/getshop/${id}`);
        setShop(response.data);
      } catch (error) {
        console.error('Error fetching shop:', error);
        setError('Failed to fetch shop details. Please try again later.');
      }
    };

    fetchShop();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/shops/like/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setShop(response.data);
    } catch (error) {
      console.error('Error liking shop:', error);
      setError('Failed to like shop. Please try again later.');
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/shops/unlike/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setShop(response.data);
    } catch (error) {
      console.error('Error unliking shop:', error);
      setError('Failed to unlike shop. Please try again later.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/shops/comment/${id}`, { text: comment }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setShop(response.data);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment. Please try again later.');
    }
  };

  if (error) {
    return <p className="text-red-700">{error}</p>;
  }

  if (!shop) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
      <header className="w-full bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Shop Details</h1>
          <nav>
            <Link to="/" className="mr-4 text-blue-600 hover:text-blue-800">Home</Link>
            <Link to="/dashboard" className="mr-4 text-blue-600 hover:text-blue-800">Dashboard</Link>
            <Link to="/about" className="text-blue-600 hover:text-blue-800">About</Link>
          </nav>
        </div>
      </header>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl mt-6">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">{shop.shopName}</h1>
        <img src={shop.shopImage} alt={shop.shopName} className="w-full h-auto rounded-lg mb-4 object-cover" style={{ maxHeight: '300px' }} />

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <p className="text-lg mb-2 text-gray-700"><strong>Location:</strong> {shop.shopAddress}</p>
          <p className="text-lg mb-2 text-gray-700"><strong>Contact:</strong> {shop.shopContact}</p>
          <p className="text-lg mb-2 text-gray-700"><strong>Added by:</strong> {shop.addedBy && shop.addedBy.name ? shop.addedBy.name : 'Unknown'}</p>
        </div>

        {/* Google Maps Embed */}
        {shop.googleMapLoc && shop.googleMapLoc.lat && shop.googleMapLoc.lng && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Shop Location</h2>
            <iframe
              title="Shop Location"
              width="100%"
              height="300"
              className="rounded-lg shadow-md"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${GoogleApi}&q=${shop.googleMapLoc.lat},${shop.googleMapLoc.lng}`}
              allowFullScreen
            />
          </div>
        )}

        <div className="flex items-center mb-4">
          {shop.likes.includes(userId) ? (
            <button onClick={handleUnlike} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">
              Unlike
            </button>
          ) : (
            <button onClick={handleLike} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75">
              Like
            </button>
          )}
          <p className="ml-4 text-gray-700">Likes: {shop.likes.length}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Comments</h2>
          {shop.comments.map((comment) => (
            <div key={comment._id} className="mb-2">
              <p className="text-gray-700"><strong>{comment.user.name}:</strong> {comment.text}</p>
              <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-2"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
            Submit
          </button>
        </form>

        <Link to="/dashboard" className="block mt-6 px-6 py-2 bg-orange-600 text-white font-semibold text-center rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ShopDetail;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ShopDetail = () => {
//   const { id } = useParams();
//   const [shop, setShop] = useState(null);
//   const [comment, setComment] = useState('');
//   const [error, setError] = useState('');
//   const userId = useSelector((state) => state.login.myUserid);
//   const GoogleApi = process.env.REACT_APP_GOOGLE_API_KEY;

//   useEffect(() => {
//     const fetchShop = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/api/shops/getshop/${id}`);
//         setShop(response.data);
//       } catch (error) {
//         console.error('Error fetching shop:', error);
//         setError('Failed to fetch shop details. Please try again later.');
//       }
//     };

//     fetchShop();
//   }, [id]);

//   const handleLike = async () => {
//     try {
//       const response = await axios.post(`http://localhost:3001/api/shops/like/${id}`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setShop(response.data);
//     } catch (error) {
//       console.error('Error liking shop:', error);
//       setError('Failed to like shop. Please try again later.');
//     }
//   };

//   const handleUnlike = async () => {
//     try {
//       const response = await axios.post(`http://localhost:3001/api/shops/unlike/${id}`, {}, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setShop(response.data);
//     } catch (error) {
//       console.error('Error unliking shop:', error);
//       setError('Failed to unlike shop. Please try again later.');
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`http://localhost:3001/api/shops/comment/${id}`, { text: comment }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('authToken')}`
//         }
//       });
//       setShop(response.data);
//       setComment('');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       setError('Failed to add comment. Please try again later.');
//     }
//   };

//   if (error) {
//     return <p className="text-red-700">{error}</p>;
//   }

//   if (!shop) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
//       <header className="w-full bg-white shadow-md p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Shop Details</h1>
//           <nav>
//             <Link to="/" className="mr-4 text-blue-600 hover:text-blue-800">Home</Link>
//             <Link to="/dashboard" className="mr-4 text-blue-600 hover:text-blue-800">Dashboard</Link>
//             <Link to="/about" className="text-blue-600 hover:text-blue-800">About</Link>
//           </nav>
//         </div>
//       </header>

//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl mt-6">
//         <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">{shop.shopName}</h1>
//         <img src={shop.shopImage} alt={shop.shopName} className="w-full h-auto rounded-lg mb-4 object-cover" style={{ maxHeight: '300px' }} />

//         <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
//           <p className="text-lg mb-2 text-gray-700"><strong>Location:</strong> {shop.shopAddress}</p>
//           <p className="text-lg mb-2 text-gray-700"><strong>Contact:</strong> {shop.shopContact}</p>
//           <p className="text-lg mb-2 text-gray-700"><strong>Added by:</strong> {shop.addedBy && shop.addedBy.name ? shop.addedBy.name : 'Unknown'}</p>
//         </div>

//         {/* Google Maps Embed */}
//         {shop.googleMapLoc && shop.googleMapLoc.lat && shop.googleMapLoc.lng && (
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Shop Location</h2>
//             <iframe
//               title="Shop Location"
//               width="100%"
//               height="300"
//               className="rounded-lg shadow-md"
//               frameBorder="0"
//               style={{ border: 0 }}
//               src={`https://www.google.com/maps/embed/v1/place?key=${GoogleApi}&q=${shop.googleMapLoc.lat},${shop.googleMapLoc.lng}`}
//               allowFullScreen
//             />
//           </div>
//         )}

//         <div className="flex items-center mb-4">
//           {shop.likes.includes(userId) ? (
//             <button onClick={handleUnlike} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">
//               Unlike
//             </button>
//           ) : (
//             <button onClick={handleLike} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75">
//               Like
//             </button>
//           )}
//           <p className="ml-4 text-gray-700">Likes: {shop.likes.length}</p>
//         </div>

//         <div className="mb-4">
//           <h2 className="text-2xl font-bold mb-2">Comments</h2>
//           {shop.comments.map((comment) => (
//             <div key={comment._id} className="mb-2">
//               <p className="text-gray-700"><strong>{comment.user.name}:</strong> {comment.text}</p>
//               <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
        
//         <form onSubmit={handleCommentSubmit} className="mb-4">
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Add a comment..."
//             className="w-full p-3 border border-gray-300 rounded-lg mb-2"
//           />
//           <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
//             Submit
//           </button>
//         </form>

//         <Link to="/dashboard" className="block mt-6 px-6 py-2 bg-orange-600 text-white font-semibold text-center rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300">
//           Back to Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ShopDetail;