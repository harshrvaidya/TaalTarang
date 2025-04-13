// const express = require('express');
// const router = express.Router();
// const { getUserOrders, getAllOrders } = require('../Controllers/OrderControllers');
// const { webhook12 } = require('../Controllers/MarketplaceControllers');
// // const auth = require('../middleware/auth');
// router.get('/orders',  getUserOrders); // User-specific orders
// router.get('/admin/orders',getAllOrders); // Admin view all orders

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getOrderHistory } = require('../Controllers/OrderControllers');

// Route to fetch order history for a user
router.get('/history/:userId', getOrderHistory);

module.exports = router;