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
const { getBlog, allBlogs } = require("./controller/blog.controller");
const { isAuthenticated } = require("./middleware/middleware");
const { allCategory } = require("./controller/category.controller");

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
    res.redirect('/blogs')
})

app.get('/blogs', allBlogs, (req, res) => {
    res.render('pages/index', {
        blogs: req.blogs
    })
})
app.get('/auth/login', (req, res) => {
    if (req?.headers?.cookie) {
        return res.redirect('/admin/blogs')
    } else {
        return res.render('pages/login', { layout: 'auth' })
    }
})
app.get('/:slug', getBlog)

app.get('/error/403', (req, res) => {
    res.render('pages/403', { layout: 'auth' })
})
app.get('/admin/blogs', isAuthenticated, allBlogs, allCategory, async (req, res) => {
    res.render('pages/admin-blogs', { layout: 'admin', blogs: req.blogs, user: req.user, category: req.category });
});
app.get('/admin/add-blogs', isAuthenticated, allBlogs, allCategory, async (req, res) => {
    res.render('pages/admin-add-blogs', { layout: 'admin', blogs: req.blogs, user: req.user, category: req.category });
});
app.get('/admin/category', isAuthenticated, allCategory, async (req, res) => {
    res.render('pages/admin-category', { layout: 'admin', category: req.category, user: req.user });
});
app.get('/admin/add-category', isAuthenticated, allCategory, async (req, res) => {
    res.render('pages/admin-add-category', { layout: 'admin', category: req.category, user: req.user });
});


app.use('/blog', blog)
app.use('/api/auth', auth)
app.use('/api/category', category)

// ** Server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

