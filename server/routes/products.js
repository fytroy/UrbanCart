const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getFeaturedProducts, getCategories } = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);

// Protected routes (admin only)
router.post('/', protect, restrictTo('admin'), createProduct);
router.put('/:id', protect, restrictTo('admin'), updateProduct);
router.delete('/:id', protect, restrictTo('admin'), deleteProduct);

module.exports = router;
