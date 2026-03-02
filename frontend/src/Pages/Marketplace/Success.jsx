

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const Success = () => {
//   const [orderDetails, setOrderDetails] = useState(null);
//   let isExecuted = false; // Move the flag outside useEffect

//   useEffect(() => {
//     const addOrder = async () => {
//       if (isExecuted) {
//         console.log("addOrder already executed, skipping...");
//         return; // Prevent duplicate execution
//       }
//       isExecuted = true;

//       try {
//         console.log("Fetching userId, cartItems, and totalPrice from localStorage...");
//         const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
//         const cartItems = JSON.parse(localStorage.getItem("cartItems")); // Retrieve cart items
//         const totalAmount = localStorage.getItem("totalPrice"); // Retrieve total price

//         console.log("Order data being sent to backend:", { userId, cartItems, totalAmount });

//         // const orderData = {
//         //   user: userId,
//         //   items: cartItems.map((item) => ({
//         //     title: item.title,
//         //     quantity: item.quantity,
//         //     price: item.price,
//         //   })),
//         //   totalAmount,
//         // };
//         const orderData = {
//           user: userId,
//           items: cartItems.map((item) => ({
//             title: item.title,
//             quantity: item.quantity,
//             price: item.price,
//           })),
//           totalAmount,
//           deliveryAddress: localStorage.getItem('deliveryAddress'), // Add delivery address
//           orderStatus: "Not Completed", // Default order status
//         };
     

//         // Send order data to the backend
//         const response = await axios.post("http://localhost:3001/api/orders/", orderData);
//         console.log("Order successfully added:", response.data);
//         setOrderDetails(response.data); // Set the response data to display
//       } catch (error) {
//         console.error("Error adding order:", error);
//         alert("Failed to add order");
//       }
//     };

//     addOrder();
//   }, []); // Ensure the dependency array is empty

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
//       {/* Checkmark Icon */}
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="bg-green-500 p-4 rounded-full"
//       >
//         ✅
//       </motion.div>

//       {/* Success Message */}
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-4xl font-bold mt-4"
//       >
//         Payment Successful 🎉
//       </motion.h1>

//       <p className="text-lg text-gray-300 mt-2 text-center">
//         Thank you for your purchase. Your transaction has been successfully completed.
//       </p>

//       {/* Display Order Details */}
//       {orderDetails && (
//         <pre className="mt-6 bg-gray-800 p-4 rounded-lg text-sm">
//           {JSON.stringify(orderDetails, null, 2)}
//         </pre>
//       )}

//       {/* Button */}
//       <motion.a
//         href="/dashboard"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 0.6 }}
//         className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg text-lg font-medium shadow-md hover:bg-green-600 transition"
//       >
//         Go to Dashboard
//       </motion.a>
//     </div>
//   );
// };

// export default Success;



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Success = () => {
  let isExecuted = false; // Move the flag outside useEffect

  useEffect(() => {
    const addOrder = async () => {
      if (isExecuted) {
        console.log("addOrder already executed, skipping...");
        return; // Prevent duplicate execution
      }
      isExecuted = true;

      try {
        console.log("Fetching userId, cartItems, and totalPrice from localStorage...");
        const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems")); // Retrieve cart items
        const totalAmount = localStorage.getItem("totalPrice"); // Retrieve total price

        console.log("Order data being sent to backend:", { userId, cartItems, totalAmount });

        const orderData = {
          user: userId,
          items: cartItems.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount,
          deliveryAddress: localStorage.getItem("deliveryAddress"), // Add delivery address
          orderStatus: "Not Completed", // Default order status
        };

        // Send order data to the backend
        const response = await axios.post("http://localhost:3001/api/orders/", orderData);
        console.log("Order successfully added:", response.data); // Log the response data
      } catch (error) {
        console.error("Error adding order:", error);
        alert("Failed to add order");
      }
    };

    addOrder();
  }, []); // Ensure the dependency array is empty

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