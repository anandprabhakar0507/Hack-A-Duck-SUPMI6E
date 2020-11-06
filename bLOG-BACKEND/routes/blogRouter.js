const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/:id')
  .get(blogController.getBlog)
  .patch(blogController.uploadImage, blogController.updateBlog);
router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(blogController.uploadImage, blogController.addBlog);

module.exports = router;
