const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken, checkAdminRole } = require('../middleware/authMiddleware');

// Register
router.post('/register', async (req, res) => {
  const { name, email, phoneNumber, password, occupation, role } = req.body;

  try {
    // Check if email or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phoneNumber: phoneNumber }],
    });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Phone Number already registered!' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email: email.toLowerCase(), phoneNumber, password: hashedPassword, occupation, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Get User Details by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Admin: Get All Review Requests
router.get('/review-requests', authenticateToken, checkAdminRole, async (req, res) => {
  try {
    const reviewRequests = await Blog.find({ 'reviewRequest.isRequested': true, status: 'private' })
      .populate('createdBy', 'name email');
    res.status(200).json(reviewRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review requests', error });
  }
});

// Admin: Respond to a Review Request
router.post('/respond-review/:id', authenticateToken, checkAdminRole, async (req, res) => {
  const { adminResponse, adminComments } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || !blog.reviewRequest.isRequested) {
      return res.status(404).json({ message: 'Review request not found' });
    }

    // Update status based on admin response
    if (adminResponse === 'Approved') blog.status = 'public';
    blog.reviewRequest = { isRequested: false, adminResponse, adminComments };

    await blog.save();
    res.status(200).json({ message: 'Review response submitted successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error responding to review', error });
  }
});

module.exports = router;
