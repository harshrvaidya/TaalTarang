const express = require('express');
const { registerUser, login } = require('../Controllers/UserControllers'); // using fucntions present in UserControllers
const router = express.Router();

// Route for registering a user
router.post('/register', registerUser);
router.post('/login', login);
module.exports = router;
