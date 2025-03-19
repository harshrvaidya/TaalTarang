const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const adminAuth = require('../middleware/adminAuth');
const { getUsers } = require('../Controllers/AdminUserMangement');
router.get('/',getUsers);
 

// Fetch user details by ID
router.get('/:id',async (req, res) => {
   const id=req.params.id;
   User.findById(id)
   .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  

// Update user details
router.put('/:id',async (req, res) => {
    const { name, phone_no, profilepic } = req.body;
  
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.name = name || user.name;
      user.phone_no = phone_no || user.phone_no;
      user.profilepic = profilepic || user.profilepic;
  
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });
module.exports = router;