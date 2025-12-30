# UrbanCart - Real-World E-Commerce Platform

## 🚀 Project Overview

UrbanCart is a **fully functional, production-ready e-commerce platform** built with React, Node.js, Express, and MongoDB. It simulates a real-world online shopping experience with realistic data, advanced features, and professional UI/UX.

### Key Features
- ✅ **Complete Product Catalog** - 12+ premium tech products with real pricing and specifications
- ✅ **User Authentication** - Secure JWT-based login and registration
- ✅ **Shopping Cart** - Add, update, remove items with real-time calculations
- ✅ **Order Management** - Create orders, track status, view history
- ✅ **Admin Dashboard** - Manage products, orders, and users
- ✅ **Multiple Payment Methods** - COD, Card, M-Pesa support
- ✅ **Product Reviews & Ratings** - Customer feedback system
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Real-Time Notifications** - Toast alerts for user actions
- ✅ **Advanced Filtering** - Search, category filter, price range, sorting

---

## 📁 Project Structure

```
UrbanCart/
├── client/                 # React Frontend (Port 3003)
│   ├── src/
│   │   ├── pages/         # 9 complete pages
│   │   ├── components/    # 12+ reusable components
│   │   ├── styles/        # Global CSS + Theme
│   │   ├── utils/         # Helper functions
│   │   ├── hooks/         # Custom hooks
│   │   └── store/         # State management
│   └── package.json
│
├── admin/                  # Admin Dashboard (Port 3001)
│   ├── src/
│   │   ├── pages/         # Admin pages
│   │   └── components/    # Admin components
│   └── package.json
│
├── server/                 # Express Backend (Port 5000)
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, validation
│   ├── seeds/             # Database seeders
│   ├── utils/             # Helper functions
│   └── package.json
│
└── docs/                   # Documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn
- Git

### 1. Clone Repository
```bash
cd UrbanCart
```

### 2. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

**Admin:**
```bash
cd ../admin
npm install
```

### 3. Environment Configuration

**Create `.env` in server directory:**
```bash
# MongoDB
MONGODB_URI=mongodb://localhost:27017/urbancart

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this

# CORS
CORS_ORIGIN=http://localhost:3003

# Node Environment
NODE_ENV=development

# API Port
PORT=5000
```

### 4. Database Setup

**Option A: Seed with Real Data**
```bash
cd server
npm run seed
```

This creates:
- 3 test users (john@example.com, admin@example.com, jane@example.com)
- 12 premium tech products
- 3 sample orders
- Categories and reviews

**Default Test Accounts:**
- **Customer:** john@example.com / password123
- **Admin:** admin@example.com / password123

**Option B: Manual MongoDB Setup**
```bash
# Start MongoDB
mongod

