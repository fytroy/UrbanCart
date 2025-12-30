# UrbanCart - Ecommerce Platform Documentation

## Project Overview

UrbanCart is a complete, production-ready ecommerce platform designed specifically for markets where **Cash-on-Delivery (COD)** and cash transactions are dominant payment methods.

### Key Features
- **Product Management**: Catalog with categories, filters, search, and recommendations
- **User Accounts**: Registration, login, profile management, address book, wishlist
- **Shopping Cart**: Persistent cart with real-time calculations
- **Checkout**: 5-step streamlined checkout process
- **Order Tracking**: Real-time status updates and delivery tracking
- **Admin Panel**: Complete management system for products, orders, customers, and analytics
- **COD-Specific Features**: Phone verification, order limits, blacklist system, failed delivery tracking

## Project Structure

```
UrbanCart/
├── server/                 # Node.js/Express API
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth, validation
│   ├── utils/             # Helper functions
│   └── index.js           # Server entry point
├── client/                # React customer frontend
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── store/        # State management (Zustand)
│   │   └── styles/       # Tailwind CSS
│   └── package.json
├── admin/                 # React admin dashboard
│   ├── src/
│   │   ├── pages/        # Admin pages
│   │   ├── components/   # Admin components
│   │   └── hooks/        # Custom hooks
│   └── package.json
└── docs/                  # Documentation
    ├── API.md
    ├── DATABASE.md
    ├── DEPLOYMENT.md
    └── USER_MANUAL.md
```

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment**: Stripe (optional)
- **Image Storage**: Cloudinary
- **Email**: Nodemailer

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6

### Admin Dashboard
- **Charts**: Recharts
- **Icons**: React Icons
- **UI**: Tailwind CSS

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.0+
- npm or yarn

### Installation

1. **Backend Setup**
```bash
cd server
npm install
cp .env.example .env
# Configure .env with your settings
npm run dev
```

2. **Frontend Setup**
```bash
cd client
npm install
npm run dev
```

3. **Admin Setup**
```bash
cd admin
npm install
npm run dev
```

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}

Response: { token, user }
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { token, user }
```

### Product Endpoints

#### Get Products
```
GET /api/products?category=&minPrice=&maxPrice=&search=&sort=newest&page=1&limit=12

Response: { products[], pagination }
```

#### Get Product Details
```
GET /api/products/:id

Response: { product with reviews, related products }
```

### Cart Endpoints

#### Get Cart
```
GET /api/cart
Headers: Authorization: Bearer {token}

Response: { cart }
```

#### Add to Cart
```
POST /api/cart/add
Headers: Authorization: Bearer {token}
Body: { productId, quantity, variant }

Response: { message, cart }
```

#### Update Quantity
```
POST /api/cart/update/:itemId
Headers: Authorization: Bearer {token}
Body: { quantity }

Response: { message, cart }
```

#### Remove from Cart
```
POST /api/cart/remove/:itemId
Headers: Authorization: Bearer {token}

Response: { message, cart }
```

### Order Endpoints

#### Create Order
```
POST /api/orders/create
Headers: Authorization: Bearer {token}
Body: {
  "shippingAddress": { address fields },
  "paymentMethod": "cod|card",
  "deliverySlot": "Tomorrow 9AM-2PM",
  "notes": "optional notes"
}

Response: { message, order }
```

#### Get User Orders
```
GET /api/orders
Headers: Authorization: Bearer {token}

Response: [orders]
```

#### Get Order Details
```
GET /api/orders/:orderId
Headers: Authorization: Bearer {token}

Response: { order with items }
```

### Admin Endpoints (Requires admin role)

#### Dashboard Metrics
```
GET /api/admin/dashboard
Headers: Authorization: Bearer {admin_token}

Response: {
  totalOrders,
  totalRevenue,
  codOrders,
  cardOrders,
  totalCustomers
}
```

#### Get All Orders
```
GET /api/admin/orders
Headers: Authorization: Bearer {admin_token}

Response: [orders with customer details]
```

#### Update Order Status
```
PUT /api/admin/orders/:orderId/status
Headers: Authorization: Bearer {admin_token}
Body: { status, comment }

Response: { message, order }
```

#### Get Products
```
GET /api/admin/products
Headers: Authorization: Bearer {admin_token}

Response: [products]
```

#### Add Product
```
POST /api/admin/products
Headers: Authorization: Bearer {admin_token}
Body: {
  "name": "Product Name",
  "description": "...",
  "price": 5000,
  "stock": 100,
  "category": "categoryId",
  "images": [{ url, alt }]
}

Response: { message, product }
```

#### Get Customers
```
GET /api/admin/customers
Headers: Authorization: Bearer {admin_token}

Response: [users]
```

#### Blacklist Customer
```
PUT /api/admin/customers/:userId/blacklist
Headers: Authorization: Bearer {admin_token}
Body: { reason: "Repeated COD failures" }

