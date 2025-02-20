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
};

const Getshops = async (req, res) => {
  try {
    const shops = await Shop.find().populate('addedBy', 'name'); // Populate the addedBy field with the name
    console.log('Fetched shops:', shops);
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
};

const getShopById = async (req, res) => {
  try {
    console.log(`Fetching shop with ID: ${req.params.id}`);
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      console.log('Shop not found');
      return res.status(404).json({ error: 'Shop not found' });
    }
    console.log('Fetched shop:', shop);
    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop:', error);
    res.status(500).json({ error: 'Failed to fetch shop' });
  }
};

const Updateshop = async (req, res) => {
  const id=req.params.id;
  
  const { shopName, shopLocation, shopContact, shopImage } = req.body;
  Shop.findOneAndUpdate({_id:id},{shopname:shopName,shopAddress:shopLocation,shopContact:shopContact,shopImage:shopImage})
  .then((shop)=>{
    res.json(shop)
  })
  .catch((error)=>{
    console.log(error)
  })
  if (!shopName || !shopLocation || !shopContact || !shopImage) {
    console.log('Missing fields:', { shopName, shopLocation, shopContact, shopImage });
    return res.status(400).json({ error: 'All fields are required' });
  }
  
};
const Deleteshop = async (req, res) => {
  const  id  = req.params.id;
  console.log(`Deleting shop with ID: ${id}`);
  Shop.findByIdAndDelete({_id:id})
  .then((result) => {res.json(result)})
  .catch((err) => {res.json(err)});
};









module.exports = { Getshops, Addshops, getShopById ,Updateshop,Deleteshop};