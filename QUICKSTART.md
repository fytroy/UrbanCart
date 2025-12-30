# UrbanCart - Quick Start Guide

## 🚀 5-Minute Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB running (local or Atlas)
- Git installed

### Step 1: Clone & Setup Backend (2 min)

```bash
cd server
npm install
cp .env.example .env
```

**Edit `.env` file**:
```
MONGODB_URI=mongodb://localhost:27017/urbancart
JWT_SECRET=your_secret_key_here_change_this
PORT=5000
NODE_ENV=development
```

**Start Backend**:
```bash
npm run dev
# Server running at http://localhost:5000
```

### Step 2: Setup Frontend (2 min)

```bash
cd ../client
npm install
npm run dev
# Client running at http://localhost:3000
```

### Step 3: Setup Admin Panel (1 min)

```bash
cd ../admin
npm install
npm run dev
# Admin running at http://localhost:3001
```

## ✅ Testing the Platform

### 1. Create User Account
Visit `http://localhost:3000`
- Click "Sign Up"
- Fill in details
- Create account

### 2. Login
- Click "Sign In"
- Use your credentials

### 3. Browse Products
- Click "Shop" or "Products"
- See product catalog

### 4. Add to Cart
- Click "Add to Cart" on any product
- Open cart to view items

### 5. Checkout
- Click "Checkout"
- Follow 5-step process
- Select COD payment
- Place order

### 6. Admin Panel
Visit `http://localhost:3001`
- Login with admin account (create in MongoDB first)
- View dashboard
- Manage orders and products

## 📦 Project Structure

```
UrbanCart/
├── server/             # Backend API
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth, validation
│   └── utils/         # Helpers
├── client/            # Customer website
│   └── src/
│       ├── pages/     # React pages
│       └── components/
├── admin/             # Admin dashboard
│   └── src/
└── docs/              # Documentation
```

## 🔑 Key API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Products
```
GET /api/products
GET /api/products/:id
```

### Cart
```
GET /api/cart
POST /api/cart/add
POST /api/cart/remove/:itemId
POST /api/cart/update/:itemId
```

### Orders
```
POST /api/orders/create
GET /api/orders
GET /api/orders/:orderId
```

### Admin
```
GET /api/admin/dashboard
GET /api/admin/orders
PUT /api/admin/orders/:orderId/status
POST /api/admin/products
GET /api/admin/customers
```

## 🛠️ Common Issues & Solutions

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: 
- Ensure MongoDB is running: `mongod`
- Or update MONGODB_URI to MongoDB Atlas connection

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force
npm install
```

### CORS Errors
Check `.env` CORS_ORIGIN matches frontend URL
```
CORS_ORIGIN=http://localhost:3000
```

## 📝 Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/urbancart
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
COD_MAX_ORDER_VALUE=50000
```

**Frontend (.env.local)**
```
VITE_API_URL=http://localhost:5000/api
```

**Admin (.env.local)**
```
VITE_API_URL=http://localhost:5000/api
```

## 🔐 Create Admin User

### Using MongoDB Compass/CLI:

```javascript
db.users.insertOne({
  firstName: "Admin",
  lastName: "User",
  email: "admin@urbancart.com",
  phone: "+1234567890",
  password: "hashed_password", // Hash using bcrypt first
  role: "admin",
  emailVerified: true,
  phoneVerified: true,
  isBlacklisted: false
})
```

### Or via API:
1. Register as normal user
2. Manually change `role` to "admin" in MongoDB
3. Login to access admin panel

## 🚀 Next Steps

1. **Add Sample Products**: Go to admin panel → Add Products
2. **Configure Delivery Zones**: Admin → Settings → Delivery Zones
3. **Test COD Orders**: Create orders and track them
4. **Customize Branding**: Update logo and colors
5. **Deploy**: See [DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 📚 Full Documentation

- [Complete Documentation](docs/README.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Admin Manual](docs/ADMIN_MANUAL.md)
- [Customer Manual](docs/CUSTOMER_MANUAL.md)

## 💡 Tips

- **Fast Development**: Use `npm run dev` for hot reload
- **Database Reset**: Delete MongoDB and restart
- **Test Data**: Create sample orders to test tracking
- **Email Testing**: Use Mailtrap for email during development
- **Mobile Testing**: Use device preview in browser DevTools

## 🆘 Need Help?

- Check documentation in `/docs` folder
- Review error messages in browser console
- Check server logs for API errors
- Visit: support@urbancart.com

## 🎯 Development Checklist

- [x] Backend API setup
- [x] Database models created
- [x] Authentication implemented
- [x] Frontend pages built
- [x] Admin dashboard created
- [ ] Database seeded with sample data
- [ ] Payment integration (Stripe)
- [ ] Email service configured
- [ ] Image upload (Cloudinary)
- [ ] SMS notifications
- [ ] Production deployment
- [ ] SEO optimization
- [ ] Performance testing
- [ ] Security audit

---

**Ready to code? Start with the backend in `server/` directory!**
