// src/middleware/notFound.js
module.exports = (req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
};
