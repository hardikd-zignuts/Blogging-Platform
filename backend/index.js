// ** Dotenv Config
require("dotenv").config();

// ** Packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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
app.set('view engine', 'ejs');

ConnectDB()

app.get('/', (req, res) => {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012 },
        { name: 'Tux', organization: "Linux", birth_year: 1996 },
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013 }
    ];
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    });
})


app.use('/api/auth', auth)
app.use('/api/blog', blog)
app.use('/api/category', category)


// ** Server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})

