const mongoose = require('mongoose');


const uri = "mongodb://localhost:27017";
const ConnectDB = () =>
    mongoose
        .connect(uri, {
        })
        .then(() => console.log("Database connected!"))
        .catch(err => console.log(err));

module.exports = ConnectDB