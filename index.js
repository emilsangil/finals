// importing .env file
require('dotenv').config();

// import express
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

// Middleware to handle json and http request
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware Session
app.use(session(
    {
        secret: '1206',
        saveUninitialized: false,
        resave: false
    }
))

// Using the session to the routes
app.get('*', (req,res,next) => {
    res.locals.user = req.session.user || null
    next();
})

// using public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
const partyRouter = require('./routes/party');

// Use the routers
app.use('/', indexRouter);
app.use('/party', partyRouter);

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
})