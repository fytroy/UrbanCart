# UrbanCart - Complete E-Commerce Platform Documentation

## 📋 Project Overview

UrbanCart is a modern, feature-rich e-commerce platform built with React, Vite, Tailwind CSS, and Node.js/Express. It provides a seamless shopping experience with multiple pages, components, and comprehensive styling.

## 🎨 Design System

### Color Palette
- **Primary Orange**: #F97316 (Main CTA, highlights)
- **Primary Green**: #10B981 (Success states, secondary CTAs)
- **Gray Scale**: 50-900 (Backgrounds, text, borders)
- **Status Colors**: Green (success), Yellow (warning), Red (danger), Blue (info)

### Typography
- **Font Family**: System fonts for optimal performance
- **Font Sizes**: 6 levels (sm to 4xl)
- **Font Weights**: 300-800

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Scales**: xs (0.25rem), sm (0.5rem), md (1rem), lg (1.5rem), xl (2rem), 2xl (3rem)

### Component Styles
- **Buttons**: Primary (orange), Secondary (green), Outline variants
- **Cards**: Elevated, hover effects, responsive padding
- **Forms**: Full-width inputs with focus states
- **Badges**: 5 color variants, 3 size options

## 📱 Pages & Features

### 1. **Home Page** (`Home.jsx`)
- Hero banner with gradient
- Flash sales countdown
- Product categories grid
- Featured products section
- Why Choose Us section
- Call-to-action buttons

### 2. **Product Catalog** (`ProductCatalog.jsx`)
- Advanced filtering (category, price range, rating)
- Product search
- Sorting options
- Product grid with discount badges
- Responsive layout
- Sample products included

### 3. **Product Details** 
- Full product information
- Image gallery
- Rating and reviews
- Add to cart functionality
- Related products

### 4. **Shopping Cart**
- Item management (add, remove, update quantity)
- Cart summary with totals
- Proceed to checkout button
- Empty state handling

### 5. **Checkout** (`Checkout.jsx`)
- Multi-step form
- Shipping address entry
- Payment method selection
  - Cash on Delivery (COD)
  - Debit/Credit Card
  - M-Pesa
- Order summary
- Tax and shipping calculation

### 6. **Login** (`Login.jsx`)
- Email/password authentication
- Remember me option
- Forgot password link
- Social login options
- Sign up redirect

### 7. **Register** (`Register.jsx`)
- Multi-field form with validation
- Personal information
- Address selection
- Password strength indicator
- Terms acceptance

### 8. **Order Tracking** (`OrderTracking.jsx`)
- Order number search
- Real-time status updates
- Delivery timeline
- Item details
- Contact information
- Sample orders for testing

### 9. **User Account**
- Profile information
- Order history
- Saved addresses
- Wishlist
- Settings

## 🛠 Components

### Common Components (`CommonComponents.jsx`)
- **ProductCard**: Display individual products
- **FilterSection**: Reusable filter component
- **Pagination**: Page navigation
- **CartSummary**: Order totals display
- **RatingDisplay**: Star ratings
- **EmptyState**: Empty page states
- **SkeletonLoader**: Loading placeholders
- **Toast**: Notifications
- **FeatureCard**: Feature highlights
- **Testimonial**: Customer testimonials
- **AddressCard**: Address display/selection
- **Badge**: Status badges

### Header Component (`Header.jsx`)
- Logo and branding
- Search functionality
- Navigation menu
- User actions (account, cart)
- Cart badge with count
- Sticky positioning

### Footer Component (`Footer.jsx`)
- 5-column layout
- Links organization
- Social media links
- Contact information
- WhatsApp button
- Newsletter signup

## 🎯 Utility Functions

### Formatting Functions
- `formatPrice()` - Convert to KSh currency
- `formatDate()` - Date formatting
- `formatDateTime()` - Date and time formatting

### Validation Functions
- `validateEmail()` - Email validation
- `validatePhoneNumber()` - Kenyan phone validation
- `validatePassword()` - Password strength check

### Calculation Functions
- `calculateDiscount()` - Discount percentage
- `calculateShipping()` - Shipping cost calculation
- `calculateTax()` - Tax calculation (16%)
- `generateOrderNumber()` - Unique order IDs

### Utility Helpers
- `debounce()` - Function debouncing
- `throttle()` - Function throttling
- `truncateText()` - Text truncation
- `deepClone()` - Object cloning
- `getInitials()` - Extract name initials

