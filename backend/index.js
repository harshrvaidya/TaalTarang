const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/UserRoutes'); // Ensure correct path
const shopRoutes = require('./Routes/Shop'); // Ensure correct path
const MarketplaceRoutes = require('./Routes/MarketplaceRoutes'); // Ensure correct path
const { auth } = require('./middleware/auth'); // Ensure correct path
const Shop = require('./models/Shops'); // Ensure correct path
const app = express();
const Product = require('./models/Product');




// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process with failure
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes); // Use shop routes
app.use('/api/products',MarketplaceRoutes);
// Home route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});







// Handle unknown routes
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});





// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});