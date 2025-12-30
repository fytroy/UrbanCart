// Utility functions for UrbanCart application

/**
 * Format price to KSh currency
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (original, current) => {
  return Math.round(((original - current) / original) * 100);
};

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone number (Kenyan format)
 */
export const validatePhoneNumber = (phone) => {
  const re = /^(\+254|0)[1-9]\d{8}$/;
  return re.test(phone.replace(/\s/g, ''));
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  return {
    isValid: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
    length: password.length,
  };
};

/**
 * Generate random ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Capitalize string
 */
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate text
 */
export const truncateText = (text, length = 100) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Merge objects
 */
export const mergeObjects = (obj1, obj2) => {
  return { ...obj1, ...obj2 };
};

/**
 * Get initials from name
 */
export const getInitials = (firstName, lastName = '') => {
  return (firstName[0] + (lastName[0] || '')).toUpperCase();
};

/**
 * Calculate shipping cost
 */
export const calculateShipping = (subtotal, location = 'nairobi') => {
  const baseShipping = {
    nairobi: 500,
    mombasa: 750,
    kisumu: 1000,
    nakuru: 700,
  };
  
  if (subtotal > 10000) {
    return (baseShipping[location.toLowerCase()] || 500) * 0.5; // 50% off
  }
  
  return baseShipping[location.toLowerCase()] || 500;
};

/**
 * Calculate tax
 */
export const calculateTax = (amount, rate = 0.16) => {
  return Math.round(amount * rate);
};

/**
 * Get status badge color
 */
export const getStatusBadgeColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    returned: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Get status icon
 */
export const getStatusIcon = (status) => {
  const icons = {
    pending: '⏳',
    processing: '⚙️',
    shipped: '🚚',
    delivered: '✓',
    cancelled: '✕',
    returned: '↩️',
  };
  return icons[status] || '•';
};

/**
 * Get category icon
 */
export const getCategoryIcon = (category) => {
  const icons = {
    phones: '📱',
    electronics: '💻',
    fashion: '👕',
    home: '🏠',
    books: '📚',
    sports: '⚽',
    beauty: '💄',
    food: '🍕',
  };
  return icons[category.toLowerCase()] || '📦';
};

/**
 * Generate order number
 */
export const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return formatDate(date);
};

/**
 * Local storage helpers
 */
export const storage = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    localStorage.clear();
  },
};

/**
 * API call handler
 */
export const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default {
  formatPrice,
  calculateDiscount,
  formatDate,
  formatDateTime,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  generateId,
  debounce,
  throttle,
  capitalize,
  truncateText,
  isEmpty,
  deepClone,
  mergeObjects,
  getInitials,
  calculateShipping,
  calculateTax,
  getStatusBadgeColor,
  getStatusIcon,
  getCategoryIcon,
  generateOrderNumber,
  getRelativeTime,
  storage,
  apiCall,
};
