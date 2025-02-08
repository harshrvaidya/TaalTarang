const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/UserRoutes'); // Ensure correct path
const shopRoutes = require('./routes/shops'); // Ensure correct path

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
app.use('/api/shops', shopRoutes); // Use shop routes

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