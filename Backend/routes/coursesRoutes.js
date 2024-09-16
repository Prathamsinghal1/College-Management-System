const express = require('express');
const router = express.Router();
const Course = require('../models/courseModel');
const authenticateJWT = require('../middleware/authMiddleware');

// Add a course
router.post('/', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { code, name, department, credits, enrollment, schedule } = req.body;

  try {
    const course = new Course({ code, name, department, credits, enrollment, schedule });
    await course.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding course', error });
  }
});

// Update a course
router.put('/:courseId', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { courseId } = req.params;
  const { code, name, department, credits, enrollment, schedule } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.code = code || course.code;
    course.name = name || course.name;
    course.department = department || course.department;
    course.credits = credits || course.credits;
    course.enrollment = enrollment || course.enrollment;
    course.schedule = schedule || course.schedule;

    await course.save();
    res.status(200).json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
});

// Delete a course
router.delete('/:courseId', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'faculty') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.remove();
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
});

// Get all courses
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses', error });
  }
});

module.exports = router;
