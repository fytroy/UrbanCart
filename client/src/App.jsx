import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductCatalog from './pages/ProductCatalog';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderTracking from './pages/OrderTracking';
import './styles/index.css';
import './styles/global.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
