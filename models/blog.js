const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments'
        }
    ]
});

const Blog = mongoose.model('blogs', blogSchema);

module.exports = Blog;
