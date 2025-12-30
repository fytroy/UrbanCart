const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profileImage: String,
  addresses: [{
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    isDefault: Boolean
  }],
  wishlist: [mongoose.Schema.Types.ObjectId],
  orders: [mongoose.Schema.Types.ObjectId],
  codFailureCount: {
    type: Number,
    default: 0
  },
  isBlacklisted: {
    type: Boolean,
    default: false
  },
  blacklistReason: String,
  phoneVerified: {
    type: Boolean,
    default: false
  },
  emailVerified: {
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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
