const { validationResult } = require("express-validator")
const { addBlog, checkBlogExists, allBlogsList, checkBlogExistsById, updateBlog, removeBlog, getBlogBySlug } = require("../helpers/blog.helper")

const allBlogs = async (req, res, next) => {
    const list = await allBlogsList()
    if (list) {
        // res.status(200).json({ blog: list })
        req.blogs = list
        next()
    }
    else { res.status(400).json({ message: 'Failed To Retrieve Blogs' }) }
}
const getBlog = async (req, res, next) => {
    if (!req.params.slug) res.status(400).json({ message: "Slug Not Found" })
    const { slug } = req.params
    const blogDetails = await getBlogBySlug(slug)
    if (blogDetails) {
        res.render('pages/details', {
            blog: blogDetails
        })
    } else {
        res.render('pages/404', {
            message: "Blog Not Found"
        })
    }
}
const createBlog = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { title, slug, category, description, publishedAt } = req.body
    const thumbnail = req.file.path
    const blogList = await checkBlogExists(slug)
    if (blogList) {
        res.status(400).json({ message: "Blog already exists" })
    } else {
        await addBlog({ title, slug, category, description, publishedAt, thumbnail }).then(() => {
            return res.redirect('/admin/blogs')
        })
    }
}
const editBlog = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { title, slug, category, description, publishedAt } = req.body
    const { id } = req.params
    const thumbnail = req.file.path

    const blogList = await checkBlogExistsById(id)
    if (blogList) {
        await updateBlog(id, { title, slug, category, description, publishedAt, thumbnail }).then(() => {
            return res.redirect('/admin/blogs')
        }).catch(() => {
            res.status(400).json({ message: "Slug already Exists" })
        })
    } else {
        res.status(400).json({ message: "Blog Not Found" })
    }
}
const deleteBlog = async (req, res, next) => {
    if (!req.params.id) res.status(400).json({ message: "Id Not Found" })
    const { id } = req.params
    const blogList = await checkBlogExistsById(id)
    if (blogList) {
        await removeBlog(id).then(() => {
            res.status(200).json({ message: "Blog Deleted" })
        }).catch(() => {
            res.status(400).json({ message: "Failed To Delete Blog" })
        })
    } else {
        res.status(404).json({ message: "Blog Not Found" })
    }
}

module.exports = {
    createBlog,
    allBlogs,
    editBlog,
    deleteBlog,
    getBlog
}