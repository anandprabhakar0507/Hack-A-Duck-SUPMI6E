const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/:id')
  .get(blogController.getBlog)
  .patch(authController.protect, blogController.uploadImage, blogController.updateBlog)
  .delete(authController.protect, blogController.deleteBlog);
router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(authController.protect, blogController.uploadImage, blogController.addBlog);

module.exports = router;
