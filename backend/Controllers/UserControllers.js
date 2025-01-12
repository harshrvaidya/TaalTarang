const User = require('../models/User');

// Register User Controller
const registerUser = async (req, res) => {
  console.log("Reached register controller");

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
      profilepic,
    });

    // Save the user to the database
    await user.save();

    // Send success response
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
};

module.exports = { registerUser };
