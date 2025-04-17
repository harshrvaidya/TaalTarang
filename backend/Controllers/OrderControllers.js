const Order = require('../models/Order');

// Get orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product', 'title price');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    console.log("Reached the contoller get orders");
    console.log("Fetching all orders...");
  const orders = await Order.find()
  .populate('user', 'name email')
  .populate({ path: 'items.product', strictPopulate: false }) // Disable strict populate
  .sort({ createdAt: -1 });

    console.log("Orders found:", orders);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Fetching orders for userId:", userId);

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    console.log("Orders found:", orders);

    res.json(orders);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ error: "Failed to fetch order history" });
  }
};
//14 arpril edit 
// const addOrder = async (req, res) => {
//   try {
//     const { user, items, totalAmount } = req.body;

//     // Create a new order
//     const newOrder = new Order({
//       user,
//       items,
//       totalAmount,
//     });

//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error("Error adding order:", error);
//     res.status(500).json({ error: "Failed to add order" });
//   }
// };
const addOrder = async (req, res) => {
  try {
    const { user, items, totalAmount, deliveryAddress, orderStatus } = req.body;

    // Create a new order
    const newOrder = new Order({
      user,
      items,
      totalAmount,
      deliveryAddress,
      orderStatus, // Save the order status
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Failed to add order" });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    console.log("Updating order status for orderId:", orderId);
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      console.log("Order not found for orderId:", orderId);
      return res.status(404).json({ error: "Order not found" });
    }

    console.log("Order status updated successfully:", updatedOrder);
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    console.log("Deleting order with orderId:", orderId);
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      console.log("Order not found for orderId:", orderId);
      return res.status(404).json({ error: "Order not found" });
    }

    console.log("Order deleted successfully:", deletedOrder);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};

module.exports = { getOrderHistory,getUserOrders, getAllOrders,addOrder,updateOrderStatus,deleteOrder };