const express = require('express');
const router = express.Router();
const { viewLogs } = require('../controllers/logController');

// Route: GET /logs
router.get('/logs', viewLogs);

module.exports = router;