# In another terminal, run seed script
cd server
node seeds/seedData.js
```

---

## 🚀 Running the Application

### Start Backend Server
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

### Start Client (React Frontend)
```bash
cd client
npm run dev
# Client runs on http://localhost:3003
```

### Start Admin Dashboard
```bash
cd admin
npm run dev
# Admin runs on http://localhost:3001
```

---

## 📊 Real Data Overview

### Products (12 Premium Tech Items)
- **Smartphones:** iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, Google Pixel 8 Pro, OnePlus 12
- **Laptops:** MacBook Pro 16" M3, Dell XPS 15
- **Tablets:** iPad Pro 12.9" M2, Samsung Galaxy Tab S9 Ultra
- **Accessories:** Sony WH-1000XM5, Apple AirPods Pro
- **Home:** Samsung 65" QLED TV, Dyson V15 Vacuum

### Product Details Include
- Realistic pricing (KSh 24,999 - KSh 329,999)
- Discount percentages (6%-18%)
- Star ratings (4.5-4.9 stars)
- Review counts (100+ reviews each)
- Technical specifications
- Stock information
- Featured product flags

### Categories (6)
- Smartphones 📱
- Laptops 💻
- Tablets 📊
- Accessories 🎧
- Home & Kitchen 🏠
- Fashion 👕

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `POST /api/auth/change-password` - Change password (protected)

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add to cart (protected)
- `PUT /api/cart` - Update cart item (protected)
- `DELETE /api/cart` - Remove from cart (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/my-orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

---

## 🎯 Key Features Explanation

### 1. Real-World Product Data
- Premium tech products with accurate specifications
- Realistic pricing aligned with Kenyan market (KES currency)
- Detailed descriptions and features
- Professional product categorization

### 2. Complete Authentication System
- JWT-based user authentication
- Secure password hashing with bcrypt
- Protected routes with role-based access
- User profile management

### 3. Shopping Experience
- Advanced product filtering (category, price, rating)
- Full-text search functionality
- Add to cart, quantity management
- Real-time price calculations with tax
- Multiple shipping options

### 4. Order Management
- Create orders from cart items
- Track order status (pending, processing, shipped, delivered)
- Order history and details
- Admin order management dashboard

### 5. Admin Features
- Product management (CRUD operations)
- Order tracking and status updates
- Customer management
- Dashboard analytics

### 6. Responsive Design
- Mobile-first approach
- Desktop, tablet, and mobile optimized
- Professional UI with consistent branding
- Smooth animations and transitions

---

## 💳 Payment Methods Supported

1. **Cash on Delivery (COD)** - Pay when goods arrive
2. **Debit/Credit Card** - Secure card payments (Stripe ready)
3. **M-Pesa** - Mobile money payments (Daraja API ready)
4. **Bank Transfer** - Direct bank payments (coming soon)

---

## 🔐 Security Features

- ✅ JWT authentication tokens
- ✅ Password hashing with bcrypt
- ✅ Helmet.js security headers
- ✅ CORS protection
- ✅ Rate limiting on API endpoints
- ✅ Input validation and sanitization
- ✅ Environment variables for secrets
- ✅ Admin role-based access control

---

## 📱 Frontend Pages

### Customer Pages
1. **Home** - Hero banner, flash sales, categories, featured products, testimonials
2. **Product Catalog** - Grid view, filters, search, sorting
3. **Product Details** - Full specs, reviews, related products, add to cart
4. **Shopping Cart** - Cart items, quantity management, checkout
5. **Checkout** - Shipping address, payment method, order confirmation
6. **Order Tracking** - Track orders, delivery timeline, status updates
7. **User Profile** - User info, addresses, order history
8. **Wishlist** - Save favorite products
9. **Login/Register** - User authentication

### Admin Pages
1. **Dashboard** - Analytics, sales metrics, recent orders
2. **Product Management** - Add/edit/delete products
3. **Order Management** - View and update order status
4. **Customer Management** - View customer details
5. **Reports** - Sales reports, revenue analytics

---

## 🎨 Design System

### Colors
- **Primary Orange:** #F97316 (Main CTA, highlights)
- **Primary Green:** #10B981 (Secondary actions)
- **Gray Scale:** 50-900 (Text, backgrounds)
- **Status Colors:** Green (Success), Yellow (Warning), Red (Error), Blue (Info)

### Typography
- **Headings:** Bold, sizes from 24px to 48px
- **Body Text:** Regular, 14px-16px
- **Small Text:** 12px-14px for captions

### Components
- **Buttons:** Primary, secondary, outline variants
- **Cards:** With hover effects and shadows
- **Badges:** For discounts, status, categories
- **Modals:** Alerts, confirmations
- **Forms:** Input fields, selects, checkboxes with validation

---

## 📈 Performance Optimizations

- Code splitting for faster page loads
- Image optimization with emoji placeholders (ready for real images)
- Lazy loading on product images
- Debounced search and filters
- Cached API responses
- Minified CSS and JavaScript
- Production build optimization

---

## 🧪 Testing Data

### Test User Accounts
```
Customer Account:
Email: john@example.com
Password: password123

Admin Account:
Email: admin@example.com
Password: password123

Another Customer:
Email: jane@example.com
Password: password123
```

### Sample Products Available
- All 12 premium tech products with real pricing
- Mix of different categories
- Various discount levels (6%-18%)
- High ratings (4.5-4.9 stars)

### Sample Orders
- Delivered order from John (3 days ago)
- In-transit order from Jane (2 days ago)
- Processing order from John (1 day ago)

---

## 🚀 Deployment

### Deploy to Vercel (Frontend)
```bash
cd client
vercel
```

### Deploy to Heroku (Backend)
```bash
cd server
git push heroku main
```

### MongoDB Atlas (Database)
1. Create MongoDB Atlas account
2. Create cluster
3. Update MONGODB_URI in `.env`

### Environment Variables for Production
```
MONGODB_URI=your_atlas_connection_string
JWT_SECRET=your_strong_secret_key
NODE_ENV=production
CORS_ORIGIN=your_frontend_domain
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [JWT Authentication](https://jwt.io)
- [Tailwind CSS](https://tailwindcss.com)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Support

For support, email: support@urbancart.com
Or contact: +254712345678 (WhatsApp)

---

**UrbanCart** - Shop Everything, Delivered Fast! 🚀
