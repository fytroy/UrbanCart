const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus, getAllOrders } = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/auth');

// Protected routes (user)
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getOrders);
router.get('/:id', protect, getOrderById);

// Protected routes (admin only)
router.get('/', protect, restrictTo('admin'), getAllOrders);
router.put('/:id/status', protect, restrictTo('admin'), updateOrderStatus);

module.exports = router;
