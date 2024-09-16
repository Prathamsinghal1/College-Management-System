const express = require('express');
const router = express.Router();
const Faculty = require('../models/userModel');
const authenticateJWT = require('../middleware/authMiddleware');

// Add a faculty
router.post('/', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { name, email, phoneNo, department, status } = req.body;

  try {
    const faculty = new Faculty({ name, email, phoneNo, department, status, role: 'faculty' });
    await faculty.save();
    res.status(201).json({ message: 'Faculty added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding faculty', error });
  }
});

// Get all faculty
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const faculty = await Faculty.find({ role: 'faculty' });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving faculty', error });
  }
});

module.exports = router;
