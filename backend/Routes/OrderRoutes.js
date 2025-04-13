const express = require("express");
const router = express.Router();
const { addOrder, getOrderHistory } = require("../Controllers/OrderControllers");

// Route to add a new order
router.post("/", addOrder);

// Route to fetch order history for a user
router.get("/history/:userId", getOrderHistory);

module.exports = router;