// ** Dotenv Config
require("dotenv").config();

// ** Packages
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const { default: axios } = require("axios");

// ** Connection
const ConnectDB = require('./connections/db');

// ** Modules
const { auth, blog, category } = require('./routes/routes');
const { getBlog } = require("./controller/blog.controller");
const { isAuthenticated } = require("./middleware/middleware");

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
app.set("layout auth", false);
// app.set("layout admin", false);
app.use(express.static(path.join(__dirname, '/public')));
ConnectDB()

app.get('/', (req, res) => {
    res.redirect('/blog/all')
})
app.get('/auth/login', (req, res) => {
    res.render('pages/login', { layout: 'auth' })
})
app.get('/:slug', getBlog)

app.get('/error/403', (req, res) => {
    res.render('pages/403', { layout: 'auth' })
})
app.get('/admin/dashboard', isAuthenticated, (req, res) => {
    res.render('pages/dashboard', { layout: 'admin' })
})
app.get('/admin/blogs', isAuthenticated, async (req, res) => {
    try {
        const blogResponse = await axios.get('http://localhost:5000/blog/all/');
        const blogPosts = blogResponse.data;
        res.render('pages/tables', { layout: 'admin', blogPosts });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching blog data.');
    }
});


app.use('/blog', blog)
app.use('/api/auth', auth)
app.use('/admin/category', category)

// ** Server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

