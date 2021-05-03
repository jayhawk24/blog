const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');
const Comment = require('../models/comment');

router.get('/blog', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.render('blog', { blogs });
    } catch (e) {
        console.log(e);
        req.flash('error', 'Cannot find this product.');
        res.redirect('/error');
    }
});

router.get('/blog/new', (req, res) => {
    try {
        res.render('new');
    } catch (e) {
        console.log(e);
        req.flash('error', 'Cannot create new product.');
        res.redirect('/error');
    }
});

router.post('/blog', async (req, res) => {
    try {
        await Blog.create(req.body);
        req.flash('success', 'Blog created successfully.');
        res.redirect('/blog');
    } catch (e) {
        console.log(e);
        req.flash('error', 'Cannot create this product.');
        res.redirect('/error');
    }
});

router.get('/blog/:id/', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate('comments');
        res.render('show', { blog });
    } catch (e) {
        console.log(e);
        req.flash('error', 'Cannot get this product.');
        res.redirect('/error');
    }
});

// update ------------

router.get('/blog/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.render('edit', { blog });
    } catch (e) {
        console.log(e);
        req.flash('error', 'Cannot update this product.');
        res.redirect('/blog');
    }
});

router.patch('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndUpdate(id, req.body);
        req.flash('success', 'Successfully updated blog.');
        res.redirect(`/blog/${id}`);
    } catch (e) {
        console.log(e);
        req.flash('error', 'Cannot update this product.');
        res.redirect('/error');
    }
});

// delelte blog

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        req.flash('success', 'Blog deleted successfully.');
        res.redirect('/blog');
    } catch (e) {
        console.log(e);
        req.flash('error', 'Cannot delete this product.');
        res.redirect('/error');
    }
});

// Create a new Comment --------------------------------------------------

router.post('/blog/:id/comment', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        const comment = new Comment(req.body);
        blog.comments.push(comment);

        await comment.save();
        await blog.save();
        res.redirect(`/blog/${id}`);
    } catch (e) {
        console.log(e);
        req.flash('error', 'Cannot create new comment.');
        res.redirect(`/blog/${id}`);
    }
});
router.get('/error', (req, res) => {
    res.status(500).render('error');
});
module.exports = router;