Response: { message, user }
```

## Database Schema

### User
- firstName, lastName
- email (unique)
- phone
- password (hashed)
- role (user/admin)
- addresses[]
- wishlist[]
- codFailureCount
- isBlacklisted
- phoneVerified, emailVerified

### Product
- name, slug
- description, shortDescription
- category, subcategory
- price, originalPrice, discount
- images[]
- stock, lowStockThreshold
- variants[]
- specifications[]
- rating, reviewCount
- isFeatured

### Order
- orderNumber (unique)
- user
- items[]
- shippingAddress
- subtotal, tax, total
- paymentMethod (cod/card/wallet)
- paymentStatus
- orderStatus
- deliverySlot
- trackingNumber
- codVerificationStatus
- failedDeliveryAttempts
- statusHistory[]

### Cart
- user
- items[] (product, quantity, variant)
- subtotal, tax, discount, total
- expiresAt

### Category
- name, slug
- description
- image, icon
- isActive

### Review
- product
- user
- rating (1-5)
- comment, title
- images[]
- isVerifiedPurchase

### DeliveryZone
- name, cities, postalCodes
- baseCost, freeDeliveryAbove
- isCODAvailable, maxCODAmount
- isActive

### Settings
- storeName, storeEmail, storePhone
- enableCOD, enableCardPayment
- codMaxOrderValue
- taxPercentage
- currency
- returnPeriodDays

## COD-Specific Implementation

### Customer Verification Flow
1. Phone verification during registration
2. Order verification before shipping for orders above ₹10,000
3. Customer blacklist system for repeated failed COD deliveries

### Failed Delivery Handling
- Track failed delivery attempts
- Allow 3 attempts before refund
- Update customer's failureCount
- Automatic blacklist after 5 failures

### COD Order Limits
- Configurable maximum order value per zone
- Different limits based on delivery area
- Admin approval for high-value orders

### COD Success Rate Tracking
- Dashboard metrics for COD success rate
- Reports on failed deliveries vs successful ones
- Customer-wise COD history

## Features Checklist

### User Features
- [x] Product catalog with filters and search
- [x] Product detail pages with reviews
- [x] User registration and login
- [x] User dashboard with order history
- [x] Address book management
- [x] Wishlist functionality
- [x] Shopping cart (persistent)
- [x] 5-step checkout process
- [x] Order tracking
- [x] Real-time order status updates
- [x] Contact form and FAQ

### Admin Features
- [x] Dashboard with key metrics
- [x] Order management and status updates
- [x] Product management (CRUD)
- [x] Customer management
- [x] Delivery zone configuration
- [x] Settings management
- [x] Reports and analytics
- [x] Customer blacklist management

### COD Features
- [x] COD as primary payment method
- [x] Phone verification for COD orders
- [x] Order value limits per zone
- [x] Failed delivery tracking
- [x] Customer blacklist system
- [x] COD success rate analytics

## Security Features

- [x] JWT-based authentication
- [x] Bcrypt password hashing
- [x] HTTPS/SSL (production)
- [x] CORS protection
- [x] Rate limiting
- [x] SQL injection prevention
- [x] XSS protection (React)
- [x] Secure headers (Helmet.js)

## Performance Optimizations

- [x] Image optimization (Cloudinary)
- [x] Lazy loading for products
- [x] Browser caching
- [x] Database indexing
- [x] Pagination for large datasets
- [x] Responsive design (mobile-first)
- [x] Minification and bundling (Vite)

## Deployment

### Backend Deployment
- Host on: Heroku, AWS, DigitalOcean, or Railway
- Database: MongoDB Atlas
- Email Service: SendGrid or Gmail SMTP
- Image Storage: Cloudinary
- Domain: Custom domain with SSL

### Frontend Deployment
- Host on: Vercel, Netlify, or AWS CloudFront
- Build: `npm run build`
- Environment variables: API URL

### Admin Deployment
- Host on: Vercel, Netlify, or separate subdomain
- Build: `npm run build`

## Configuration

### Environment Variables

**Server (.env)**
```
MONGODB_URI=
JWT_SECRET=
PORT=5000
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
STRIPE_SECRET_KEY=
NODE_ENV=production
CORS_ORIGIN=
COD_MAX_ORDER_VALUE=50000
```

**Client (.env.local)**
```
VITE_API_URL=https://api.yourdomain.com/api
```

**Admin (.env.local)**
```
VITE_API_URL=https://api.yourdomain.com/api
```

## Maintenance

- Regular database backups
- Monitor error logs
- Update dependencies quarterly
- Security patch updates
- Performance monitoring
- Customer support logs

## Support & Contact

- Email: support@urbancart.com
- Phone: +1-800-CART-123
- Live chat: Available on website

## License

MIT License - See LICENSE file for details

## Future Enhancements

- [ ] Mobile apps (iOS/Android)
- [ ] Live chat support
- [ ] Advanced analytics
- [ ] Loyalty program
- [ ] Multi-vendor marketplace
- [ ] AR product preview
- [ ] AI recommendations
- [ ] Integration with shipping APIs
- [ ] Multi-language support
- [ ] Multi-currency support

---

**Last Updated**: December 2025
**Version**: 1.0.0
