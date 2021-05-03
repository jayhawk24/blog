const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const sessions = require('express-session');
const blogRoutes = require('./routes/blog');
const flash = require('connect-flash');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'secretSociety',
    resave: false,
    saveUninitialized: true
};

app.use(sessions(sessionConfig));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

// Seed database
// const seedDB = require('./seed');
// seedDB();

app.get('/', (req, res) => {
    res.render('index');
});
app.use(blogRoutes);

app.listen(3000, () => {
    console.log('Running on port 3000');
});
