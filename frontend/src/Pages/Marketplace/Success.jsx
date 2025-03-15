import React from "react";
import { motion } from "framer-motion";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      {/* Typewriter Animation */}
      <h2 className="text-3xl font-semibold text-green-800">
        <span
          className="inline-block overflow-hidden border-r-2 border-green-800 whitespace-nowrap pr-2"
          style={{
            display: "inline-block",
            animation: "typing 3s steps(20, end) infinite alternate",
          }}
        >
          Payment Successful
        </span>
      </h2>

      {/* Smooth Fade-In Animation */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-green-900 mt-4"
      >
        Taaltaraang 🎶
      </motion.h1>

      {/* Inline Style Tag */}
      <style>
        {`
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default Success;
