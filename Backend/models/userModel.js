const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'student' },
  course: { type: String, required: true },
  yearOfStudy: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
