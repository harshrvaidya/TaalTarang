const Shop = require('../models/Shops');

const Addshops = async (req, res) => { 
    const { shopName, shopLocation, shopContact, shopImage } = req.body;
    if (!shopName || !shopLocation || !shopContact || !shopImage) {
      console.log('Missing fields:', { shopName, shopLocation, shopContact, shopImage });
      return res.status(400).json({ error: 'All fields are required' });
    }
    try {
      const newShop = new Shop({
        shopname: shopName,
        shopAddress: shopLocation,
        shopContact: shopContact,
        shopImage: shopImage,
        addedBy: req.user._id // Save the ID of the logged-in user
      });
      const savedShop = await newShop.save();
      console.log('Shop added successfully:', savedShop);
      res.status(201).json(savedShop);
    } catch (error) {
      console.error('Error during adding shop:', error);
      res.status(500).json({ error: 'Failed to add shop' });
    }
}

const Getshops= async (req, res) => {
    {
        try {
          const shops = await Shop.find().populate('addedBy', 'name'); // Populate the addedBy field with the name
          console.log('Fetched shops:', shops);
          res.json(shops);
        } catch (error) {
          console.error('Error fetching shops:', error);
          res.status(500).json({ error: 'Failed to fetch shops' });
        }
      }
}
module.exports = { Getshops,Addshops};