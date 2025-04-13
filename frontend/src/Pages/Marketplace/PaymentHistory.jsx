import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/orders/history/${userId}`);
        console.log("Order history response:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
        alert("Failed to fetch order history");
      }
    };
  
    fetchOrderHistory();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-orange-50 min-h-screen">
      <h2 className="text-3xl font-bold text-orange-700 text-center mb-6">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h3>
              <p className="text-gray-600">Total Amount: ₹{order.totalAmount}</p>
              <p className="text-gray-600">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
              <ul className="mt-4 space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-800">
                    {item.title} - Quantity: {item.quantity}, Price: ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;