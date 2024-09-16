const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Import route files
const authRoutes = require('./routes/authRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const coursesRoutes = require('./routes/coursesRoutes');

// Connect to MongoDB
const mongoUri = process.env.URI;

if (!mongoUri) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/auth', authRoutes);
app.use('/students', studentsRoutes);
app.use('/faculty', facultyRoutes);
app.use('/courses', coursesRoutes);

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
