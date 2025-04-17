const Shop = require('../models/Shops');



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
      addedBy: req.user._id,
      verified: false,
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


const Updateshop = async (req, res) => {
  const id = req.params.id;
  const { shopName, shopLocation, shopContact, shopImage, description, googleMapLoc, } = req.body; // Include googleMapLoc

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
        googleMapLoc: googleMapLoc,
        verified: false, // Reset verified status to false // Update location
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

//add to fav
const addToFavorites = async (req, res) => {
  const { id } = req.params; // Shop ID
  const userId = req.user._id; // User ID from the authenticated request

  try {
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Check if the shop is already in the user's favorites
    if (shop.favorites.includes(userId)) {
      return res.status(400).json({ error: 'Shop is already in your favorites' });
    }
    // Add the user to the favorites list
    shop.favorites.push(userId);
    await shop.save();

    res.status(200).json({ message: 'Shop added to favorites', shop });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ error: 'Failed to add shop to favorites' });
  }
};

const getFavoriteShops = async (req, res) => {
  const userId = req.user._id; // User ID from the authenticated request

  try {
    const favoriteShops = await Shop.find({ favorites: userId });
    res.status(200).json(favoriteShops);
  } catch (error) {
    console.error('Error fetching favorite shops:', error);
    res.status(500).json({ error: 'Failed to fetch favorite shops' });
  }
};

const removeFromFavorites = async (req, res) => {
  const { id } = req.params; // Shop ID
  const userId = req.user._id; // User ID from the authenticated request

  try {
    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Check if the shop is in the user's favorites
    if (!shop.favorites.includes(userId)) {
      return res.status(400).json({ error: 'Shop is not in your favorites' });
    }

    // Remove the user from the favorites list
    shop.favorites = shop.favorites.filter((favUserId) => favUserId.toString() !== userId.toString());
    await shop.save();

    res.status(200).json({ message: 'Shop removed from favorites', shop });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ error: 'Failed to remove shop from favorites' });
  }
};


const rateShop = async (req, res) => {
  const { shopId } = req.params;
  const { rating } = req.body;
  const userId = req.user._id;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Check if the user has already rated the shop
    const existingRating = shop.ratings.find((r) => r.user.toString() === userId.toString());
    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add a new rating
      shop.ratings.push({ user: userId, rating });
    }

    // Calculate the average rating
    const totalRatings = shop.ratings.reduce((sum, r) => sum + r.rating, 0);
    shop.averageRating = totalRatings / shop.ratings.length;

    await shop.save();

    res.status(200).json({ message: 'Rating submitted successfully', shop });
  } catch (error) {
    console.error('Error rating shop:', error);
    res.status(500).json({ error: 'Failed to rate shop' });
  }
};





module.exports = { Getshops, Addshops, getShopById ,Updateshop,Deleteshop,likeShop,unlikeShop,addComment,addToFavorites,getFavoriteShops,removeFromFavorites,rateShop};