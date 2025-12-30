import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiHeadphones, FiStar, FiHeart } from 'react-icons/fi';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../config';
import { ProductCard, FeatureCard, Testimonial } from '../components/CommonComponents';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [countDown, setCountDown] = useState({ hours: 2, minutes: 45, seconds: 30 });

  useEffect(() => {
    // Load featured products
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 6);
    setFeaturedProducts(featured);

    // Countdown timer
    const timer = setInterval(() => {
      setCountDown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter(p => p.category === activeCategory).slice(0, 8);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to UrbanCart
              </h1>
              <p className="text-xl mb-6 text-orange-50">
                Shop Everything, Delivered Fast. The best selection of electronics, fashion, and home products.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 w-fit"
                >
                  Shop Now <FiArrowRight />
                </Link>
              </div>
            </div>
            <div className="text-6xl text-center">📦</div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FeatureCard
              icon={<FiTruck size={32} />}
              title="Free Shipping"
              description="On orders over KSh 10,000"
            />
            <FeatureCard
              icon={<FiShield size={32} />}
              title="Secure Payment"
              description="100% secure transactions"
            />
            <FeatureCard
              icon={<FiHeadphones size={32} />}
              title="24/7 Support"
              description="Dedicated customer service"
            />
            <FeatureCard
              icon={<FiStar size={32} />}
              title="Quality Assured"
              description="All products verified"
            />
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">⚡ Flash Sale</h2>
              <p className="text-gray-600">Limited time offers, up to 40% off</p>
            </div>
            <div className="flex gap-4 bg-red-100 px-4 py-2 rounded-lg">
              <div className="text-center">
                <span className="text-2xl font-bold text-red-600">{String(countDown.hours).padStart(2, '0')}</span>
                <p className="text-xs text-gray-600">Hours</p>
              </div>
              <span className="text-2xl font-bold text-red-600">:</span>
              <div className="text-center">
                <span className="text-2xl font-bold text-red-600">{String(countDown.minutes).padStart(2, '0')}</span>
                <p className="text-xs text-gray-600">Minutes</p>
              </div>
              <span className="text-2xl font-bold text-red-600">:</span>
              <div className="text-center">
                <span className="text-2xl font-bold text-red-600">{String(countDown.seconds).padStart(2, '0')}</span>
                <p className="text-xs text-gray-600">Seconds</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.filter(p => p.discount > 10).slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Best Sellers</h2>
            <Link to="/products" className="text-orange-600 font-semibold hover:underline flex items-center gap-2">
              View All <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {PRODUCTS.filter(p => p.rating > 4.5).slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={`p-4 rounded-lg text-center transition ${
                  activeCategory === category.slug
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <p className="font-semibold text-sm">{category.name}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">⭐ Featured Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative h-48 bg-gray-200 flex items-center justify-center text-6xl">
                  {product.image}
                  {product.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">KSh {product.price.toLocaleString()}</p>
                      <p className="text-gray-500 line-through text-sm">KSh {product.originalPrice.toLocaleString()}</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700">
                      <FiHeart size={24} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-500">★ {product.rating}</span>
                    <span className="text-gray-600 text-sm">({product.reviews})</span>
                  </div>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-xl mb-8 text-orange-100">Browse thousands of products with exclusive deals</p>
          <Link
            to="/products"
            className="inline-block bg-white text-orange-600 px-12 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
