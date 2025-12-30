import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { useAuthStore } from '../store/store';

const Checkout = () => {
  const { request } = useApi();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shippingAddress: {},
    paymentMethod: 'cod',
    deliverySlot: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const user = useAuthStore(state => state.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [name]: value
      }
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const response = await request('POST', '/orders/create', formData);
      // Redirect to order confirmation
      window.location.href = `/order-confirmation/${response.order._id}`;
    } catch (err) {
      console.error('Error placing order:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Step Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className={`flex-1 text-center py-2 ${s === step ? 'font-bold text-blue-600' : 'text-gray-400'}`}>
              Step {s}
            </div>
          ))}
        </div>

        {/* Step 1: Delivery Address */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.shippingAddress.name || ''}
                onChange={handleAddressChange}
                className="border rounded px-3 py-2 col-span-2"
              />
              <input 
                type="text"
                name="street"
                placeholder="Street Address"
                value={formData.shippingAddress.street || ''}
                onChange={handleAddressChange}
                className="border rounded px-3 py-2 col-span-2"
              />
              <input 
                type="text"
                name="city"
                placeholder="City"
                value={formData.shippingAddress.city || ''}
                onChange={handleAddressChange}
                className="border rounded px-3 py-2"
              />
              <input 
                type="text"
                name="state"
                placeholder="State"
                value={formData.shippingAddress.state || ''}
                onChange={handleAddressChange}
                className="border rounded px-3 py-2"
              />
              <input 
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.shippingAddress.postalCode || ''}
                onChange={handleAddressChange}
                className="border rounded px-3 py-2"
              />
              <input 
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.shippingAddress.phone || ''}
                onChange={handleAddressChange}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
        )}

        {/* Step 2: Delivery Slot */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Select Delivery Slot</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Tomorrow 9AM-2PM', 'Tomorrow 2PM-6PM', 'Day After 9AM-2PM'].map(slot => (
                <label key={slot} className="border rounded p-4 cursor-pointer hover:bg-blue-50">
                  <input 
                    type="radio"
                    name="deliverySlot"
                    value={slot}
                    checked={formData.deliverySlot === slot}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {slot}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="border rounded p-4 cursor-pointer hover:bg-green-50 flex items-center">
                <input 
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold">Cash on Delivery (COD)</div>
                  <div className="text-sm text-gray-600">Pay when you receive your order</div>
                </div>
              </label>
              <label className="border rounded p-4 cursor-pointer hover:bg-blue-50 flex items-center">
                <input 
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <div>
                  <div className="font-semibold">Credit/Debit Card</div>
                  <div className="text-sm text-gray-600">Secure payment with card</div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 4: Order Summary */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹5,000</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹500</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>₹5,500</span>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
              <p className="text-sm"><strong>Payment Method:</strong> {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button 
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Continue
            </button>
          )}
          {step === 4 && (
            <button 
              onClick={handlePlaceOrder}
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
