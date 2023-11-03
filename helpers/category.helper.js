const Category = require("../models/Category")

//** Category will be added
const addCategory = async (data) => await Category.create({ ...data })

// ** Check if Category exists
const checkCategoryExists = async (name) => await Category.exists({ name })

// ** Check if Category exists by ID
const checkCategoryExistsById = async (id) => await Category.findById(id)

// ** Get all Category
const allCategoryList = async () => await Category.find()

// ** Edit blog
const updateCategory = async (id, data) => await Category.findByIdAndUpdate(id, { ...data })

// ** Delete blog
const removeCategory = async (id) => await Category.findByIdAndDelete(id)


module.exports = {
    addCategory,
    checkCategoryExists,
    allCategoryList,
    checkCategoryExistsById,
    updateCategory,
    removeCategory
}