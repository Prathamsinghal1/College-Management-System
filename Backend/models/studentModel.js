const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
  },
  courses: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course' // Referencing the Course model
  }],
  yearOfStudy: { 
    type: String, 
    required: true,
    // Restrict yearOfStudy to valid values (assuming it's 1 to 4)
    enum: ['1', '2', '3', '4'], 
    default: '1' // Optional: Set default value
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Student', studentSchema);
