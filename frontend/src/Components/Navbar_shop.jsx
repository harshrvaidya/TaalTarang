import React from 'react';
import { BsCart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { totalItem } from '../Pages/Marketplace/cartUtils'; // Utility function to calculate total items

const Navbar_shop = () => {
  const cart = useSelector((state) => state.cart);
  const totalQuantity = totalItem(cart); // Get total quantity of items in cart

  return (
    <div className='d-flex justify-content-between bg-secondary py-3 px-5 text-white'>
      <a href="#" className='navbar-brand'>Marketplace</a>
      <Link to='/dashboard' className='text-white'>Dashboard</Link>
      <Link to="/cart" className='text-white d-flex align-items-center'>
        <BsCart className='me-1' />
        <span>{totalQuantity}</span> {/* Dynamic Cart Quantity */}
      </Link>
    </div>
  );
};

export default Navbar_shop;
