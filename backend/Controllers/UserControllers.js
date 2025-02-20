const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register User Controller
const registerUser = async (req, res) => {
  console.log("Reached register controller");

  const { name, password, email, phone_no, profilepic } = req.body;

  try {
    // Ensure all required fields are present
    if (!name || !password || !email || !phone_no || !profilepic) {
      console.log('Missing fields:', { name, password, email, phone_no, profilepic });
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log('User already exists:', email);
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user document
    const user = new User({
      name,
      password: hashedPassword, // Hash the password before saving
      email,
      phone_no,
      profilepic,
    });

    // Save the user to the database
    await user.save();

    // Generate a token
    const token = await user.generateToken();

    // Send success response
    console.log('User registered successfully:', user);
    return res
      .status(201)
      .json({ message: 'User registered successfully', user, token, myUserid: user._id.toString() });
  } catch (err) {
    console.error('Error during registration:', err);
    return res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
};

// Login User Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email }); // Check if the email exists in the database
    if (!userExist) {
      console.log('Invalid credentials:', email);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (isPasswordValid) {
      const token = await userExist.generateToken();
      console.log('Login successful:', userExist);
      res.status(200).json({
        message: "Login successful",
        token,
        myUserid: userExist._id.toString(),
        username: userExist.name, // Send the username and profile pic needed for the landing page
        profilePic: userExist.profilepic
      });
    } else {
      console.log('Invalid credentials:', email);
      res.status(401).json({
        message: "Invalid credentials"
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to login. Please try again later.' });
  }
};

module.exports = { registerUser, login };