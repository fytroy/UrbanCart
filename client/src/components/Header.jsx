import React from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiHelpCircle } from 'react-icons/fi';
import { FaPhone } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top promotional bar */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 text-center text-sm">
        <span>🎉 Sell on UrbanCart | COD Available Nationwide</span>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-3xl font-bold text-orange-500">UrbanCart</div>
          </div>

          {/* Search bar */}
          <div className="flex-1 mx-4">
            <div className="flex bg-gray-100 rounded-lg overflow-hidden">
              <input 
                type="text" 
                placeholder="Search products, brands and categories"
                className="flex-1 px-4 py-3 outline-none bg-gray-100"
              />
              <button className="bg-orange-500 text-white px-6 py-3 hover:bg-orange-600 font-semibold">
                Search
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
              <FiHelpCircle size={20} />
              <span className="text-sm">Help</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
              <FiUser size={20} />
              <span className="text-sm">Account</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500 relative">
              <FiShoppingCart size={20} />
              <span className="text-sm">Cart</span>
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category navigation */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-8 py-3 overflow-x-auto text-sm font-medium text-gray-700">
            <a href="/" className="whitespace-nowrap hover:text-orange-500">Home</a>
            <a href="/products" className="whitespace-nowrap hover:text-orange-500">All Products</a>
            <a href="#phones" className="whitespace-nowrap hover:text-orange-500">Phones & Tablets</a>
            <a href="#electronics" className="whitespace-nowrap hover:text-orange-500">Electronics</a>
            <a href="#fashion" className="whitespace-nowrap hover:text-orange-500">Fashion</a>
            <a href="#home" className="whitespace-nowrap hover:text-orange-500">Home & Living</a>
            <a href="/track-order" className="whitespace-nowrap hover:text-orange-500">Track Order</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
