import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { request } = useApi();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  const fetchDashboardMetrics = async () => {
    try {
      setLoading(true);
      const data = await request('GET', '/admin/dashboard');
      if (data && typeof data === 'object') {
        setMetrics(data);
      } else {
        setMetrics({
          totalOrders: 0,
          totalRevenue: 0,
          codOrders: 0,
          cardOrders: 0,
          totalCustomers: 0
        });
      }
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err);
      setMetrics({
        totalOrders: 0,
        totalRevenue: 0,
        codOrders: 0,
        cardOrders: 0,
        totalCustomers: 0
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">No data available</p>
          <button 
            onClick={fetchDashboardMetrics}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{metrics.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">₹{metrics.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">COD Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">{metrics.codOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-purple-600">{metrics.totalCustomers}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: 'COD', orders: metrics.codOrders },
            { name: 'Card', orders: metrics.cardOrders }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
