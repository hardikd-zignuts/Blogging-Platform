//** Packages
const jsonwebtoken = require('jsonwebtoken');

//** Constants
const jwt_key = process.env.JWT_KEY

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    try {
        const authUser = jsonwebtoken.verify(token, jwt_key)
        if (!authUser) res.status(401).json({
            message: 'Unauthorized'
        })
        req.user = authUser
        next()
    } catch (error) {
        res.clearCookie('authToken')
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

module.exports = {
    verifyToken
}