const User = require("../models/User")

const checkUser = async (email) => await User.findOne({ email })

module.exports = checkUser