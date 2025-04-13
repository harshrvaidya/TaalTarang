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
    const orders = await Order.find().populate('user', 'name email').populate('items.product', 'title price');
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

const addOrder = async (req, res) => {
  try {
    const { user, items, totalAmount } = req.body;

    // Create a new order
    const newOrder = new Order({
      user,
      items,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Failed to add order" });
  }
};

// const addOrder = async (req, res) => {
//   try {
//     const { user, items, totalAmount } = req.body;

//     // Check if a similar order already exists
//     const existingOrder = await Order.findOne({ user, items });
//     if (existingOrder) {
//       return res.status(400).json({ error: "Order already exists" });
//     }

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

module.exports = { getOrderHistory,getUserOrders, getAllOrders,addOrder };