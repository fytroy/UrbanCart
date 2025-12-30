import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { useAuthStore } from '../store/store';

const Login = () => {
  const { request, loading, error } = useApi();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const login = useAuthStore(state => state.login);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await request('POST', '/auth/login', formData);
      login(response.user, response.token);
      window.location.href = '/';
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        
        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
          </p>
          <a href="/forgot-password" className="text-blue-600 hover:underline text-sm block mt-2">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
