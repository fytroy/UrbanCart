# UrbanCart - API Testing with cURL & Postman

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require:
```
Authorization: Bearer {token}
```

## API Endpoints Reference

### 1. Authentication

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "password": "password123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "firstName": "John",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### 2. Products

#### Get All Products
```bash
curl -X GET "http://localhost:5000/api/products?page=1&limit=12&sort=newest"
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)
- `sort`: newest, price-asc, price-desc, rating
- `search`: Product name or description
- `category`: Category ID
- `minPrice`: Minimum price
- `maxPrice`: Maximum price

#### Get Single Product
```bash
curl -X GET http://localhost:5000/api/products/{productId}
```

### 3. Shopping Cart

#### Get Cart
```bash
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer {token}"
```

#### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "60d5ec49f1b2c72b8c8e4a1b",
    "quantity": 2,
    "variant": {
      "size": "M",
      "color": "Blue"
    }
  }'
```

#### Update Cart Item Quantity
```bash
curl -X POST http://localhost:5000/api/cart/update/{itemId} \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 3
  }'
```

#### Remove from Cart
```bash
curl -X POST http://localhost:5000/api/cart/remove/{itemId} \
  -H "Authorization: Bearer {token}"
```

### 4. Orders

#### Create Order
```bash
curl -X POST http://localhost:5000/api/orders/create \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "shippingAddress": {
      "name": "John Doe",
      "phone": "+919876543210",
      "street": "123 Main St",
      "city": "New Delhi",
      "state": "Delhi",
      "postalCode": "110001",
      "country": "India"
    },
    "paymentMethod": "cod",
    "deliverySlot": "Tomorrow 9AM-2PM",
    "notes": "Please deliver before 2 PM"
  }'
```

Payment Methods: `cod`, `card`, `wallet`

#### Get User Orders
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer {token}"
```

#### Get Order Details
```bash
curl -X GET http://localhost:5000/api/orders/{orderId} \
  -H "Authorization: Bearer {token}"
```

### 5. User Profile

#### Get Profile
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer {token}"
```

#### Update Profile
```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "phone": "+919876543210"
  }'
```

#### Add Address
```bash
curl -X POST http://localhost:5000/api/users/address \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "home",
    "name": "Home Address",
    "phone": "+919876543210",
    "street": "123 Main St",
    "city": "New Delhi",
    "state": "Delhi",
    "postalCode": "110001",
    "country": "India",
    "isDefault": true
  }'
```

#### Get Wishlist
```bash
curl -X GET http://localhost:5000/api/users/wishlist \
  -H "Authorization: Bearer {token}"
```

#### Add to Wishlist
```bash
curl -X POST http://localhost:5000/api/users/wishlist/add/{productId} \
  -H "Authorization: Bearer {token}"
```

### 6. Admin Endpoints

#### Get Dashboard Metrics (Admin Only)
```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer {admin_token}"
```

Response:
```json
{
  "totalOrders": 150,
  "totalRevenue": 750000,
  "codOrders": 120,
  "cardOrders": 30,
  "totalCustomers": 200
}
```

#### Get All Orders (Admin)
```bash
curl -X GET http://localhost:5000/api/admin/orders \
  -H "Authorization: Bearer {admin_token}"
```

#### Update Order Status (Admin)
```bash
curl -X PUT http://localhost:5000/api/admin/orders/{orderId}/status \
  -H "Authorization: Bearer {admin_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped",
    "comment": "Order shipped via courier"
  }'
```

Valid Statuses:
- `pending`
- `confirmed`
- `processing`
- `shipped`
- `outForDelivery`
- `delivered`
- `cancelled`
- `returned`

#### Get All Products (Admin)
```bash
curl -X GET http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer {admin_token}"
```

#### Add Product (Admin)
```bash
curl -X POST http://localhost:5000/api/admin/products \
  -H "Authorization: Bearer {admin_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "description": "Product description",
    "price": 5000,
    "stock": 100,
    "category": "60d5ec49f1b2c72b8c8e4a1b",
    "images": [
      {
        "url": "https://example.com/image.jpg",
        "alt": "Product image"
      }
    ]
  }'
```

#### Update Product (Admin)
```bash
curl -X PUT http://localhost:5000/api/admin/products/{productId} \
  -H "Authorization: Bearer {admin_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 4500,
    "stock": 95
  }'
```

#### Get All Customers (Admin)
```bash
curl -X GET http://localhost:5000/api/admin/customers \
  -H "Authorization: Bearer {admin_token}"
```

#### Blacklist Customer (Admin)
```bash
curl -X PUT http://localhost:5000/api/admin/customers/{userId}/blacklist \
  -H "Authorization: Bearer {admin_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "reason": "Repeated COD failures"
  }'
```

## Postman Collection

Import this into Postman:

```json
{
  "info": {
    "name": "UrbanCart API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/auth/register"
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Product not found"
}
```

### 400 Bad Request
```json
{
  "error": "Invalid request data"
}
```

### 500 Server Error
```json
{
  "error": "Internal Server Error"
}
```

## Status Codes

- `200`: OK - Request successful
- `201`: Created - Resource created
- `400`: Bad Request - Invalid data
- `401`: Unauthorized - No token or invalid token
- `403`: Forbidden - Not authorized for this action
- `404`: Not Found - Resource doesn't exist
- `500`: Server Error - Internal error

## Testing Workflow

1. **Register User**
   - POST /auth/register
   - Save the returned token

2. **Add Products to Cart**
   - POST /cart/add (use token)

3. **Create Order**
   - POST /orders/create (use token)

4. **Track Order**
   - GET /orders/{orderId} (use token)

5. **Admin Operations** (with admin token)
   - GET /admin/dashboard
   - PUT /admin/orders/{orderId}/status

---

**For more details, see [README.md](docs/README.md)**
