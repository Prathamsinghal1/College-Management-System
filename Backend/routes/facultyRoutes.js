const express = require('express');
const router = express.Router();
const Faculty = require('../models/facultyModel');
const authenticateJWT = require('../middleware/authMiddleware');

// Add a faculty
router.post('/', authenticateJWT, async (req, res) => {

  const { name, email, phoneNo, department, status } = req.body;

  if (!name || !email || !phoneNo || !department || !status) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const faculty = new Faculty({ name, email, phoneNo, department, status, role: 'faculty' });
    await faculty.save();
    res.status(201).json({ message: 'Faculty added successfully' });
  } catch (error) {
    console.error('Error adding faculty:', error);
    res.status(500).json({ message: 'Error adding faculty', error: error.message });
  }
});

// Get all faculty
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const faculty = await Faculty.find({ role: 'faculty' });
    res.json(faculty);
  } catch (error) {
    console.error('Error retrieving faculty:', error);
    res.status(500).json({ message: 'Error retrieving faculty', error: error.message });
  }
});


router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByIdAndDelete(id);

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty member not found' });
    }

    res.status(200).json({ message: 'Faculty member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting faculty member', error });
  }
});

// Get Faculty by ID
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findById(id);
    
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.status(200).json(faculty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update Faculty by ID
router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, phoneNo, status } = req.body;

    // Find the faculty member by ID and update the fields
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { name, email, department, phoneNo, status },
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedFaculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    res.status(200).json({ message: 'Faculty updated successfully', updatedFaculty });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
