const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    shopname: {
        type: String,
        required: true,
        trim: true // Removes extra spaces
    },
    shopAddress: {
        type: String,
        required: true,
        trim: true
    },
    shopContact: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"] // Validates phone numbers
    },
    shopImage: {
        type: String,
        required: true
    },
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' // Links to the User who added the shop
    }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;
