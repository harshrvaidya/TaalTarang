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
//   const handleAddToFavorites = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/api/shops/favorite/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//           },
//         }
//       );
  
//       // Check if the response contains an error message
//       if (response.data?.error === 'Shop is already in your favorites') {
//         alert('Shop is already in your favorites!');
//       } else {
//         alert('Shop added to favorites!');
//       }
//     } catch (error) {
//       console.error('Error adding to favorites:', error);
  
//       // Handle specific error response from the server
//       if (error.response?.data?.error === 'Shop is already in your favorites') {
//         alert('Shop is already in your favorites!');
//       } else {
//         setError('Failed to add shop to favorites. Please try again later.');
//       }
//     }
//   };
  
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

//   if (error) return <p className="text-red-700 text-center mt-6">{error}</p>;
//   if (!shop) return <p className="text-center mt-6">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
//       {/* Navbar */}
//       <header className="w-full bg-gradient-to-r from-orange-500 to-orange-700 shadow-md">
//         <div className="container mx-auto flex justify-between items-center p-4">
//           <h1 className="text-2xl font-bold text-white">Shop Details</h1>
//           <nav className="flex space-x-4">
//             {/* <Link to="/" className="text-white font-medium hover:underline">Home</Link> */}
//             <Link to="/dashboard" className="text-white font-medium hover:underline">Dashboard</Link>
//             {/* <Link to="/about" className="text-white font-medium hover:underline">About</Link> */}
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto px-6 py-10 grid gap-8 grid-cols-1 md:grid-cols-2">
//         {/* Shop Image */}
//         <div>
//           <img
//             src={shop.shopImage}
//             alt={shop.shopName}
//             className="w-full h-auto rounded-2xl shadow-lg object-cover"
//             style={{ maxHeight: '400px' }}
//           />
//           {shop.googleMapLoc?.lat && shop.googleMapLoc?.lng && (
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">Location</h2>
//               <iframe
//                 title="Shop Location"
//                 width="100%"
//                 height="250"
//                 className="rounded-lg shadow-md"
//                 frameBorder="0"
//                 style={{ border: 0 }}
//                 src={`https://www.google.com/maps/embed/v1/place?key=${GoogleApi}&q=${shop.googleMapLoc.lat},${shop.googleMapLoc.lng}`}
//                 allowFullScreen
//               />
//             </div>
//           )}
//         </div>

//         {/* Shop Info + Actions */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
//           <div>
//             <h2 className="text-3xl font-bold text-orange-700 mb-4">{shop.shopName}</h2>
//             <p className="text-gray-700 mb-2"><strong>Location:</strong> {shop.shopAddress}</p>
//             <p className="text-gray-700 mb-2"><strong>Contact:</strong> {shop.shopContact}</p>
//             {/* <p className="text-gray-700 mb-2"><strong>Added by:</strong> {shop.addedBy?.name || 'Unknown'}</p> */}
//             <p className="text-gray-700 mb-4"><strong>Description:</strong> <em>{shop.description}</em></p>
//           </div>
// {/* add to favourite  */}
// <button
//   onClick={handleAddToFavorites}
//   className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
// >
//   Add to Favorites
// </button>

//           <div className="flex items-center mt-4">
//             {shop.likes.includes(userId) ? (
//               <button
//                 onClick={handleUnlike}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
//               >
//                 Unlike
//               </button>
//             ) : (
//               <button
//                 onClick={handleLike}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
//               >
//                 Like
//               </button>
//             )}
//             <p className="ml-4 text-gray-700">Likes: {shop.likes.length}</p>
//           </div>
//         </div>
//       </main>

//       {/* Comments & Add Comment */}
//       <section className="max-w-4xl mx-auto px-6 py-10">
//         <div className="bg-white p-6 rounded-2xl shadow-md">
//           <h2 className="text-2xl font-bold text-orange-700 mb-4">Comments</h2>
//           <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
//             {shop.comments.map((c) => (
//               <div key={c._id} className="border-b pb-2">
//                 <p className="text-gray-800"><strong>{c.user.name}:</strong> {c.text}</p>
//                 <p className="text-gray-500 text-sm">{new Date(c.createdAt).toLocaleString()}</p>
//               </div>
//             ))}
//           </div>

