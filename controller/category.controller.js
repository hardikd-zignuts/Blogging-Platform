const { validationResult } = require("express-validator")
const {
    checkCategoryExists,
    addCategory,
    allCategoryList,
    checkCategoryExistsById,
    updateCategory,
    removeCategory
} = require("../helpers/category.helper")


const allCategory = async (req, res, next) => {
    const list = await allCategoryList()
    if (list) {
        req.category = list
        next()
        // res.status(200).json({ category: list })
    }
    else {
        res.status(400).json({ message: 'Failed To Retrieve Category' })
    }
}
const createCategory = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name } = req.body

    const cateList = await checkCategoryExists(name)
    if (cateList) {
        res.status(400).json({ message: "Category exists" })
    } else {
        await addCategory({ name }).then(() => {
            return res.redirect('/admin/category')
        })
    }
}
const editCategory = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { name } = req.body
    const { id } = req.params

    const catList = await checkCategoryExistsById(id)
    if (catList) {
        if (catList.id !== id) return res.status(400).json({ message: "Category already Exists" })

        await updateCategory(id, { name }).then(() => {
            return res.redirect('/admin/category')
        }).catch(() => {
            res.status(400).json({ message: "Category already Exists" })
        })
    } else {
        res.status(400).json({ message: "Category Not Found" })
    }
}
const deleteCategory = async (req, res, next) => {
    if (!req.params.id) res.status(400).json({ message: "Id Not Found" })
    const { id } = req.params
    const catList = await checkCategoryExistsById(id)
    if (catList) {
        await removeCategory(id).then(() => {
            res.status(200).json({ message: "Category Deleted" })
        }).catch(() => {
            res.status(400).json({ message: "Failed To Delete Category" })
        })
    } else {
        res.status(404).json({ message: "Category Not Found" })
    }
}

module.exports = {
    createCategory,
    allCategory,
    editCategory,
    deleteCategory
}