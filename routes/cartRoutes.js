const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/', addToCart);
router.get('/', getCart);

module.exports = router;