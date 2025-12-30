const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Models
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const Review = require('../models/Review');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/urbancart');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Create Categories
    const categories = await Category.insertMany([
      {
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Latest smartphones and mobile devices',
        icon: '📱'
      },
      {
        name: 'Laptops',
        slug: 'laptops',
        description: 'Computers and laptops',
        icon: '💻'
      },
      {
        name: 'Tablets',
        slug: 'tablets',
        description: 'Tablets and iPad devices',
        icon: '📊'
      },
      {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Phone and device accessories',
        icon: '🎧'
      },
      {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Clothing and apparel',
        icon: '👕'
      },
      {
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
        description: 'Home and kitchen appliances',
        icon: '🍳'
      }
    ]);
    console.log('Categories created');

    // Create Products
    const products = await Product.insertMany([
      {
        name: 'iPhone 15 Pro Max',
        slug: 'iphone-15-pro-max',
        description: 'Latest iPhone with advanced A17 Pro chip, stunning display and professional camera system',
        shortDescription: 'Premium flagship smartphone',
        category: categories[0]._id,
        price: 149999,
        originalPrice: 159999,
        discount: 6,
        rating: 4.8,
        reviews: 234,
        stock: 45,
        image: '📱',
        images: ['📱', '📱', '📱'],
        sku: 'IPHONE-15PM-001',
        specs: {
          storage: '512GB',
          color: 'Space Black',
          ram: '8GB'
        },
        inStock: true,
        featured: true
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        slug: 'samsung-galaxy-s24-ultra',
        description: 'Top-tier Android device with S Pen, excellent display and camera',
        shortDescription: 'Premium Galaxy smartphone',
        category: categories[0]._id,
        price: 129999,
        originalPrice: 139999,
        discount: 7,
        rating: 4.7,
        reviews: 189,
        stock: 52,
        image: '📱',
        images: ['📱', '📱', '📱'],
        sku: 'SGS24-ULTRA-001',
        specs: {
          storage: '256GB',
          color: 'Titanium Gray',
          ram: '12GB'
        },
        inStock: true,
        featured: true
      },
      {
        name: 'Google Pixel 8 Pro',
        slug: 'google-pixel-8-pro',
        description: 'Google flagship with incredible AI features and camera capabilities',
        shortDescription: 'AI-powered smartphone',
        category: categories[0]._id,
        price: 119999,
        originalPrice: 129999,
        discount: 8,
        rating: 4.6,
        reviews: 156,
        stock: 38,
        image: '📱',
        images: ['📱', '📱', '📱'],
        sku: 'PIXEL-8PRO-001',
        specs: {
          storage: '256GB',
          color: 'Obsidian',
          ram: '12GB'
        },
        inStock: true,
        featured: false
      },
      {
        name: 'OnePlus 12',
        slug: 'oneplus-12',
        description: 'Fast and smooth performance with OxygenOS and 5G connectivity',
        shortDescription: 'Performance-focused smartphone',
        category: categories[0]._id,
        price: 69999,
        originalPrice: 79999,
        discount: 12,
        rating: 4.5,
        reviews: 234,
        stock: 67,
        image: '📱',
        images: ['📱', '📱', '📱'],
        sku: 'ONEPLUS-12-001',
        specs: {
          storage: '256GB',
          color: 'Muted Gold',
          ram: '12GB'
        },
        inStock: true,
        featured: false
      },
      {
        name: 'MacBook Pro 16" M3 Max',
        slug: 'macbook-pro-16-m3',
        description: 'Professional laptop with powerful M3 Max chip, ideal for creators',
        shortDescription: 'Professional laptop for creators',
        category: categories[1]._id,
        price: 329999,
        originalPrice: 349999,
        discount: 6,
        rating: 4.9,
        reviews: 312,
        stock: 28,
        image: '💻',
        images: ['💻', '💻', '💻'],
        sku: 'MBPRO16-M3-001',
        specs: {
          storage: '1TB SSD',
          ram: '36GB',
          display: '16" Liquid Retina XDR'
        },
        inStock: true,
        featured: true
      },
      {
        name: 'Dell XPS 15',
        slug: 'dell-xps-15',
        description: 'High-performance Windows laptop with InfinityEdge display',
        shortDescription: 'Premium Windows laptop',
        category: categories[1]._id,
        price: 189999,
        originalPrice: 209999,
        discount: 9,
        rating: 4.7,
        reviews: 267,
        stock: 35,
        image: '💻',
        images: ['💻', '💻', '💻'],
        sku: 'DELL-XPS15-001',
        specs: {
          storage: '1TB SSD',
          ram: '32GB',
          display: '15.6" OLED'
        },
        inStock: true,
        featured: false
      },
      {
        name: 'iPad Pro 12.9" M2',
        slug: 'ipad-pro-12-m2',
        description: 'Powerful tablet with M2 chip, Apple Pencil support',
        shortDescription: 'Professional tablet',
        category: categories[2]._id,
        price: 99999,
        originalPrice: 109999,
        discount: 9,
        rating: 4.8,
        reviews: 198,
        stock: 42,
        image: '📊',
        images: ['📊', '📊', '📊'],
        sku: 'IPAD-PRO12-M2-001',
        specs: {
          storage: '256GB',
          ram: '8GB',
          display: '12.9" Liquid Retina XDR'
        },
        inStock: true,
        featured: true
      },
      {
        name: 'Samsung Galaxy Tab S9 Ultra',
        slug: 'samsung-galaxy-tab-s9-ultra',
        description: 'Large screen tablet with S Pen and AMOLED display',
        shortDescription: 'Premium Android tablet',
        category: categories[2]._id,
        price: 89999,
        originalPrice: 99999,
        discount: 10,
        rating: 4.6,
        reviews: 145,
        stock: 38,
        image: '📊',
        images: ['📊', '📊', '📊'],
        sku: 'SGTAB-S9U-001',
        specs: {
          storage: '256GB',
          ram: '12GB',
          display: '14.6" AMOLED'
        },
        inStock: true,
        featured: false
      },
      {
        name: 'Sony WH-1000XM5 Headphones',
        slug: 'sony-wh-1000xm5',
        description: 'Premium wireless headphones with industry-leading noise cancellation',
        shortDescription: 'Best-in-class headphones',
        category: categories[3]._id,
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        rating: 4.9,
        reviews: 567,
        stock: 89,
        image: '🎧',
        images: ['🎧', '🎧', '🎧'],
        sku: 'SONY-XM5-001',
        specs: {
          batteryLife: '30 hours',
          noiseCancel: 'Active',
          connectivity: 'Bluetooth 5.3'
        },
        inStock: true,
        featured: true
      },
      {
        name: 'Apple AirPods Pro (2nd Gen)',
        slug: 'airpods-pro-2nd',
        description: 'Compact earbuds with Active Noise Cancellation and Adaptive Audio',
        shortDescription: 'Premium wireless earbuds',
        category: categories[3]._id,
        price: 24999,
        originalPrice: 29999,
        discount: 17,
        rating: 4.8,
        reviews: 423,
        stock: 156,
        image: '🎧',
        images: ['🎧', '🎧', '🎧'],
        sku: 'AIRPODS-PRO2-001',
        specs: {
          batteryLife: '6 hours (30h with case)',
          noiseCancel: 'Active',
          connectivity: 'Bluetooth 5.3'
        },
        inStock: true,
        featured: false
      },
      {
        name: 'Samsung 65" 4K QLED TV',
        slug: 'samsung-65-qled-tv',
        description: 'Ultra HD smart TV with QLED technology and AI upscaling',
        shortDescription: 'Premium 4K television',
        category: categories[5]._id,
        price: 89999,
        originalPrice: 109999,
        discount: 18,
        rating: 4.7,
        reviews: 234,
        stock: 18,
        image: '📺',
        images: ['📺', '📺', '📺'],
        sku: 'SAM-TV65QLED-001',
        specs: {
          resolution: '4K UHD',
          refreshRate: '120Hz',
          smartTV: 'Tizen OS'
        },
        inStock: true,
        featured: false
      },
      {
        name: 'Dyson V15 Detect Vacuum',
        slug: 'dyson-v15-vacuum',
        description: 'Cordless vacuum with laser dust detection and HEPA filtration',
        shortDescription: 'Premium cordless vacuum',
        category: categories[5]._id,
        price: 79999,
        originalPrice: 89999,
        discount: 11,
        rating: 4.8,
        reviews: 156,
        stock: 24,
        image: '🧹',
        images: ['🧹', '🧹', '🧹'],
        sku: 'DYSON-V15-001',
        specs: {
          batteryLife: '60 minutes',
          dustCapacity: '0.5L',
          features: 'Laser detection, HEPA filter'
        },
        inStock: true,
        featured: true
      }
    ]);
    console.log('Products created');

    // Create Users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await User.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+254712345678',
        password: hashedPassword,
        address: {
          street: '123 Tech Street',
          city: 'Nairobi',
          state: 'Nairobi County',
          zipCode: '00100',
          country: 'Kenya'
        },
        isVerified: true,
        role: 'user'
      },
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        phone: '+254712345679',
        password: hashedPassword,
        address: {
          street: '456 Admin Ave',
          city: 'Nairobi',
          state: 'Nairobi County',
          zipCode: '00100',
          country: 'Kenya'
        },
        isVerified: true,
        role: 'admin'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '+254712345680',
        password: hashedPassword,
        address: {
          street: '789 Shop Road',
          city: 'Mombasa',
          state: 'Mombasa County',
          zipCode: '80100',
          country: 'Kenya'
        },
        isVerified: true,
        role: 'user'
      }
    ]);
    console.log('Users created');

    // Create Orders
    const orders = await Order.insertMany([
      {
        orderNumber: 'ORD-20251230-001',
        user: users[0]._id,
        items: [
          {
            product: products[0]._id,
            quantity: 1,
            price: products[0].price
          },
          {
            product: products[9]._id,
            quantity: 2,
            price: products[9].price
          }
        ],
        totalAmount: products[0].price + (products[9].price * 2),
        shippingAddress: {
          street: '123 Tech Street',
          city: 'Nairobi',
          state: 'Nairobi County',
          zipCode: '00100',
          country: 'Kenya'
        },
        paymentMethod: 'card',
        paymentStatus: 'completed',
        orderStatus: 'delivered',
        deliveryDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        orderNumber: 'ORD-20251229-002',
        user: users[2]._id,
        items: [
          {
            product: products[1]._id,
            quantity: 1,
            price: products[1].price
          }
        ],
        totalAmount: products[1].price,
        shippingAddress: {
          street: '789 Shop Road',
          city: 'Mombasa',
          state: 'Mombasa County',
          zipCode: '80100',
          country: 'Kenya'
        },
        paymentMethod: 'mpesa',
        paymentStatus: 'completed',
        orderStatus: 'in-transit',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        orderNumber: 'ORD-20251228-003',
        user: users[0]._id,
        items: [
          {
            product: products[4]._id,
            quantity: 1,
            price: products[4].price
          }
        ],
        totalAmount: products[4].price,
        shippingAddress: {
          street: '123 Tech Street',
          city: 'Nairobi',
          state: 'Nairobi County',
          zipCode: '00100',
          country: 'Kenya'
        },
        paymentMethod: 'card',
        paymentStatus: 'completed',
        orderStatus: 'processing',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ]);
    console.log('Orders created');

    // Create Reviews
    const reviews = await Review.insertMany([
      {
        product: products[0]._id,
        user: users[0]._id,
        rating: 5,
        title: 'Excellent Phone!',
        comment: 'Amazing camera quality and performance. Highly recommended!',
        helpful: 45,
        verified: true
      },
      {
        product: products[0]._id,
        user: users[2]._id,
        rating: 4,
        title: 'Good Value',
        comment: 'Great phone but a bit expensive',
        helpful: 23,
        verified: true
      },
      {
        product: products[9]._id,
        user: users[0]._id,
        rating: 5,
        title: 'Best Headphones Ever',
        comment: 'Noise cancellation is perfect. Battery lasts forever.',
        helpful: 67,
        verified: true
      }
    ]);
    console.log('Reviews created');

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
