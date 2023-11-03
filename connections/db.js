const mongoose = require('mongoose');


const uri = process.env.DB_URL;
const ConnectDB = () =>
    mongoose
        .connect(uri, {
        })
        .then(() => console.log("Database connected!"))
        .catch(err => console.log(err));

module.exports = ConnectDB