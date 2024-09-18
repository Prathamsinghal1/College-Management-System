const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true },
  department: { type: String, required: true },
  status: { type: String, required: true },
  role: { type: String, default: 'faculty' } // Ensure this is set to 'faculty'
  
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
