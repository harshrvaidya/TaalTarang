const express = require('express');
const router = express.Router();
const Shop = require('../models/Shops');
const auth = require('../middleware/auth');

// ...existing code...

router.post('/addshop', auth, async (req, res) => {
    const { shopName, shopLocation, shopContact, shopImage } = req.body;

    if (!shopName || !shopLocation || !shopContact || !shopImage) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const newShop = new Shop({
            shopname: shopName,
            shopAddress: shopLocation,
            shopContact: shopContact,
            shopImage: shopImage,
            addedBy: req.user.id
        });

        const savedShop = await newShop.save();
        res.json(savedShop);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// ...existing code...

module.exports = router;
