// ** Dotenv Config
require("dotenv").config();

// ** Packages
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

// ** Connection
const ConnectDB = require('./db');

// ** Modules
const { auth, blog, category } = require('./routes/routes')

// ** Config
const app = express()

// ** Constant
const PORT = 5000

//** Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

ConnectDB()

app.get('/', (req, res) => {
    res.redirect('/blog/all')
})
app.use('/api/auth', auth)
app.use('/blog', blog)
app.use('/api/category', category)


// ** Server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

