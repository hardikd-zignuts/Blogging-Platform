//** Packages
const jsonwebtoken = require('jsonwebtoken');

//** Constants
const jwt_key = process.env.JWT_KEY

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.cookie.split('=')[1]
    try {
        const authUser = jsonwebtoken.verify(token, jwt_key)
        if (!authUser) return res.redirect('/error/403')
        req.user = authUser
        next()
    } catch (error) {
        return res.redirect('/error/403')
    }
}
const isAuthenticated = (req, res, next) => {
    if (!req.headers.cookie) return res.redirect('/error/403')
    const token = req.headers.cookie.split('=')[1]
    try {
        const authUser = jsonwebtoken.verify(token, jwt_key)
        if (!authUser) {
            res.clearCookie("token");
            return res.redirect('/error/403')
        }
        req.user = authUser
        next()
    } catch (error) {
        res.clearCookie('token')
        return res.redirect('/error/403')
    }
}

module.exports = {
    verifyToken,
    isAuthenticated
}