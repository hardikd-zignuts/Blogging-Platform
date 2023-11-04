const { body } = require('express-validator');


const addBlogValidator = [
    body('title')
        .isString()
        .notEmpty()
        .withMessage('Title is required and must be a string'),
    body('slug')
        .isString()
        .notEmpty()
        .withMessage('Slug is required and must be a string'),
    body('category')
        .isString()
        .notEmpty()
        .withMessage('Category is required and must be a string'),
    body('description')
        .isString()
        .notEmpty()
        .withMessage('Description is required and must be a string'),
    body('thumbnail')
        .isString()
        .notEmpty()
        .withMessage('Thumbnail is required and must be a string'),
    body('publishedAt')
        .isDate()
        .notEmpty()
        .withMessage('PublishedAt is required and must be a Date object'),
]

module.exports = {
    addBlogValidator
}