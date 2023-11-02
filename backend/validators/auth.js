const { body } = require('express-validator');


const loginValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The Password field is required').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
]


module.exports = {
    loginValidator
}