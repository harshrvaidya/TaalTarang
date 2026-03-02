// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrderManagement = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {

//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await axios.get('http://localhost:3001/api/admin/orders', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       await axios.put(
//         `http://localhost:3001/api/admin/orders/${orderId}`,
//         { orderStatus: status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === orderId ? { ...order, orderStatus: status } : order
//         )
//       );
//     } catch (error) {
//       console.error('Error updating order status:', error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">Order Management</h1>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order._id} className="p-4 border rounded-lg shadow-md bg-white">
//               <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
//               <p>User: {order.user.name} ({order.user.email})</p>
//               <p>Total Amount: ₹{order.totalAmount}</p>
//               <p>Delivery Address: {order.deliveryAddress}</p>
//               <p>Order Status: {order.orderStatus}</p>
//               <ul className="mt-2">
//                 {order.items.map((item, index) => (
//                   <li key={index}>
//                     {item.title} - Quantity: {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//               <div className="mt-4">
//                 <select
//                   value={order.orderStatus}
//                   onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                   className="p-2 border rounded-lg"
//                 >
//                   <option value="Not Completed">Not Completed</option>
//                   <option value="Under Process">Under Process</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderManagement;



// code with only update and delete functionality below





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrderManagement = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await axios.get('http://localhost:3001/api/admin/orders', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const updateOrderStatus = async (orderId, status) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await axios.put(
//         `http://localhost:3001/api/admin/orders/${orderId}`,
//         { orderStatus: status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log('Order status updated:', response.data);
//     } catch (error) {
//       console.error('Error updating order status:', error);
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       await axios.delete(`http://localhost:3001/api/admin/orders/${orderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log('Order deleted successfully');
//       setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
//     } catch (error) {
//       console.error('Error deleting order:', error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">Order Management</h1>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order._id} className="p-4 border rounded-lg shadow-md bg-white">
//               <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
//               <p>User: {order.user.name} ({order.user.email})</p>
//               <p>Total Amount: ₹{order.totalAmount}</p>
//               <p>Delivery Address: {order.deliveryAddress}</p>
//               <p>Order Status: {order.orderStatus}</p>
//               <ul className="mt-2">
//                 {order.items.map((item, index) => (
//                   <li key={index}>
//                     {item.title} - Quantity: {item.quantity}
//                   </li>
//                 ))}
//               </ul>
//               <div className="mt-4 flex items-center space-x-4">
//                 <select
//                   value={order.orderStatus}
//                   onChange={(e) => {
//                     const newStatus = e.target.value;
//                     setOrders((prevOrders) =>
//                       prevOrders.map((o) =>
//                         o._id === order._id ? { ...o, orderStatus: newStatus } : o
//                       )
//                     );
//                     updateOrderStatus(order._id, newStatus);
//                   }}
//                   className="p-2 border rounded-lg"
//                 >
//                   <option value="Not Completed">Not Completed</option>
//                   <option value="Under Process">Under Process</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//                 <button
//                   onClick={() => deleteOrder(order._id)}
//                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderManagement;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredOrders, setFilteredOrders] = useState([]); // State for filtered orders

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3001/api/admin/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        setFilteredOrders(response.data); // Initialize filtered orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `http://localhost:3001/api/admin/orders/${orderId}`,
        { orderStatus: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Order status updated:', response.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: status } : order
        )
      );
      setFilteredOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:3001/api/admin/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Order deleted successfully');
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      setFilteredOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter orders based on name or email
    const filtered = orders.filter(
      (order) =>
        order.user.name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Order Management</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or email"
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p>User: {order.user.name} ({order.user.email})</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <p>Delivery Address: {order.deliveryAddress}</p>
              <p>Order Status: {order.orderStatus}</p>
              <ul className="mt-2">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.title} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center space-x-4">
                <select
                  value={order.orderStatus}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    setOrders((prevOrders) =>
                      prevOrders.map((o) =>
                        o._id === order._id ? { ...o, orderStatus: newStatus } : o
                      )
                    );
                    setFilteredOrders((prevOrders) =>
                      prevOrders.map((o) =>
                        o._id === order._id ? { ...o, orderStatus: newStatus } : o
                      )
                    );
                    updateOrderStatus(order._id, newStatus);
                  }}
                  className="p-2 border rounded-lg"
                >
                  <option value="Not Completed">Not Completed</option>
                  <option value="Under Process">Under Process</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManagement;