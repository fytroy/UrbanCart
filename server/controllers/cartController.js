const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product');
    
    if (!cart) {
      return res.status(200).json({
        success: true,
        data: { items: [], totalPrice: 0 }
      });
    }
    
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, variant } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    
    const existingItem = cart.items.find(
      item => item.product.toString() === productId && item.variant === variant
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        variant: variant || 'default'
      });
    }
    
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity, variant } = req.body;
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    const item = cart.items.find(
      item => item.product.toString() === productId && item.variant === variant
    );
    
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not in cart' });
    }
    
    if (quantity <= 0) {
      cart.items = cart.items.filter(
        item => !(item.product.toString() === productId && item.variant === variant)
      );
    } else {
      item.quantity = quantity;
    }
    
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId, variant } = req.body;
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    
    cart.items = cart.items.filter(
      item => !(item.product.toString() === productId && item.variant === variant)
    );
    
    await cart.save();
    
    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
