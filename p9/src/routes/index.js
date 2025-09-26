// src/routes/index.js
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// GET /  -> Welcome message
router.get('/', homeController.getHome);

module.exports = router;
