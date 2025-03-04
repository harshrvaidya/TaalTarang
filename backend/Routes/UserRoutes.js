const express = require('express');
const { registerUser, login,updateUserProfile,getuserbyID} = require('../Controllers/UserControllers'); // using fucntions present in UserControllers
const router = express.Router();
const auth = require('../middleware/auth');
// Route for registering a user
router.post('/register', registerUser);
router.post('/login', login);
router.get('/getUserById/:id',getuserbyID);
router.put('/:id', auth, updateUserProfile);
module.exports = router;
