const mongoose = require('mongoose');

exports.blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [2, 'Title is too Short'],
    required: [true, 'Blog must have a title'],
  },
  body: {
    type: String,
    minlength: [5, 'Blog is too short'],
    required: [true, 'Blog must have a body'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now().toString(),
  },
  image: {
    type: String,
  },
});

exports.Blog = mongoose.model('Blog', this.blogSchema);
