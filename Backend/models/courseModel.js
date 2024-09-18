const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true // Ensures course code is stored in uppercase
  },
  name: { 
    type: String, 
    required: true 
  },
  department: { 
    type: String, 
    required: true,
    // Optionally restrict to certain department names
    enum: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'] // Example departments
  },
  credits: { 
    type: Number, 
    required: true,
    min: [0, 'Credits cannot be negative'], // Ensuring credits are positive
  },
  enrollment: { 
    type: Number, 
    required: true,
    min: [0, 'Enrollment cannot be negative'], // Ensuring enrollment is non-negative
  },
  schedule: { 
    type: String, // Consider changing this if schedule has a specific format
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
