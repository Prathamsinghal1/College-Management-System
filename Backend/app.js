const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

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
app.use('/faculty', facultyRoutes); // Ensure this line is present
app.use('/courses', coursesRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
