import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    set({ user: userData, token, error: null });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading })
}));

export const useCartStore = create((set, get) => ({
  items: [],
  total: 0,

  addToCart: (product, quantity, variant) => {
    const { items } = get();
    const existingItem = items.find(
      item => item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ ...product, quantity, variant });
    }

    set({ items });
  },

  removeFromCart: (itemId) => {
    set(state => ({
      items: state.items.filter(item => item.id !== itemId)
    }));
  },

  clearCart: () => set({ items: [], total: 0 })
}));
