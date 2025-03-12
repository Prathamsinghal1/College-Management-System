const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: 'private' }, // private or public
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    mapData: [{
      key: { type: String, required: true },
      value: { type: String, required: true },
    }],
    reviewRequest: { 
      isRequested: { type: Boolean, default: false },
      adminResponse: { type: String }, // Approved, Rejected, Pending
      adminComments: { type: String }, // Feedback from admin
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
