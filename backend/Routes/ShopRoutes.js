const express=require('express')
const router=express.Router();
const Shop=require('../models/Shops')
const authMiddleware = require("../middleware/auth");

router.get("/",async(req,res)=>{
    try{
        //try to fetch all shop 
        const shops=await Shop.find().populate("addedBy","username")
        res.json(shops)
    }
    catch{
        res.status(500).json({ error: "Server error" });
    }
})

router.post("/add", authMiddleware,async(req,res)=>{
    try{
        const { name, location, contact } = req.body;//destructring the values from frontend
        const newShop = new Shop({
            name,
            location,
            contact,
            addedBy: req.user.id, // Logged-in user's ID
          });
          await newShop.save();
          res.json(newShop);
    }
    catch(error){
        res.status(500).json({ error: "Failed to add shop" });

    }
})

router.post('/addshop', async (req, res) => {
  const { shopName, shopLocation, shopContact } = req.body;
  try {
    const newShop = new Shop({
      shopname: shopName,
      shopAddress: shopLocation,
      shopContact: shopContact,
      // addedBy: req.user._id // Uncomment this if you have user authentication
    });
    const savedShop = await newShop.save();
    res.status(201).json(savedShop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add shop' });
  }
});

module.exports = router;