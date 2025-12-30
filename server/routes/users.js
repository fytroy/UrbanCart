const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { firstName, lastName, phone, updatedAt: new Date() },
      { new: true }
    );
    
    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add address
router.post('/address', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    user.addresses.push({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    
    await user.save();
    res.json({ message: 'Address added', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get wishlist
router.get('/wishlist', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('wishlist');
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to wishlist
router.post('/wishlist/add/:productId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId);
      await user.save();
    }
    res.json({ message: 'Added to wishlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
