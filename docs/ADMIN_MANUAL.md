# User Manual - UrbanCart Admin

## Getting Started

### Login
1. Navigate to `admin.yourdomain.com`
2. Enter email and password
3. Click "Login"

## Dashboard

The dashboard displays key metrics:
- **Total Orders**: Total number of orders placed
- **Total Revenue**: Sum of completed orders
- **COD Orders**: Orders paid via Cash-on-Delivery
- **Total Customers**: Registered users

### Features

#### 1. Order Management

**View Orders**
1. Click "Orders" in sidebar
2. View all orders with customer info
3. Filter by status or payment method
4. Sort by date or amount

**Update Order Status**
1. Click on order
2. Select new status from dropdown:
   - Pending
   - Confirmed
   - Processing
   - Shipped
   - Out for Delivery
   - Delivered
   - Cancelled
3. Add optional comment
4. Save changes

**Handle Failed Deliveries**
1. Open order
2. If "Failed Delivery" status available
3. Record reason (not at home, wrong address, etc.)
4. Track attempt count
5. Auto-refund after 3 failed attempts

#### 2. Product Management

**Add New Product**
1. Click "Products" → "Add Product"
2. Fill required fields:
   - Product Name
   - Description
   - Price
   - Category
   - Stock Quantity
   - Images (upload at least 1)
3. Add variants (Size, Color, etc.) if needed
4. Set as featured (optional)
5. Click "Save"

**Edit Product**
1. Find product in list
2. Click "Edit"
3. Modify details
4. Update stock as needed
5. Save changes

**Inventory Alerts**
- Products below threshold automatically flagged
- Red indicator on low stock items
- Set reorder point in product settings

#### 3. Customer Management

**View Customers**
1. Click "Customers" in sidebar
2. See all registered users
3. View customer details:
   - Contact information
   - Address book
   - Order history
   - COD failure count

**Handle COD Violations**
1. Click customer profile
2. Review order history
3. Check COD failure count
4. If ≥5 failures:
   - Click "Blacklist Customer"
   - Add reason: "Repeated COD failures"
   - Confirm
5. Customer cannot place new orders

**Whitelist Customer**
1. Go to blacklisted customer
2. Click "Remove Blacklist"
3. Confirm action

#### 4. Delivery Zones

**Configure Delivery Areas**
1. Click "Settings" → "Delivery Zones"
2. Click "Add Zone"
3. Enter:
   - Zone Name (e.g., "Delhi Metro")
   - Cities covered
   - Postal codes
   - Base delivery cost
   - Free delivery above amount
   - Expected delivery days
   - Max COD order value
4. Toggle COD availability
5. Save

**Edit Zone**
1. Click zone to edit
2. Modify details
3. Activate/Deactivate as needed

#### 5. Settings & Configuration

**Payment Settings**
1. Click "Settings" → "Payment"
2. Toggle payment methods:
   - Enable/Disable COD
   - Enable/Disable Card Payments
   - Set max COD order value
3. Save

**Email Configuration**
1. Go to "Settings" → "Email"
2. Set SMTP details
3. Configure templates:
   - Order Confirmation
   - Order Status Update
   - Delivery Confirmation
   - Return Request

**Tax Settings**
1. Click "Settings" → "Tax"
2. Enter tax percentage
3. Select tax calculation method
4. Save

**General Settings**
1. Go to "Settings" → "General"
2. Update:
   - Store name
   - Store email
   - Store phone
   - Return policy period
   - Currency
3. Save

#### 6. Reports & Analytics

**Sales Reports**
1. Click "Reports" → "Sales"
2. Select date range
3. View:
   - Daily/Weekly/Monthly sales
   - Revenue trends
   - Top products
   - Top customers

**COD Analytics**
1. Click "Reports" → "COD Analysis"
2. View:
   - COD success rate
   - Failed deliveries
   - Customer-wise failure rate
   - Blacklisted customers

**Product Performance**
1. Click "Reports" → "Products"
2. See:
   - Best sellers
   - Low stock items
   - Rating trends
   - Review analysis

## Best Practices

### Daily Tasks
- [ ] Review new orders
- [ ] Update order statuses
- [ ] Check for failed deliveries
- [ ] Monitor inventory levels
- [ ] Review customer support tickets

### Weekly Tasks
- [ ] Analyze sales reports
- [ ] Check COD success rate
- [ ] Update product details
- [ ] Remove low-performing products
- [ ] Review customer feedback

### Monthly Tasks
- [ ] Full inventory audit
- [ ] Database backup verification
- [ ] Security audit
- [ ] Performance review
- [ ] Team report

## Troubleshooting

### Unable to Login
1. Check internet connection
2. Verify admin credentials
3. Reset password if needed
4. Contact IT support

### Order Status Not Updating
1. Refresh page
2. Check network connection
3. Verify admin permissions
4. Check error logs

### Customer Not Loading
1. Check customer ID
2. Verify database connection
3. Try clearing browser cache
4. Contact support

### Email Not Sending
1. Verify SMTP settings
2. Check email configuration
3. Test with template email
4. Review error logs

## Security Tips

1. **Password Management**
   - Use strong passwords (12+ characters)
   - Change password monthly
   - Never share password

2. **Data Protection**
   - Don't share sensitive customer info
   - Use HTTPS always
   - Log out when away from desk

3. **Access Control**
   - Use minimal necessary permissions
   - Review access regularly
   - Disable inactive accounts

## Support & Help

- **Email**: admin-support@urbancart.com
- **Phone**: +1-800-ADMIN-HELP
- **Live Chat**: Available Mon-Fri 9AM-5PM
- **Knowledge Base**: docs.urbancart.com

---

**Last Updated**: December 2025
