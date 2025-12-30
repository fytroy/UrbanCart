import React, { useState } from 'react';
import { FiFilter, FiChevronDown } from 'react-icons/fi';

const ProductCatalog = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 50000],
    rating: 0,
    search: ''
  });

  const [sortBy, setSortBy] = useState('newest');

  const products = [
    {
      id: 1,
      name: 'Infinix Smart 10 Pro',
      category: 'Phones',
      price: 8419,
      originalPrice: 15000,
      rating: 4.5,
      reviews: 234,
      image: '📱',
      discount: 44
    },
    {
      id: 2,
      name: 'Samsung Galaxy M12',
      category: 'Phones',
      price: 9999,
      originalPrice: 15999,
      rating: 4.2,
      reviews: 156,
      image: '📱',
      discount: 37
    },
    {
      id: 3,
      name: 'Sony WH-CH720N Headphones',
      category: 'Electronics',
      price: 3999,
      originalPrice: 6999,
      rating: 4.8,
      reviews: 512,
      image: '🎧',
      discount: 43
    },
    {
      id: 4,
      name: 'Dell Inspiron 15',
      category: 'Electronics',
      price: 34999,
      originalPrice: 54999,
      rating: 4.6,
      reviews: 324,
      image: '💻',
      discount: 36
    },
    {
      id: 5,
      name: 'Cotton T-Shirt Bundle',
      category: 'Fashion',
      price: 1299,
      originalPrice: 3499,
      rating: 4.3,
      reviews: 445,
      image: '👕',
      discount: 63
    },
    {
      id: 6,
      name: 'Casual Sneakers',
      category: 'Fashion',
      price: 2499,
      originalPrice: 5999,
      rating: 4.4,
      reviews: 267,
      image: '👟',
      discount: 58
    },
    {
      id: 7,
      name: 'Smart LED TV 43"',
      category: 'Electronics',
      price: 19999,
      originalPrice: 34999,
      rating: 4.7,
      reviews: 678,
      image: '📺',
      discount: 43
    },
    {
      id: 8,
      name: 'Microwave Oven',
      category: 'Home',
      price: 5999,
      originalPrice: 9999,
      rating: 4.5,
      reviews: 189,
      image: '🍳',
      discount: 40
    }
  ];

  const categories = ['All Products', 'Phones', 'Electronics', 'Fashion', 'Home'];

  const filteredProducts = products.filter(p => {
    const matchCategory = filters.category === 'all' || p.category === filters.category;
    const matchPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
    const matchSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
    return matchCategory && matchPrice && matchSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product, 1, {});
    // Show toast notification
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select 
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
              className="w-full border rounded px-3 py-2"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Min Price</label>
            <input 
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Max Price</label>
            <input 
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img 
                src={product.images[0]?.url || 'https://via.placeholder.com/300'} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                  {product.rating && <span className="text-yellow-500">★ {product.rating}</span>}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </button>
                  <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition">
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
