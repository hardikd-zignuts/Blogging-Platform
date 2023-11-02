//** Packages
const express = require('express');

//** Modals
const { verifyToken } = require('../middleware/middleware');

//** Controller
const { createBlog, allBlogs, editBlog, deleteBlog, getBlog } = require('../controller/blog.controller');
const { addBlogValidator } = require('../validators/blog');

// ** Router
const router = express.Router()

// ** API Routes
router.route('/all')
    .get(allBlogs)

router.route('/create')
    .all(verifyToken)
    .post(addBlogValidator, createBlog)

router.route('/:slug/:id')
    .all(verifyToken)
    .patch(addBlogValidator, editBlog)
    .delete(deleteBlog)

module.exports = router