const express = require('express');
const router = express.Router();

const { portfolio, updatePortfolio } = require('../controllers/portfolioController');
const { authenticateToken } = require('../controllers/tokenAuthController');

router.get('/portfolio', authenticateToken, portfolio);
router.put('/portfolio/update', authenticateToken, updatePortfolio);

module.exports = router;