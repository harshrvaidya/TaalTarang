const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/UserRoutes');
const Shop = require('./models/Shops'); // Import the Shop model
const authMiddleware = require('./middleware/auth'); // Import auth middleware

const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Routes
app.use('/api/users', userRoutes);

// Add shop route
app.post('/api/shops/addshop', authMiddleware, async (req, res) => {
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
});

// Fetch all shops route
app.get('/api/shops', async (req, res) => {
  try {
    const shops = await Shop.find().populate('addedBy', 'name'); // Populate the addedBy field with the name
    console.log('Fetched shops:', shops);
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Handle unknown routes
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
