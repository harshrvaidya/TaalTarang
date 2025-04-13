// import React from 'react';
// import { BsCart } from 'react-icons/bs';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { totalItem } from '../Pages/Marketplace/cartUtils'; // Utility function to calculate total items

// const Navbar_shop = () => {
//   const cart = useSelector((state) => state.cart);
//   const totalQuantity = totalItem(cart); // Get total quantity of items in cart

//   return (
//     <div className='d-flex justify-content-between bg-secondary py-3 px-5 text-white'>
//       <a href="#" className='navbar-brand'>Marketplace</a>
//       <Link to='/dashboard' className='text-white'>Dashboard</Link>
//       <Link to="/cart" className='text-white d-flex align-items-center'>
//         <BsCart className='me-1' />
//         <span>{totalQuantity}</span> {/* Dynamic Cart Quantity */}
//       </Link>
//     </div>
//   );
// };

// export default Navbar_shop;



import React from 'react';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { totalItem } from '../Pages/Marketplace/cartUtils'; // Utility function to calculate total items

const Navbar_shop = () => {
  const cart = useSelector((state) => state.cart);
  const totalQuantity = totalItem(cart); // Get total quantity of items in cart

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide hover:text-gray-200 transition">
          Marketplace
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="text-white text-lg font-medium hover:text-gray-200 transition"
          >
            Dashboard
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-white text-lg font-medium flex items-center hover:text-gray-200 transition"
          >
            <BsCart className="text-2xl mr-2" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
              {totalQuantity}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_shop;