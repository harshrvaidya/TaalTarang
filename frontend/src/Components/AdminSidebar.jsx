import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="mb-4">
            <Link to="/admin" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/orders" className="hover:underline">
              Order Management
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/users" className="hover:underline">
              User Management
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/products" className="hover:underline">
              Product Management
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;