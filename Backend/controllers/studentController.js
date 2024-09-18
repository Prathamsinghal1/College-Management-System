const Course = require('../models/courseModel');
const Student = require('../models/studentModel');

// Controller to add a new student
exports.addStudent = async (req, res) => {
  const { name, email, yearOfStudy, courses } = req.body;

  if (!name || !email || !yearOfStudy || !courses || courses.length === 0) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    console.log('Incoming course IDs:', courses); // Log incoming course IDs

    // Find ObjectIds for the course IDs
    const courseRecords = await Course.find({ _id: { $in: courses } }).select('_id name');
    console.log('Courses found:', courseRecords); // Log found courses

    // Check if we found all courses
    if (courseRecords.length !== courses.length) {
      const foundCourseIds = courseRecords.map(course => course._id.toString());
      const missingCourseIds = courses.filter(id => !foundCourseIds.includes(id));
      return res.status(400).json({ message: `Courses not found: ${missingCourseIds.join(', ')}` });
    }

    const courseIds = courseRecords.map(course => course._id);

    const newStudent = new Student({
      name,
      email,
      yearOfStudy,
      courses: courseIds, // Array of ObjectIds
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully!', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding student', error });
  }
};


// Controller to update a student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, yearOfStudy, courses } = req.body;

  // Validate required fields
  if (!name || !email || !yearOfStudy || !courses || !Array.isArray(courses) || courses.length === 0) {
    return res.status(400).json({ message: 'All fields are required and courses should be an array.' });
  }

  try {
    console.log('Incoming course IDs:', courses); // Log incoming course IDs

    // Find courses by their IDs
    const courseRecords = await Course.find({ '_id': { $in: courses } }).select('_id');
    console.log('Courses found:', courseRecords); // Log found course records

    // Check if we found all requested courses
    if (courseRecords.length !== courses.length) {
      const foundCourseIds = courseRecords.map(course => course._id.toString());
      const missingCourses = courses.filter(courseId => !foundCourseIds.includes(courseId));
      return res.status(400).json({ message: `Courses not found: ${missingCourses.join(', ')}` });
    }

    // Update the student
    const student = await Student.findByIdAndUpdate(
      id,
      { name, email, yearOfStudy, courses },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully!', student });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
};



// Controller to get all students
exports.getAllStudents = async (req, res) => {
  try {
    // Find all students and populate the 'courses' field to show course details
    const students = await Student.find().populate('courses'); // Populate courses with related data

    // Respond with the list of students
    res.status(200).json(students);
  } catch (error) {
    console.error('Error retrieving students:', error);

    // Send an error response if something goes wrong
    res.status(500).json({ message: 'Error retrieving students', error });
  }
};


// Controller to delete a student
exports.deleteStudent = async (req, res) => {
  const { id } = req.params; // Get student ID from request parameters

  try {
    // Find the student by ID and delete them
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      // If the student is not found, return a 404 response
      return res.status(404).json({ message: 'Student not found' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Student deleted successfully!' });
  } catch (error) {
    console.error('Error deleting student:', error);

    // Send an error response if something goes wrong
    res.status(500).json({ message: 'Error deleting student', error });
  }
};

exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id).populate('courses');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student', error });
  }
};
