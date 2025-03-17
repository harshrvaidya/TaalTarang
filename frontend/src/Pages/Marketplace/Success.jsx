import React from "react";
import { motion } from "framer-motion";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      {/* Checkmark Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-green-500 p-4 rounded-full"
      >
        ✅
      </motion.div>
      
      {/* Success Message */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mt-4"
      >
        Payment Successful 🎉
      </motion.h1>
      
      <p className="text-lg text-gray-300 mt-2 text-center">
        Thank you for your purchase. Your transaction has been successfully completed.
      </p>
      
      {/* Button */}
      <motion.a
        href="/dashboard"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-medium shadow-md hover:bg-green-600 transition"
      >
        Go to Dashboard
      </motion.a>
    </div>
  );
};

export default Success;