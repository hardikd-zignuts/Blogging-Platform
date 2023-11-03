//** Packages
const { validationResult } = require('express-validator');
const jsonwebtoken = require('jsonwebtoken');

//** Modals
const checkUser = require('../helpers/user.helper');

//** Constants
const jwt_key = process.env.JWT_KEY

const login = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    const user = await checkUser(email)
    if (!user) {
        res.clearCookie("token");
        return res.render('pages/404', { message: "User Not Found" })
    }

    if (password !== user.password) {
        res.clearCookie("token");
        return res.render('pages/404', { message: "User Not Found" })
    }

    const signData = {
        id: user.id,
        name: user.name,
        email: user.email
    }
    const token = jsonwebtoken.sign(signData, jwt_key, {
        expiresIn: "10d"
    })

    res.cookie("token", token);
    return res.redirect('/admin/blogs')
}
const register = async (req, res, next) => {
    // User.find({ email: req.body.email }).then(user => {
    //     if (user.length > 0) {
    //         return res.status(400).json({ "message": "User already exists" })
    //     }
    //     User.create({
    //         email: req.body.email,
    //         password: req.body.password,
    //         name: req.body.name
    //     })
    //     return res.status(200).json({ "message": "Login Success" })
    // }).catch(err => {
    //     return res.status(400).json({ "message": "User already exists" })
    // })
}

module.exports = {
    login,
    register
}