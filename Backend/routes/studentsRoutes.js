const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController'); // Correct import

// POST route for adding a student
router.post('/add', studentController.addStudent);

// GET route to get all students
router.get('/', studentController.getAllStudents);

router.get('/:id', studentController.getStudentById);

// PUT route to modify a student
router.put('/:id', studentController.updateStudent);

// DELETE route to delete a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
