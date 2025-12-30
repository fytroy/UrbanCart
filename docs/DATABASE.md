# Database Schema Documentation

## Collections Overview

### Users Collection

**Purpose**: Store user account information and preferences

```javascript
{
  _id: ObjectId,
  firstName: String,              // Required
  lastName: String,               // Required
  email: String,                  // Required, unique, indexed
  phone: String,                  // Required
  password: String,               // Hashed with bcrypt
  role: String,                   // 'user' or 'admin'
  profileImage: String,           // URL
  addresses: [
    {
      _id: ObjectId,
      type: String,               // 'home', 'office'
      name: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      isDefault: Boolean
    }
  ],
  wishlist: [ObjectId],           // References to Products
  orders: [ObjectId],             // References to Orders
  codFailureCount: Number,        // Default: 0
  isBlacklisted: Boolean,         // Default: false
  blacklistReason: String,
  phoneVerified: Boolean,         // Default: false
  emailVerified: Boolean,         // Default: false
  createdAt: Date,                // Auto
  updatedAt: Date                 // Auto
}
```

**Indexes**:
- `email` (unique)
- `phone`
- `createdAt`

---

### Products Collection

**Purpose**: Store product information and inventory

```javascript
{
  _id: ObjectId,
  name: String,                   // Required
  slug: String,                   // Auto-generated, unique
  description: String,            // Required
  shortDescription: String,
  category: ObjectId,             // Reference to Category
  subcategory: ObjectId,          // Reference to SubCategory
  price: Number,                  // Required
  originalPrice: Number,
  discount: Number,               // Percentage
  images: [
    {
      url: String,
      alt: String
    }
  ],
  sku: String,                    // SKU
  stock: Number,                  // Required
  lowStockThreshold: Number,      // Default: 10
  variants: [
    {
      name: String,               // 'Size', 'Color'
      options: [String]           // ['S', 'M', 'L']
    }
  ],
  specifications: [
    {
      key: String,
      value: String
    }
  ],
  rating: Number,                 // 0-5, default: 0
  reviewCount: Number,
  reviews: [ObjectId],            // References to Reviews
  relatedProducts: [ObjectId],
  seller: ObjectId,               // Reference to Seller
  isActive: Boolean,              // Default: true
  isFeatured: Boolean,            // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `slug` (unique)
- `category`
- `price`
- `rating`
- `createdAt`
- `name` (text index)

---

### Orders Collection

**Purpose**: Store customer orders and transaction details

```javascript
{
  _id: ObjectId,
  orderNumber: String,            // Unique, indexed
  user: ObjectId,                 // Reference to User
  items: [
    {
      product: ObjectId,
      name: String,
      price: Number,
      quantity: Number,
      variant: Object             // Selected variant choices
    }
  ],
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
    // Same structure as shippingAddress
  },
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  discount: Number,
  total: Number,                  // Required
  paymentMethod: String,          // 'cod', 'card', 'wallet'
  paymentStatus: String,          // 'pending', 'completed', 'failed', 'refunded'
  orderStatus: String,            // 'pending', 'confirmed', 'processing', 'shipped', 
                                  // 'outForDelivery', 'delivered', 'cancelled', 'returned'
  deliverySlot: {
    date: Date,
    timeSlot: String              // 'morning', 'afternoon', 'evening'
  },
  trackingNumber: String,
  deliveryAgent: {
    name: String,
    phone: String,
    vehicleNumber: String
  },
  notes: String,
  codVerificationStatus: String,  // 'pending', 'verified', 'rejected'
  failedDeliveryAttempts: Number, // Default: 0
  failedDeliveryReason: String,
  returnRequest: {
    requested: Boolean,
    reason: String,
    status: String                // 'pending', 'approved', 'rejected'
  },
  refundAmount: Number,
  refundStatus: String,           // 'pending', 'processed', 'failed'
  statusHistory: [
    {
      status: String,
      timestamp: Date,
      comment: String
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `orderNumber` (unique)
- `user`
- `orderStatus`
- `paymentMethod`
- `createdAt`

---

### Cart Collection

**Purpose**: Store user shopping carts

```javascript
{
  _id: ObjectId,
  user: ObjectId,                 // Reference to User, unique
  items: [
    {
      _id: ObjectId,
      product: ObjectId,
      quantity: Number,           // Min: 1
      variant: Object,            // Selected options
      addedAt: Date
    }
  ],
  subtotal: Number,               // Default: 0
  tax: Number,
  discount: Number,
  total: Number,
  couponApplied: ObjectId,
  expiresAt: Date,                // 30 days from creation
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `user` (unique)
- `expiresAt` (TTL index)

---

### Categories Collection

**Purpose**: Store product categories

```javascript
{
  _id: ObjectId,
  name: String,                   // Required, unique
  slug: String,                   // Auto-generated, unique
  description: String,
  image: String,                  // URL
  icon: String,                   // URL
  isActive: Boolean,              // Default: true
  createdAt: Date
}
```

**Indexes**:
- `slug` (unique)
- `name`

---

### Reviews Collection

**Purpose**: Store product reviews

```javascript
{
  _id: ObjectId,
  product: ObjectId,              // Reference to Product
  user: ObjectId,                 // Reference to User
  rating: Number,                 // 1-5, required
  title: String,
  comment: String,
  images: [String],               // URLs
  helpful: Number,                // Vote count
  notHelpful: Number,
  isVerifiedPurchase: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `product`
- `user`
- `rating`
- `createdAt`

---

### DeliveryZones Collection

**Purpose**: Define delivery areas and costs

```javascript
{
  _id: ObjectId,
  name: String,                   // Required, unique
  description: String,
  cities: [String],
  postalCodes: [String],
  baseCost: Number,               // Default: 0
  freeDeliveryAbove: Number,      // Amount
  deliveryDays: Number,           // Default: 2
  isCODAvailable: Boolean,        // Default: true
  maxCODAmount: Number,           // Max order value for COD
  isActive: Boolean,              // Default: true
  createdAt: Date
}
```

**Indexes**:
- `name` (unique)
- `cities`
- `postalCodes`

---

### Settings Collection

**Purpose**: Store application settings

```javascript
{
  _id: ObjectId,
  storeName: String,
  storeEmail: String,
  storePhone: String,
  storeAddress: String,
  logoUrl: String,
  faviconUrl: String,
  
  // Payment Settings
  enableCOD: Boolean,             // Default: true
  enableCardPayment: Boolean,
  enableWallet: Boolean,
  codMaxOrderValue: Number,
  
  // Tax Settings
  taxPercentage: Number,
  
  // Currency
  currency: String,               // Default: 'INR'
  
  // Shipping
  freeShippingAbove: Number,
  baseShippingCost: Number,
  
  // Notifications
  emailNotificationsEnabled: Boolean,
  smsNotificationsEnabled: Boolean,
  
  // Policies
  returnPeriodDays: Number,
  
  updatedAt: Date
}
```

---

## Relationships

```
User
├── Orders (One-to-Many)
├── Cart (One-to-One)
└── Reviews (One-to-Many)

Product
├── Category (Many-to-One)
├── Reviews (One-to-Many)
├── Orders > Items (Many-to-Many)
└── RelatedProducts (Many-to-Many)

Order
├── User (Many-to-One)
├── Products (Many-to-Many via items)
└── DeliveryZone (Many-to-One via city/postal)

Category
└── Products (One-to-Many)
```

## Backup Strategy

- Daily automated backups
- Weekly full backups
- Monthly archives
- Retention: 1 year
- Backup location: Separate region

## Performance Considerations

1. **Indexing**: Create indexes on frequently queried fields
2. **Pagination**: Always paginate large result sets
3. **Denormalization**: Store some data (like product name in orders) for performance
4. **TTL Index**: Automatic cart deletion after expiry
5. **Sharding**: Consider sharding by `user._id` for large scale

## Data Validation

- Email format validation
- Phone number format
- Price > 0
- Stock >= 0
- Rating 0-5
- Password minimum 6 characters

---

**Last Updated**: December 2025
