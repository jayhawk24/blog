const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');
const Comment = require('../models/comment');

router.get('/blog', async (req, res) => {
    const blogs = await Blog.find({});
    res.render('blog', { blogs });
});

router.get('/blog/new', (req, res) => {
    res.render('new');
});

router.post('/blog', async (req, res) => {
    await Blog.create(req.body);
    res.redirect('/blog');
});

router.get('/blog/:id/', async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate('comments');
    res.render('show', { blog });
});

// update ------------

router.get('/blog/:id/edit', async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.render('edit', { blog });
});

router.patch('/blog/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndUpdate(id, req.body);
    res.redirect(`/blog/${id}`);
});

// delelte blog

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect('/blog');
});

// Create a new Comment --------------------------------------------------

router.post('/blog/:id/comment', async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const comment = new Comment(req.body);
    blog.comments.push(comment);

    await comment.save();
    await blog.save();
    res.redirect(`/blog/${id}`);
});

module.exports = router;
