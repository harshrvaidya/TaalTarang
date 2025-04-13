const Shop = require('../models/Shops');

const UpdateshopBYadmin = async (req, res) => {
  const id = req.params.id;
  const { shopName, shopLocation, shopContact, shopImage, description, googleMapLoc, verified } = req.body;

  // Validate required fields
  if (
    !shopName ||
    !shopLocation ||
    !shopContact ||
    !shopImage ||
    !description ||
    !googleMapLoc ||
    !googleMapLoc.lat ||
    !googleMapLoc.lng
  ) {
    console.log('Missing fields:', { shopName, shopLocation, shopContact, shopImage, description, googleMapLoc });
    return res.status(400).json({ error: 'All fields are required, including valid map coordinates' });
  }

  try {
    // Update the shop details
    const updatedShop = await Shop.findOneAndUpdate(
      { _id: id },
      {
        shopname: shopName,
        shopAddress: shopLocation,
        shopContact: shopContact,
        shopImage: shopImage,
        description: description,
        verified: verified, // Update verified status
        googleMapLoc: googleMapLoc, // Update location
      },
      { new: true } // Return the updated document
    );

    if (!updatedShop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    console.log('✅ Shop updated successfully:', updatedShop);
    res.json(updatedShop);
  } catch (error) {
    console.error('⚠️ Error updating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { UpdateshopBYadmin };