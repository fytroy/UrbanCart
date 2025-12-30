import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('adminToken');

  const request = useCallback(async (method, endpoint, data = null) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        url: `${API_BASE_URL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      setLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, [token]);

  return { request, loading, error };
};

export default useApi;
