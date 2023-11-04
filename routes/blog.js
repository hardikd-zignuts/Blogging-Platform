//** Packages
const express = require('express');
const multer = require('multer')

//** Modals
const { verifyToken } = require('../middleware/middleware');

//** Controller
const { createBlog, allBlogs, editBlog, deleteBlog } = require('../controller/blog.controller');
const { addBlogValidator } = require('../validators/blog');

// ** Router
const router = express.Router()


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

// ** API Routes
router.route('/all')
    .get(allBlogs)

router.route('/create')
    .all(verifyToken)
    .post(upload.single('thumbnail'), createBlog)

router.route('/:slug/:id')
    .all(verifyToken)
    .post(upload.single('thumbnail'), editBlog)
    .delete(deleteBlog)

module.exports = router