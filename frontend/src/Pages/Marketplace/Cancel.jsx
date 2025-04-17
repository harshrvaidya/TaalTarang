import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      {/* Cross Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-slate-500 p-4 rounded-full"
      >
        ❌
      </motion.div>

      {/* Cancel Message */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mt-4"
      >
        Order Canceled
      </motion.h1>

      <p className="text-lg text-gray-300 mt-2 text-center">
        Your order has been canceled. If this was a mistake, you can try placing the order again.
      </p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6"
      >
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-red-500 text-white rounded-lg text-lg font-medium shadow-md hover:bg-red-600 transition"
        >
          Go to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default Cancel;