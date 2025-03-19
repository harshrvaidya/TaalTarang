import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64"> {/* Add margin-left to account for the fixed sidebar */}
        {/* Navbar */}
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet /> {/* Render nested admin pages here */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;