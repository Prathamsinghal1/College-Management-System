const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const { authenticateToken } = require('../middleware/authMiddleware');


// Create a new blog
router.post('/', authenticateToken, async (req, res) => {
  const { title, status, mapData } = req.body;
  const createdBy = req.user.id;

  try {
    const blog = new Blog({ title, status, mapData, createdBy });
    await blog.save();

    // Add blog to user's blog list
    await User.findByIdAndUpdate(createdBy, { $push: { blogList: blog._id } });

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
});

// Get all blogs for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const blogs = await Blog.find({ createdBy: req.user.id });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
});

// Get a single blog by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
});

// Update a blog
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, status, mapData } = req.body;

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { title, status, mapData },
      { new: true }
    );

    if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

    res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
});

// Delete a blog
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });

    if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

    // Remove the blog from the user's blog list
    await User.findByIdAndUpdate(req.user.id, { $pull: { blogList: blog._id } });

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
});


// Request review to make a blog public
router.post('/request-review/:id', authenticateToken, async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.id, createdBy: req.user.id });
  
      if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });
      if (blog.status === 'public') return res.status(400).json({ message: 'Blog is already public' });
  
      blog.reviewRequest.isRequested = true;
      blog.reviewRequest.adminResponse = 'Pending';
      await blog.save();
  
      res.status(200).json({ message: 'Review request submitted successfully', blog });
    } catch (error) {
      res.status(500).json({ message: 'Error requesting review', error });
    }
  });

  
module.exports = router;
