import React from 'react';
import { Link } from 'react-router-dom';

const ProductManagement = () => {

  return (
    <div>
    <Link to="/admin/products/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Product</Link>
    <h1>below full list of products</h1>
    </div>
  );
};

export default ProductManagement;