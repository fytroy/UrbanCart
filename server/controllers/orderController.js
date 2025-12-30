const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, shippingCost } = req.body;
    const userId = req.user._id;
    
    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }
    
    // Calculate total and verify stock
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.product} not found` });
      }
      
      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }
      
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
      
      totalAmount += product.price * item.quantity;
    }
    
    // Add shipping cost
    totalAmount += shippingCost || 0;
    
    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;
    
    // Create order
    const order = await Order.create({
      orderNumber,
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });
    
    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }
    
    // Clear user's cart
    await Cart.deleteMany({ user: userId });
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'firstName lastName email phone');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    // Check authorization
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus })
      },
      { new: true, runValidators: true }
    ).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) query.orderStatus = status;
    
    const skip = (page - 1) * limit;
    const orders = await Order.find(query)
      .populate('user', 'firstName lastName email')
      .populate('items.product')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Order.countDocuments(query);
    
    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
