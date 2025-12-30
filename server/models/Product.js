const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  shortDescription: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price']
  },
  originalPrice: Number,
  discount: Number,
  images: [{
    url: String,
    alt: String
  }],
  sku: String,
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity']
  },
  lowStockThreshold: {
    type: Number,
    default: 10
  },
  variants: [{
    name: String,
    options: [String]
  }],
  specifications: [{
    key: String,
    value: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  reviews: [mongoose.Schema.Types.ObjectId],
  relatedProducts: [mongoose.Schema.Types.ObjectId],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug from name
productSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
