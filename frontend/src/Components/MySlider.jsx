import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MySlider = () => {
  const images = [
    "https://images.unsplash.com/photo-1568219656418-15c329312bf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1597235506549-5392d2b7559a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1633411988188-6e63354a9019?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome To TaalTaraang!
          </h1>
          <Link to="/login">
          <button className="bg-orange-400 text-white px-6 py-3 rounded-md shadow-md hover:bg-orange-500 transition">
            Let's go!
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MySlider;
