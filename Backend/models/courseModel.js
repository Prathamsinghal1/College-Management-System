const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  credits: { type: Number, required: true },
  enrollment: { type: Number, required: true },
  schedule: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
