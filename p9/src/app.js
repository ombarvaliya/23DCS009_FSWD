// src/app.js
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

// Middlewares
app.use(morgan('dev'));               // request logging (dev)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', routes);

// 404 handler (must be after routes)
app.use(require('./middleware/notFound'));

// Error handler (last)
app.use(require('./middleware/errorHandler'));

module.exports = app;
