const Shop = require('../models/Shops');

// const Addshops = async (req, res) => {
//   const { shopName, shopLocation, shopContact, shopImage } = req.body;
//   if (!shopName || !shopLocation || !shopContact || !shopImage) {
//     console.log('Missing fields:', { shopName, shopLocation, shopContact, shopImage });
//     return res.status(400).json({ error: 'All fields are required' });
//   }
//   try {
//     const newShop = new Shop({
//       shopname: shopName,
//       shopAddress: shopLocation,
//       shopContact: shopContact,
//       shopImage: shopImage,
//       addedBy: req.user._id // Save the ID of the logged-in user
//     });
//     const savedShop = await newShop.save();
//     console.log('Shop added successfully:', savedShop);
//     res.status(201).json(savedShop);
//   } catch (error) {
//     console.error('Error during adding shop:', error);
//     res.status(500).json({ error: 'Failed to add shop' });
//   }
// };

const Addshops = async (req, res) => {
  const { shopName, shopAddress, shopGoogleMap, shopContact, shopImage,description } = req.body; // Use shopGoogleMap

  console.log("📩 Received Data:", req.body);
  console.log("📍 googleMapLoc Object:", shopGoogleMap); // Correct key
  if (shopGoogleMap) {
    console.log("🔹 Latitude:", shopGoogleMap.lat);
    console.log("🔹 Longitude:", shopGoogleMap.lng);
  }

  if (!shopName || !shopAddress || !shopGoogleMap || !shopGoogleMap.lat || !shopGoogleMap.lng || !shopContact || !shopImage) {
    console.log('❌ Missing fields:', { shopName, shopAddress, shopGoogleMap, shopContact, shopImage });
    return res.status(400).json({ error: 'All fields are required, including a valid map location' });
  }

  try {
    const newShop = new Shop({
      shopname: shopName,
      shopAddress,
      googleMapLoc: { // Save as googleMapLoc in DB
        lat: shopGoogleMap.lat,
        lng: shopGoogleMap.lng
      },
      shopContact,
      shopImage,
      description,
      addedBy: req.user._id
    });

    await newShop.save();
    console.log("✅ Shop added successfully:", newShop);
    return res.status(201).json({ message: 'Shop added successfully', shop: newShop });
  } catch (error) {
    console.error('⚠️ Error adding shop:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
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
    const shop = await Shop.findById(req.params.id).populate('comments.user', 'name');;
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

// const Updateshop = async (req, res) => {
//   const id=req.params.id;
  
//   const { shopName, shopLocation, shopContact, shopImage } = req.body;
//   Shop.findOneAndUpdate({_id:id},{shopname:shopName,shopAddress:shopLocation,shopContact:shopContact,shopImage:shopImage})
//   .then((shop)=>{
//     res.json(shop)
//   })
//   .catch((error)=>{
//     console.log(error)
//   })
//   if (!shopName || !shopLocation || !shopContact || !shopImage) {
//     console.log('Missing fields:', { shopName, shopLocation, shopContact, shopImage });
//     return res.status(400).json({ error: 'All fields are required' });
//   }
  
// };
const Updateshop = async (req, res) => {
  const id = req.params.id;
  const { shopName, shopLocation, shopContact, shopImage, description, googleMapLoc } = req.body; // Include googleMapLoc

  if (!shopName || !shopLocation || !shopContact || !shopImage || !description || !googleMapLoc) {
    console.log('Missing fields:', { shopName, shopLocation, shopContact, shopImage, description, googleMapLoc });
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedShop = await Shop.findOneAndUpdate(
      { _id: id },
      {
        shopname: shopName,
        shopAddress: shopLocation,
        shopContact: shopContact,
        shopImage: shopImage,
        description: description,
        googleMapLoc: googleMapLoc // Update location
      },
      { new: true }
    );

    if (!updatedShop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    console.log("✅ Shop updated successfully:", updatedShop);
    res.json(updatedShop);
  } catch (error) {
    console.error('⚠️ Error updating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const Deleteshop = async (req, res) => {
  const  id  = req.params.id;
  console.log(`Deleting shop with ID: ${id}`);
  Shop.findByIdAndDelete({_id:id})
  .then((result) => {res.json(result)})
  .catch((err) => {res.json(err)});
};




const likeShop = async (req, res) => {
  const { shopId } = req.params;
  const userId = req.user._id;

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    if (shop.likes.includes(userId)) {
      return res.status(400).json({ error: 'You have already liked this shop' });
    }

    shop.likes.push(userId);
    await shop.save();

    res.status(200).json(shop);
  } catch (error) {
    console.error('Error liking shop:', error);
    res.status(500).json({ error: 'Failed to like shop' });
  }
};

const unlikeShop = async (req, res) => {
  const { shopId } = req.params;
  const userId = req.user._id;

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    if (!shop.likes.includes(userId)) {
      return res.status(400).json({ error: 'You have not liked this shop' });
    }

    shop.likes = shop.likes.filter(id => id.toString() !== userId.toString());
    await shop.save();

    res.status(200).json(shop);
  } catch (error) {
    console.error('Error unliking shop:', error);
    res.status(500).json({ error: 'Failed to unlike shop' });
  }
};

const addComment = async (req, res) => {
  const { shopId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    const comment = {
      user: userId,
      text,
      createdAt: new Date()
    };

    shop.comments.push(comment);
    await shop.save();

    res.status(200).json(shop);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};









module.exports = { Getshops, Addshops, getShopById ,Updateshop,Deleteshop,likeShop,unlikeShop,addComment};