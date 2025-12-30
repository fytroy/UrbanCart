const mongoose = require('mongoose');

const deliveryZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  cities: [String],
  postalCodes: [String],
  baseCost: {
    type: Number,
    default: 0
  },
  freeDeliveryAbove: Number,
  deliveryDays: {
    type: Number,
    default: 2
  },
  isCODAvailable: {
    type: Boolean,
    default: true
  },
  maxCODAmount: Number,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DeliveryZone', deliveryZoneSchema);
