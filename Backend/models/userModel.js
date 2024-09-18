const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  avatar: {
    type: String,
    default: "https://www.flaticon.com/svg/static/icons/svg/913/9131529.svg", // Example placeholder image URL
  },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
  ]
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);
module.exports = User;
