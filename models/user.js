// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For JWT authentication

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Default role is user
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Hash password before saving to the database
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords (used for login)
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, role: this.role }, // Payload includes user ID and role
    process.env.JWT_SECRET, // You should have a secret in your environment variables
    { expiresIn: '1h' }
  );
  return token;
};

module.exports = mongoose.model('User', userSchema);
