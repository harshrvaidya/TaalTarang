import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../../Components/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products/");
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-orange-100 text-gray-800 p-10">
      <h1 className="text-center text-4xl font-bold text-orange-700 mb-8">
        Explore Tabla Accessories 🎵
      </h1>

      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div 
            key={p._id} 
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            <Product product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
