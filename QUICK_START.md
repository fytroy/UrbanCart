# ⚡ UrbanCart Quick Reference

## 🚀 Start the Platform

```bash
# Terminal 1 - Backend
cd server && npm run dev
# Running on: http://localhost:5000

# Terminal 2 - Client
cd client && npm run dev
# Running on: http://localhost:3004 (auto-assigned)

# Terminal 3 - Admin
cd admin && npm run dev
# Running on: http://localhost:3001 (if available)
```

## 🗄️ Database Setup

```bash
cd server && npm run seed
```

**Creates:**
- 3 test users
- 12 tech products
- 6 categories
- Sample orders

## 🔑 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Customer | john@example.com | password123 |
| Admin | admin@example.com | password123 |
| Customer | jane@example.com | password123 |

## 💰 Sample Products (12 Items)

| Product | Price | Category |
|---------|-------|----------|
| iPhone 15 Pro Max | KSh 149,999 | Smartphones |
| Samsung Galaxy S24 | KSh 129,999 | Smartphones |
| MacBook Pro 16" | KSh 329,999 | Laptops |
| iPad Pro 12.9" | KSh 99,999 | Tablets |
| Sony WH-1000XM5 | KSh 29,999 | Accessories |
| Samsung 65" TV | KSh 89,999 | Home |
| And 6 more... | See config.js | Various |

## 📂 Key Files

### Backend
- `server/controllers/authController.js` - User auth
- `server/controllers/productController.js` - Products
- `server/controllers/orderController.js` - Orders
- `server/seeds/seedData.js` - Database seeder
- `server/middleware/auth.js` - JWT & RBAC

### Frontend
- `client/src/pages/Home.jsx` - Homepage
- `client/src/config.js` - Products & config
- `client/src/components/CommonComponents.jsx` - Components
- `client/src/utils/helpers.js` - Utility functions
- `client/src/styles/global.css` - Styles
- `client/src/styles/theme.js` - Theme

### Docs
- `SETUP_GUIDE.md` - Installation guide
- `FINAL_SUMMARY.md` - Complete overview
- `REAL_WORLD_UPDATES.md` - What's new

## 🔗 API Endpoints

### Auth
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Sign in
- `GET /api/auth/profile` - Get profile (protected)

### Products
- `GET /api/products` - List all
- `GET /api/products/featured` - Featured only
- `GET /api/products/:id` - Single product

### Cart
- `GET /api/cart` - Get cart (protected)
- `POST /api/cart` - Add item (protected)
- `DELETE /api/cart` - Remove item (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/my-orders` - My orders (protected)
- `GET /api/orders/:id` - Order details (protected)

## 🎨 Features

✅ Flash Sales with Countdown
✅ Product Filtering & Search
✅ Shopping Cart
✅ Multiple Payment Methods
✅ Order Tracking
✅ User Profiles
✅ Admin Dashboard
✅ Responsive Design
✅ Toast Notifications
✅ Form Validation

## 📱 Pages Available

1. **Home** - Homepage with products
2. **Products** - Product catalog
3. **Product Details** - Single product view
4. **Cart** - Shopping cart
5. **Checkout** - Order confirmation
6. **Orders** - Order history & tracking
7. **Profile** - User account
8. **Login** - User signin
9. **Register** - User signup

## 💳 Payment Methods

1. **Cash on Delivery** - Default
2. **Card Payment** - Ready for integration
3. **M-Pesa** - Ready for integration
4. **Bank Transfer** - Coming soon

## 🔐 Security

- JWT Authentication
- Password Hashing (bcrypt)
- CORS Protection
- Rate Limiting
- Role-Based Access Control
- Input Validation
- Environment Variables

## 📊 Real Data

- **12 Tech Products** from smartphones to home appliances
- **6 Categories** for easy browsing
- **Realistic Pricing** in Kenyan Shillings (KES)
- **Discount System** (6%-18% off)
- **Star Ratings** (4.5+ stars)
- **Review System** (100+ reviews per product)

## 🚀 Deploy Commands

```bash
# Production Build
cd client && npm run build

# Heroku Deploy (Backend)
cd server && git push heroku main

# Vercel Deploy (Frontend)
cd client && vercel --prod
```

## 🐛 Troubleshooting

**Port Already in Use?**
```bash
# Kill process on port
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # Mac/Linux
```

**MongoDB Connection Error?**
```bash
# Check MongoDB is running
mongod  # Start MongoDB service
```

**Module Not Found?**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📞 Contacts

**Support Email:** support@urbancart.com
**Phone:** +254712345678
**WhatsApp:** +254712345678

---

**UrbanCart - Shop Everything, Delivered Fast! 🚀**

Last Updated: December 30, 2025
