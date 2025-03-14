import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Remove, Increase, Decrease } from '../../Features/Shop/Shopslice';
import { totalItem, totalPrice } from './cartUtils';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const userEmail = useSelector((state) => state.login.myemail);
  const dispatch = useDispatch();
  const buy = async () => {
    let response = await axios.post('http://localhost:3001/api/products/pay', {
      cartItems: cart,
        email: userEmail, 
    });

    if(response.status === 200) {
      window.location.href = response.data.url;
      console.log(response.data);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-orange-50 min-h-screen">
      {/* Cart Header */}
      <h2 className="text-3xl font-bold text-orange-700 text-center mb-6">Shopping Cart</h2>
      
      {/* Cart Summary */}
      <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-700">Total Items: <span className="text-orange-600">{totalItem(cart)}</span></p>
        <p className="text-lg font-semibold text-gray-700">Total Price: <span className="text-orange-600">₹{totalPrice(cart)}</span></p>
      </div>

      {/* If cart is empty */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">Your cart is empty.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {cart.map((product) => (
            <div key={product.id} className="flex bg-white rounded-lg shadow-md p-4 gap-6 items-center border border-gray-200">
              {/* Product Image */}
              <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
              
              {/* Product Details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="text-orange-700 font-semibold mt-1">Price: ₹{product.price}</p>

                {/* Quantity Controls */}
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

              {/* Remove Button */}
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

      {/* Checkout & Continue Shopping */}
      <div className="mt-8 flex justify-between">
        <Link to="/marketplace" className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300">
          🛍️ Continue Shopping
        </Link>
        <button onClick={buy}className="px-5 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300">
          ✅ Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
