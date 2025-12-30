import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { useAuthStore } from '../store/store';

const Register = () => {
  const { request, loading } = useApi();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) newErrors.terms = 'You must agree to terms and conditions';
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
      const { confirmPassword, ...registerData } = formData;
      const response = await request('POST', '/auth/register', registerData);
      login(response.user, response.token);
      window.location.href = '/';
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 text-sm ${errors.firstName ? 'border-red-500' : ''}`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 text-sm ${errors.lastName ? 'border-red-500' : ''}`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700 text-sm">
                I agree to <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
              </span>
            </label>
            {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
