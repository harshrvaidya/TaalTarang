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
  googleMapLoc: {
    lat: { type: Number, required: true }, // Latitude
    lng: { type: Number, required: true }  // Longitude
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  addedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // Links to the User who added the shop
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the shop
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Shop = mongoose.model('Shop', ShopSchema);
module.exports = Shop;
