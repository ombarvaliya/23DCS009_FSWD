// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  // log for debugging; later replace with proper logger
  console.error(err);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};
