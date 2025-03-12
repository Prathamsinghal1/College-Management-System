const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  occupation: { type: String },
  role: { type: String, default: 'user' },
  avatar: {
    type: String,
  },
  blogList: [
    {
      type: mongoose.Schema.Types.ObjectId, // Reference to Blog model
      ref: 'Blog', // Name of the related model
    },
  ],
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);
module.exports = User;