//           <form onSubmit={handleCommentSubmit} className="mt-6">
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Add a comment..."
//               className="w-full p-3 border border-gray-300 rounded-lg resize-none"
//               rows={3}
//             />
//             <button
//               type="submit"
//               className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* Back Button */}
//       <div className="text-center pb-10">
//         <Link
//           to="/dashboard"
//           className="inline-block mt-4 px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition-all"
//         >
//           Back to Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ShopDetail;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // User's rating
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

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/shops/favorite/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (response.data?.error === 'Shop is already in your favorites') {
        alert('Shop is already in your favorites!');
      } else {
        alert('Shop added to favorites!');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      if (error.response?.data?.error === 'Shop is already in your favorites') {
        alert('Shop is already in your favorites!');
      } else {
        setError('Failed to add shop to favorites. Please try again later.');
      }
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/shops/like/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
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
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
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
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setShop(response.data);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment. Please try again later.');
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/shops/rate/${id}`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setShop(response.data.shop); // Update shop details with the new rating
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      setError('Failed to submit rating. Please try again later.');
    }
  };

  if (error) return <p className="text-red-700 text-center mt-6">{error}</p>;
  if (!shop) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-300">
      {/* Navbar */}
      <header className="w-full bg-gradient-to-r from-orange-500 to-orange-700 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-white">Shop Details</h1>
          <nav className="flex space-x-4">
            <Link to="/dashboard" className="text-white font-medium hover:underline">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid gap-8 grid-cols-1 md:grid-cols-2">
        {/* Shop Image */}
        <div>
          <img
            src={shop.shopImage}
            alt={shop.shopName}
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
            style={{ maxHeight: '400px' }}
          />
          {shop.googleMapLoc?.lat && shop.googleMapLoc?.lng && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Location</h2>
              <iframe
                title="Shop Location"
                width="100%"
                height="250"
                className="rounded-lg shadow-md"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${GoogleApi}&q=${shop.googleMapLoc.lat},${shop.googleMapLoc.lng}`}
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* Shop Info + Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-orange-700 mb-4">{shop.shopName}</h2>
            <p className="text-gray-700 mb-2"><strong>Location:</strong> {shop.shopAddress}</p>
            <p className="text-gray-700 mb-2"><strong>Contact:</strong> {shop.shopContact}</p>
            <p className="text-gray-700 mb-4"><strong>Description:</strong> <em>{shop.description}</em></p>
            <p className="text-gray-700 mb-4"><strong>Average Rating:</strong> {shop.averageRating ? shop.averageRating.toFixed(1) : 'No ratings yet'}</p>
          </div>

          {/* Add to Favorites */}
          <button
            onClick={handleAddToFavorites}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
          >
            Add to Favorites
          </button>

          {/* Like/Unlike */}
          <div className="flex items-center mt-4">
            {shop.likes.includes(userId) ? (
              <button
                onClick={handleUnlike}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Unlike
              </button>
            ) : (
              <button
                onClick={handleLike}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Like
              </button>
            )}
            <p className="ml-4 text-gray-700">Likes: {shop.likes.length}</p>
          </div>

          {/* Submit Rating */}
          <div className="mt-4">
            <label className="block text-gray-700 font-medium mb-2">Rate this Shop:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="0">Select Rating</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            <button
              onClick={handleRatingSubmit}
              className="ml-4 px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </main>

      {/* Comments & Add Comment */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-700 mb-4">Comments</h2>
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {shop.comments.map((c) => (
              <div key={c._id} className="border-b pb-2">
                <p className="text-gray-800"><strong>{c.user.name}:</strong> {c.text}</p>
                <p className="text-gray-500 text-sm">{new Date(c.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="mt-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Back Button */}
      <div className="text-center pb-10">
        <Link
          to="/dashboard"
          className="inline-block mt-4 px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition-all"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ShopDetail;