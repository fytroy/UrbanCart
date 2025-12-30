const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const DeliveryZone = require('../models/DeliveryZone');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Admin routes - require authentication and admin role (optional for testing)
// router.use(authMiddleware, adminMiddleware);

// Dashboard metrics
router.get('/dashboard', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    const codOrders = await Order.countDocuments({ paymentMethod: 'cod' });
    const cardOrders = await Order.countDocuments({ paymentMethod: 'card' });
    
    const totalCustomers = await User.countDocuments({ role: 'user' });
    
    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      codOrders,
      cardOrders,
      totalCustomers
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Manage orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'firstName lastName email phone')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
router.put('/orders/:orderId/status', async (req, res) => {
  try {
    const { status, comment } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        orderStatus: status,
        $push: {
          statusHistory: {
            status,
            comment,
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );
    
    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Manage products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add product
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Manage customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Blacklist customer
router.put('/customers/:userId/blacklist', async (req, res) => {
  try {
    const { reason } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        isBlacklisted: true,
        blacklistReason: reason
      },
      { new: true }
    );
    
    res.json({ message: 'Customer blacklisted', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
