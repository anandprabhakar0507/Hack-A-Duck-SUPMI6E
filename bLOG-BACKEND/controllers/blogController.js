const multer = require('multer');
const { Blog } = require('../models/blogModel');
const catchAsync = require('../utils/catchAsync');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'img/');
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    callback(null, file.originalname);
  },
});
const filter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type'), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: filter,
});

module.exports = {
  getAllBlogs: catchAsync(async (req, res, next) => {
    const blogs = await Blog.find();
    res.status(200).json({
      status: 'success',
      data: {
        blogs,
      },
    });
  }),
  addBlog: catchAsync(async (req, res, next) => {
    const newBlog = await Blog.create(req.body);
    if (req.file) {
      newBlog.image = req.file.filename;
      newBlog.save();
    }
    res.status(201).json({
      status: 'success',
      data: {
        newBlog,
      },
    });
  }),
  getBlog: catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        blog,
      },
    });
  }),
  updateBlog: catchAsync(async (req, res, next) => {
    let updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (req.file) {
      updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { image: req.file.filename },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    res.status(200).json({
      status: 'success',
      data: { updatedBlog },
    });
  }),
  uploadImage: upload.single('image'),
};
