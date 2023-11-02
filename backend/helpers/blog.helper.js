const Blog = require("../models/Blog")

//** Blog will be added
const addBlog = async (data) => await Blog.create({ ...data })

// ** Check if blog exists
const checkBlogExists = async (slug) => await Blog.exists({ slug })

// ** Check if blog exists by ID
const checkBlogExistsById = async (id) => await Blog.findById(id)

// ** Get all blogs
const allBlogsList = async () => await Blog.find()

// ** Edit blog
const updateBlog = async (id, data) => await Blog.findByIdAndUpdate(id, { ...data })

// ** Delete blog
const removeBlog = async (id) => await Blog.findByIdAndDelete(id)

module.exports = { addBlog, checkBlogExists, allBlogsList, updateBlog, checkBlogExistsById, removeBlog }