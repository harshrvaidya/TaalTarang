const express = require('express');
const { registerUser } = require('../Controllers/UserControllers');
const router = express.Router();

// Route for registering a user
router.post('/register', registerUser);

module.exports = router;
