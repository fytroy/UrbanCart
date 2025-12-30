# UrbanCart - Project Root README

This is the complete UrbanCart ecommerce platform with Cash-on-Delivery focus.

## Project Structure

```
UrbanCart/
├── server/           # Node.js/Express API
├── client/           # React customer frontend
├── admin/            # React admin dashboard
└── docs/             # Documentation
```

## Quick Start

### Backend
```bash
cd server
npm install
cp .env.example .env
# Configure .env
npm run dev
# Server runs on http://localhost:5000
```

### Frontend
```bash
cd client
npm install
npm run dev
# Client runs on http://localhost:3000
```

### Admin Panel
```bash
cd admin
npm install
npm run dev
# Admin runs on http://localhost:3001
```

## Documentation

- **[Main Documentation](docs/README.md)** - Complete project overview
- **[Database Schema](docs/DATABASE.md)** - MongoDB collections & relationships
- **[Deployment Guide](docs/DEPLOYMENT.md)** - How to deploy to production
- **[Admin Manual](docs/ADMIN_MANUAL.md)** - Admin panel user guide
- **[Customer Manual](docs/CUSTOMER_MANUAL.md)** - Customer guide

## Key Features

✅ **Product Management** - Catalog with categories, filters, search
✅ **User Accounts** - Registration, login, profiles, addresses, wishlist
✅ **Shopping Cart** - Persistent, real-time calculations
✅ **Checkout** - 5-step streamlined process
✅ **Order Tracking** - Real-time status updates
✅ **Admin Panel** - Complete management system
✅ **COD Focus** - Phone verification, order limits, blacklist system
✅ **Security** - JWT auth, bcrypt hashing, rate limiting

## Technology Stack

**Backend**: Node.js, Express, MongoDB, JWT
**Frontend**: React, Vite, Tailwind CSS, Zustand
**Admin**: React, Recharts, Tailwind CSS

## Environment Setup

Copy `.env.example` to `.env` in each directory and configure:

```bash
# Server
MONGODB_URI=mongodb://localhost:27017/urbancart
JWT_SECRET=your_secret_key
PORT=5000

# Client
VITE_API_URL=http://localhost:5000/api

# Admin
VITE_API_URL=http://localhost:5000/api
```

## Development

All parts run simultaneously:
- Backend: `npm run dev` in server/
- Frontend: `npm run dev` in client/
- Admin: `npm run dev` in admin/

## Production Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete deployment instructions.

## Support

- Email: support@urbancart.com
- Docs: [docs/README.md](docs/README.md)

---

**Created**: December 2025
**Version**: 1.0.0
