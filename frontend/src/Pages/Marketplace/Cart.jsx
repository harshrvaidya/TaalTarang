// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Remove, Increase, Decrease } from '../../Features/Shop/Shopslice';
// import { totalItem, totalPrice } from './cartUtils';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Cart = () => {
//   const cart = useSelector((state) => state.cart);
//   const userEmail = useSelector((state) => state.login.myemail);
//   const dispatch = useDispatch();
//   const buy = async () => {
//     localStorage.setItem("cartItems", JSON.stringify(cart));
//     localStorage.setItem("totalPrice", totalPrice(cart));

//     let response = await axios.post('http://localhost:3001/api/products/pay', {
//       cartItems: cart,
//         email: userEmail, 
//     });

//     if(response.status === 200) {
//       window.location.href = response.data.url;
//       console.log(response.data);
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-orange-50 min-h-screen">
//       {/* Cart Header */}
//       <h2 className="text-3xl font-bold text-orange-700 text-center mb-6">Shopping Cart</h2>
      
//       {/* Cart Summary */}
//       <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg shadow-md">
//         <p className="text-lg font-semibold text-gray-700">Total Items: <span className="text-orange-600">{totalItem(cart)}</span></p>
//         <p className="text-lg font-semibold text-gray-700">Total Price: <span className="text-orange-600">₹{totalPrice(cart)}</span></p>
//       </div>

//       {/* If cart is empty */}
//       {cart.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg mt-8">Your cart is empty.</p>
//       ) : (
//         <div className="mt-6 space-y-6">
//           {cart.map((product) => (
//             <div key={product.id} className="flex bg-white rounded-lg shadow-md p-4 gap-6 items-center border border-gray-200">
//               {/* Product Image */}
//               <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
              
//               {/* Product Details */}
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
//                 <p className="text-sm text-gray-500">{product.description}</p>
//                 <p className="text-orange-700 font-semibold mt-1">Price: ₹{product.price}</p>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center space-x-3 mt-3">
//                   <button 
//                     onClick={() => dispatch(Decrease(product._id))}
//                     className="px-3 py-1 bg-orange-300 text-white rounded-md shadow-md hover:bg-orange-400 transition-all duration-300"
//                   >
//                     −
//                   </button>
//                   <span className="text-gray-700 font-semibold">{product.quantity}</span>
//                   <button 
//                     onClick={() => dispatch(Increase(product._id))}
//                     className="px-3 py-1 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition-all duration-300"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Remove Button */}
//               <button 
//                 onClick={() => dispatch(Remove(product._id))}
//                 className="px-4 py-2 text-red-500 font-semibold hover:text-red-600 transition-all duration-300"
//               >
//                 ❌ Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Checkout & Continue Shopping */}
//       <div className="mt-8 flex justify-between">
//         <Link to="/marketplace" className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300">
//            Continue Shopping
//         </Link>
//         <button onClick={buy}className="px-5 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300">
//            Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Remove, Increase, Decrease } from '../../Features/Shop/Shopslice';
import { totalItem, totalPrice } from './cartUtils';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const userEmail = useSelector((state) => state.login.myemail);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleCheckout = () => {
    if (!deliveryAddress) {
      alert('Please enter a delivery address.');
      return;
    }

    // Save cart data and delivery address to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice(cart));
    localStorage.setItem('deliveryAddress', deliveryAddress);

    // Proceed to payment
    buy();
  };

  const buy = async () => {
    let response = await axios.post('http://localhost:3001/api/products/pay', {
      cartItems: cart,
      email: userEmail,
    });

    if (response.status === 200) {
      window.location.href = response.data.url;
      console.log(response.data);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-orange-50 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-700 text-center mb-6">Shopping Cart</h2>

      <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-700">
          Total Items: <span className="text-orange-600">{totalItem(cart)}</span>
        </p>
        <p className="text-lg font-semibold text-gray-700">
          Total Price: <span className="text-orange-600">₹{totalPrice(cart)}</span>
        </p>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">Your cart is empty.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {cart.map((product) => (
            <div key={product.id} className="flex bg-white rounded-lg shadow-md p-4 gap-6 items-center border border-gray-200">
              <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-orange-700 font-semibold mt-1">Price: ₹{product.price}</p>
                <div className="flex items-center space-x-3 mt-3">
                  <button
                    onClick={() => dispatch(Decrease(product._id))}
                    className="px-3 py-1 bg-orange-300 text-white rounded-md shadow-md hover:bg-orange-400 transition-all duration-300"
                  >
                    −
                  </button>
                  <span className="text-gray-700 font-semibold">{product.quantity}</span>
                  <button
                    onClick={() => dispatch(Increase(product._id))}
                    className="px-3 py-1 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition-all duration-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(Remove(product._id))}
                className="px-4 py-2 text-red-500 font-semibold hover:text-red-600 transition-all duration-300"
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Link to="/marketplace" className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300">
          Continue Shopping
        </Link>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300"
        >
          Proceed to Checkout
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Enter Delivery Address</h3>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows={3}
              placeholder="Enter your delivery address..."
            ></textarea>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;