### Status Helpers
- `getStatusBadgeColor()` - Status color mapping
- `getStatusIcon()` - Status emoji icons
- `getCategoryIcon()` - Category emoji icons

### Storage Helpers
- `storage.get()` - Get from localStorage
- `storage.set()` - Set to localStorage
- `storage.remove()` - Remove from localStorage
- `storage.clear()` - Clear all localStorage

## 🎨 Global Styles

### CSS Classes Available
- **Layout**: grid, grid-cols-2/3/4, flex, flex-center
- **Spacing**: mt, mb, px, py (1-8 variants)
- **Typography**: text-center, text-right, text-left
- **Effects**: shadow, shadow-lg, hidden
- **Animations**: animate-fade-in, animate-slide-in, animate-pulse

### Theme Configuration (`theme.js`)
- Centralized color definitions
- Responsive breakpoints
- Typography scales
- Shadow definitions
- Transition timings

## 🔄 State Management

### Zustand Store (if using)
- Cart state
- User authentication
- Filters
- Favorites/Wishlist

### Local State
- Form inputs
- UI toggles
- Modal states
- Pagination

## 🌐 API Integration

### Base URL
```
http://localhost:5000/api
```

### Endpoints
- `GET /products` - List products
- `POST /cart` - Add to cart
- `GET /orders` - Get user orders
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `GET /admin/dashboard` - Admin metrics

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 0-640px
- **Tablet**: 641px-1024px
- **Desktop**: 1025px+

### Mobile-First Approach
- Base styles for mobile
- Media queries for larger screens
- Responsive grids and layouts

## 🚀 Performance Optimizations

1. **Code Splitting**: Lazy load pages
2. **Image Optimization**: Use emoji placeholders or compressed images
3. **Debouncing**: Search and filter operations
4. **Memoization**: Prevent unnecessary re-renders
5. **Caching**: localStorage for cart and preferences

## 📚 Usage Examples

### Using ProductCard Component
```jsx
import { ProductCard } from './components/CommonComponents';

<ProductCard 
  product={productData}
  onAddToCart={handleAddToCart}
/>
```

### Using Utilities
```jsx
import { formatPrice, validateEmail } from './utils/helpers';

const price = formatPrice(9999); // "KSh 9,999"
const isValid = validateEmail('user@example.com'); // true
```

### Using Theme
```jsx
import theme from './styles/theme';

const buttonStyle = {
  backgroundColor: theme.colors.primary.orange,
  padding: `${theme.spacing.md} ${theme.spacing.lg}`,
  borderRadius: theme.borderRadius.md,
};
```

## 🧪 Testing Sample Orders

### Order Tracking Test Numbers
1. **ORD-20251230-ABC123** - Delivered
2. **ORD-20251225-XYZ789** - In Transit

### Test Credentials (when auth is enabled)
- Email: test@urbancart.com
- Password: Test@123456

## 🔐 Security Notes

1. **Authentication**: JWT tokens in localStorage
2. **Password**: Minimum 8 characters with mixed case
3. **Phone Validation**: Kenyan format (+254 or 0)
4. **API**: Use environment variables for sensitive data
5. **HTTPS**: Enable in production

## 📦 Dependencies

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- React Icons
- Zustand (state management)
- Axios (HTTP client)
- React Hot Toast (notifications)

### Backend
- Node.js/Express
- MongoDB
- JWT (authentication)
- Cors
- Helmet (security)

## 🚀 Deployment

1. Build: `npm run build`
2. Start: `npm run preview` (for production preview)
3. Serve: Deploy dist folder to hosting
4. Environment: Set API_URL for backend connection

## 📝 File Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── CommonComponents.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ProductCatalog.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── OrderTracking.jsx
│   ├── hooks/
│   │   └── useApi.js
│   ├── store/
│   │   └── store.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── global.css
│   │   └── theme.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 🤝 Contributing

1. Follow the existing code style
2. Use the theme for colors and spacing
3. Create reusable components
4. Test responsiveness
5. Update documentation

## 📞 Support

- Email: support@urbancart.com
- Phone: +254 711 011 011
- WhatsApp: +254 711 011 011

## 📄 License

MIT License - Feel free to use for personal and commercial projects.

---

**Version**: 1.0.0  
**Last Updated**: December 30, 2025  
**Status**: Production Ready ✓
