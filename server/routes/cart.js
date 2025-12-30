const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCart, removeFromCart, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

// Protected routes
router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/', protect, updateCart);
router.delete('/', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

module.exports = router;
