const express = require('express');
const router = express.Router();
const shopController = require('../Controllers/ShopControllers');
const authMiddleware = require('../middleware/auth');

// Route to add a new shop
router.post('/addshop', authMiddleware, shopController.Addshops);

// Route to get all shops
router.get('/', shopController.Getshops);

// Add more routes as needed for edit, delete, etc.

module.exports = router;
