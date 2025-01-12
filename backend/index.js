const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
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

// Home route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Register route
app.post('/register', async (req, res) => {
  console.log("i hv reached here backend")
  const { name, password, email, phone_no, profilepic } = req.body;

  try {
    // Ensure all required fields are present
    if (!name || !password || !email || !phone_no || !profilepic) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new user document
    const user = new User({
      name,
      password,  // Optionally hash the password before saving
      email,
      phone_no,
      profilepic  // Save the Cloudinary URL passed from frontend
    });

    // Save the user to the database
    await user.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully', user });

  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
});

// Handle unknown routes
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
