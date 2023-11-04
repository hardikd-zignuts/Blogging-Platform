const mongoose = require('mongoose');
const { String, Date } = mongoose.Schema.Types

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        // unique: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        required: true
    }
});

const Blog = mongoose.model('Blog', blogSchema);


module.exports = Blog