const User = require('../models/User');
const bcrypt = require('bcryptjs');
// Register User Controller
const registerUser = async (req, res) => {
  console.log("Reached register controller");

  const { name, password, email, phone_no, profilepic } = req.body;

  try {
    // Ensure all required fields are present
    if (!name || !password || !email || !phone_no || !profilepic) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user document
    const user = new User({
      name,
      password:hashedPassword, // Optionally hash the password before saving
      email,
      phone_no,
      profilepic,
    });

    // Save the user to the database
    await user.save();

    // Generate a token (ensure the generateToken method is implemented in your User model)
    const token = await user.generateToken();

    // Send success response
    return res
      .status(201)
      .json({ message: 'User registered successfully', user, token, myUserid: user._id.toString() });
  } catch (err) {
    console.error('Error during registration:', err);
    return res.status(500).json({ error: 'Failed to register user. Please try again later.' });
  }
};
//end of register func hence exported it

const login=async(req,res)=>{
  try{
const{email,password}=req.body;
const userexist=await User.findOne({email})// check db if the email exist 
if(!userexist)
{
  return res.status(400).json({message:"invalid credentials"})

}
const user=await bcrypt.compare(password,userexist.password)
if (user){
  res.status(200).json({
    message:"login successful",
    token:await userexist.generateToken(),
     myUserid: userexist._id.toString(),
     username: userexist.name, // i am also sending the username and profile pic needed for the landing page
     profilePic: userexist.profilepic 
  })
}
else{
  res.status(401).json({
    message:"Inavlid"
  
  })
}

  }
  catch(error)
  {
    console.error()
  }
}
module.exports = { registerUser,login};
