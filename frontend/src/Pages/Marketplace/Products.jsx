
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../../Components/Product';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products/');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'Others'; // Default to 'Others' if no category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-orange-300 text-gray-800 p-10">
      <h1 className="text-center text-4xl font-extrabold text-orange-700 mb-8">
        Explore Tabla Accessories 🎵
      </h1>

      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Render products by category */}
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {groupedProducts[category].map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;