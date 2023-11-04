const { body } = require('express-validator');


const addCategoryValidator = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('Name is required and must be a string'),
]

module.exports = {
    addCategoryValidator
}