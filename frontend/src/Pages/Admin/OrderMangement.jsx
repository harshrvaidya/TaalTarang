import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3001/api/admin/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Order Management</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p>User: {order.user.name} ({order.user.email})</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <ul className="mt-2">
                {order.items.map((item) => (
                  <li key={item.product._id}>
                    {item.product.title} - Quantity: {item.quantity}
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

export default OrderManagement;