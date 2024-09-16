const express = require('express');
const router = express.Router();
const Student = require('../models/userModel');
const authenticateJWT = require('../middleware/authMiddleware');

// Add a student
router.post('/add', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { name, email, course, yearOfStudy } = req.body;

  try {
    const student = new Student({ name, email, role: 'student', course, yearOfStudy });
    await student.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);  // Log the actual error
    res.status(500).json({ message: 'Error adding student', error });
  }
});


// Get all students
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const students = await Student.find({ role: 'student' });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving students', error });
  }
});

module.exports = router;
