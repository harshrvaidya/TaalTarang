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

    // Fetch orders for the given user
    const orders = await Order.find({ user: userId })
      .populate('items.product', 'title price thumbnail') // Populate product details
      .sort({ createdAt: -1 }); // Sort by most recent orders

    res.json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
};


module.exports = { getOrderHistory,getUserOrders, getAllOrders };