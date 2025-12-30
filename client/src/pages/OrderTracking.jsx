import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

const OrderTracking = ({ orderId }) => {
  const { request } = useApi();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await request('GET', `/orders/${orderId}`);
      setOrder(data);
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'outForDelivery', 'delivered'];
  const currentStatusIndex = statuses.indexOf(order.orderStatus);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Order Tracking</h1>
        <p className="text-gray-600 mb-8">Order #{order.orderNumber}</p>

        {/* Status Timeline */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="space-y-4">
            {statuses.map((status, index) => (
              <div key={status} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                  index <= currentStatusIndex ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {index < currentStatusIndex ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold capitalize">{status === 'outForDelivery' ? 'Out for Delivery' : status}</h3>
                  {index <= currentStatusIndex && (
                    <p className="text-sm text-gray-600">Completed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
            <p className="text-gray-600">{order.shippingAddress.street}</p>
            <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
            <p className="text-gray-600">{order.shippingAddress.postalCode}</p>
          </div>

          {order.deliveryAgent && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Delivery Agent</h2>
              <p className="font-semibold">{order.deliveryAgent.name}</p>
              <p className="text-gray-600">📞 {order.deliveryAgent.phone}</p>
              <p className="text-gray-600">🚗 {order.deliveryAgent.vehicleNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
