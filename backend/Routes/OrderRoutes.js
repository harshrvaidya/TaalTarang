const express = require("express");
const router = express.Router();
const { addOrder, getOrderHistory,updateOrderStatus,getAllOrders,deleteOrder } = require("../Controllers/OrderControllers");
const auth = require('../middleware/auth');
// Route to add a new order
router.post("/", addOrder);

// Route to fetch order history for a user
router.get("/history/:userId", getOrderHistory);

// Admin routes
router.get("/", getAllOrders); // Fetch all orders
// router.put("/admin/orders/:orderId", updateOrderStatus); // Update order status
// router.delete("/admin/orders/:orderId", deleteOrder); // Route to delete an order



router.put("/:orderId", (req, res, next) => {
    console.log(`PUT request received for updating order: ${req.params.orderId}`);
    next();
  }, updateOrderStatus);
  
  router.delete("/:orderId", (req, res, next) => {
    console.log(`DELETE request received for deleting order: ${req.params.orderId}`);
    next();
  }, deleteOrder);
module.exports = router;