const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  storeName: String,
  storeEmail: String,
  storePhone: String,
  storeAddress: String,
  logoUrl: String,
  faviconUrl: String,
  
  // Payment Settings
  enableCOD: {
    type: Boolean,
    default: true
  },
  enableCardPayment: {
    type: Boolean,
    default: false
  },
  enableWallet: {
    type: Boolean,
    default: false
  },
  codMaxOrderValue: {
    type: Number,
    default: 50000
  },
  
  // Tax Settings
  taxPercentage: {
    type: Number,
    default: 0
  },
  
  // Currency
  currency: {
    type: String,
    default: 'INR'
  },
  
  // Shipping
  freeShippingAbove: Number,
  baseShippingCost: Number,
  
  // Notifications
  emailNotificationsEnabled: {
    type: Boolean,
    default: true
  },
  smsNotificationsEnabled: {
    type: Boolean,
    default: false
  },
  
  // Policies
  returnPeriodDays: {
    type: Number,
    default: 30
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', settingsSchema);
