const express = require('express');
const morgan = require('morgan');
const logRoutes = require('./routes/logRoutes');

const app = express();

// Middlewares
app.use(morgan('dev'));

// Routes
app.use('/', logRoutes);

// Error handling for unmatched routes
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1>');
});

module.exports = app;
