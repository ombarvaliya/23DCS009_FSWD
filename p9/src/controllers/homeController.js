// src/controllers/homeController.js

exports.getHome = (req, res) => {
  // keep it simple for POC; return plain text
  res.status(200).send('Welcome to our site');
};
