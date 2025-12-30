const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    price: Number,
    quantity: Number,
    variant: Object
  }],
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  billingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  discount: Number,
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'card', 'wallet'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'outForDelivery', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  deliverySlot: {
    date: Date,
    timeSlot: String
  },
  trackingNumber: String,
  deliveryAgent: {
    name: String,
    phone: String,
    vehicleNumber: String
  },
  notes: String,
  codVerificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  failedDeliveryAttempts: {
    type: Number,
    default: 0
  },
  failedDeliveryReason: String,
  returnRequest: {
    requested: Boolean,
    reason: String,
    status: String
  },
  refundAmount: Number,
  refundStatus: String,
  statusHistory: [{
    status: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    comment: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
