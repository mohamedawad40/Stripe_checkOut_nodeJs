const express = require('express');
const router = express.Router();
const subscribeController = require('../controllers/subscribeController');

// Route to handle subscription
router.get('/subscribe', subscribeController.subscribe);

module.exports = router;
// This code sets up a route for handling subscription requests in an Express application.