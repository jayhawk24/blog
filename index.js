const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const Comment = require('./models/comment');
const seedDB = require('./seed');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

// Seed database
// seedDB();

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/blog', async (req, res) => {
    const blogs = await Blog.find({});
    res.render('blog', { blogs });
});

app.get('/blog/new', (req, res) => {
    res.render('new');
});

app.post('/blog', async (req, res) => {
    await Blog.create(req.body);
    res.redirect('/blog');
});

app.get('/blog/:id/', async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate('comments');
    console.log(blog);
    res.render('show', { blog });
});

// update ------------

app.get('/blog/:id/edit', async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.render('edit', { blog });
});

app.patch('/blog/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndUpdate(id, req.body);
    res.redirect(`/blog/${id}`);
});

// delelte blog

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect('/blog');
});

// Create a new Comment --------------------------------------------------

app.post('/blog/:id/comment', async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const comment = new Comment(req.body);
    blog.comments.push(comment);

    await comment.save();
    await blog.save();
    res.redirect(`/blog/${id}`);
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});
