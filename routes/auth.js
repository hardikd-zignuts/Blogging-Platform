const express = require('express');
//** Packages
const { loginValidator } = require('../validators/auth');

//** Modals
const { login } = require('../controller/auth.controller');


// ** Router
const router = express.Router()

// ** API Routes
router.route('/login')
    .post(loginValidator, login)


module.exports = router