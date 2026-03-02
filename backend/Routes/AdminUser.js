const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const adminAuth = require('../middleware/adminAuth');
const { getUsers, deleteUser,UpdateUser,getParticularUser} = require('../Controllers/AdminUserMangement');
router.get('/',getUsers);
 

// Fetch user details by ID
router.get('/:id',getParticularUser);
  

// Update user details
router.put('/:id',UpdateUser);
  router.delete('/:id',deleteUser);
module.exports = router;