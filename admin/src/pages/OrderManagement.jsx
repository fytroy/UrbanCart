import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

const OrderManagement = () => {
  const { request } = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await request('GET', '/admin/orders');
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data && data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await request('PUT', `/admin/orders/${orderId}/status`, {
        status: newStatus,
        comment: 'Status updated by admin'
      });
      fetchOrders();
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">No orders found</p>
          <button 
            onClick={fetchOrders}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Order #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Payment</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{order.orderNumber}</td>
                  <td className="px-6 py-3">{order.user?.firstName} {order.user?.lastName}</td>
                  <td className="px-6 py-3">₹{order.total}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      order.paymentMethod === 'cod' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.paymentMethod.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <select 
                      value={order.orderStatus}
                      onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="outForDelivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-3">
                    <button className="text-blue-600 hover:underline text-sm">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
