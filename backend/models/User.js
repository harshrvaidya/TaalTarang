const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone_no: { type: String, required: true },
  profilepic: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" } // ✅ New role field
});


UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email
    }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
  } catch (error) {
    console.error('Error generating token:', error);
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;