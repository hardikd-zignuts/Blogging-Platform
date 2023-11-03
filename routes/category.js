//** Packages
const express = require('express');

//** Modals
const { verifyToken, isAuthenticated } = require('../middleware/middleware');

//** Controller
const { addCategoryValidator } = require('../validators/category');
const { createCategory, allCategory, editCategory, deleteCategory } = require('../controller/category.controller');

// ** Router
const router = express.Router()

// ** API Routes
router.route('/all')
    .get(allCategory)

router.route('/create')
    .all(verifyToken)
    .post(addCategoryValidator, createCategory)


router.route('/:id')
    .all(verifyToken)
    .patch(addCategoryValidator, editCategory)
    .delete(deleteCategory)

module.exports = router