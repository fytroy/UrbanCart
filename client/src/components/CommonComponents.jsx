import React from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

// Product Card Component
export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden group">
      <div className="relative bg-gray-200 h-48 flex items-center justify-center text-5xl overflow-hidden">
        <span className="group-hover:scale-110 transition duration-300">{product.image}</span>
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
            -{product.discount}%
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase mb-2">{product.category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400">★★★★★</span>
          <span className="text-xs text-gray-600">({product.reviews || 0})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            KSh {product.price?.toLocaleString() || 0}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              KSh {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart?.(product)}
          className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Filter Component
export const FilterSection = ({ title, options, activeOption, onSelect }) => {
  return (
    <div className="mb-6 pb-6 border-b">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full text-left px-3 py-2 rounded transition ${
              activeOption === option.value
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Pagination Component
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded transition ${
            currentPage === page
              ? 'bg-orange-500 text-white'
              : 'border hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

// Cart Summary Component
export const CartSummary = ({ subtotal, tax, shipping, total, onCheckout }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>KSh {subtotal?.toLocaleString() || 0}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (16%)</span>
          <span>KSh {tax?.toLocaleString() || 0}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>KSh {shipping?.toLocaleString() || 0}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
          <span>Total</span>
          <span className="text-orange-600">KSh {total?.toLocaleString() || 0}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition mt-6"
      >
        Proceed to Checkout
      </button>

      <div className="mt-6 space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2">✓ Secure checkout</p>
        <p className="flex items-center gap-2">✓ 30-day returns</p>
        <p className="flex items-center gap-2">✓ Money-back guarantee</p>
      </div>
    </div>
  );
};

// Rating Component
export const RatingDisplay = ({ rating, reviews, onRate }) => {
  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              onClick={() => onRate?.(star)}
              className="text-2xl cursor-pointer hover:scale-110 transition"
            >
              {star <= Math.floor(rating) ? '⭐' : '☆'}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {rating.toFixed(1)} • {reviews} reviews
        </p>
      </div>
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ icon = '📦', title, description, action }) => {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {action && (
        <button className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">
          {action.label}
          <FiArrowRight />
        </button>
      )}
    </div>
  );
};

// Loading Skeleton Component
export const SkeletonLoader = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
          <div className="bg-gray-300 h-48 rounded mb-4"></div>
          <div className="bg-gray-300 h-4 rounded mb-2"></div>
          <div className="bg-gray-300 h-4 rounded mb-4 w-2/3"></div>
          <div className="bg-gray-300 h-10 rounded"></div>
        </div>
      ))}
    </div>
  );
};

// Toast Notification Component
export const Toast = ({ message, type = 'success', onClose }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }[type];

  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
      <span>{type === 'success' && '✓'}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-xl">×</button>
    </div>
  );
};

// Feature Card Component
export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// Testimonial Component
export const Testimonial = ({ quote, author, role, rating = 5 }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-yellow-400 mb-3">
        {'⭐'.repeat(rating)}
      </div>
      <p className="text-gray-700 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
};

// Address Card Component
export const AddressCard = ({ address, isDefault, onSelect, onEdit, onDelete }) => {
  return (
    <div className={`border rounded-lg p-4 cursor-pointer hover:border-orange-500 transition ${
      isDefault ? 'bg-orange-50 border-orange-500' : ''
    }`} onClick={onSelect}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-semibold text-gray-900">{address.name}</p>
          <p className="text-sm text-gray-600">{address.phone}</p>
        </div>
        {isDefault && (
          <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
            Default
          </span>
        )}
      </div>
      <p className="text-gray-700 text-sm mb-3">
        {address.street}, {address.city}, {address.postalCode}
      </p>
      <div className="flex gap-2">
        <button onClick={onEdit} className="text-orange-600 text-sm font-semibold hover:text-orange-700">
          Edit
        </button>
        <button onClick={onDelete} className="text-red-600 text-sm font-semibold hover:text-red-700">
          Delete
        </button>
      </div>
    </div>
  );
};

// Badge Component
export const Badge = ({ label, variant = 'primary', size = 'md' }) => {
  const variantClasses = {
    primary: 'bg-orange-100 text-orange-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`inline-block rounded-full font-semibold ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {label}
    </span>
  );
};

export default {
  ProductCard,
  FilterSection,
  Pagination,
  CartSummary,
  RatingDisplay,
  EmptyState,
  SkeletonLoader,
  Toast,
  FeatureCard,
  Testimonial,
  AddressCard,
  Badge,
};
