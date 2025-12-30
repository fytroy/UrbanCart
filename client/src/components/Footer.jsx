import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">About UrbanCart</h3>
            <p className="text-gray-600 text-sm mb-4">
              UrbanCart is your trusted online shopping destination offering quality products with Cash-on-Delivery payment options.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-orange-500"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-orange-500"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-orange-500"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-orange-500"><FaLinkedin size={20} /></a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-500">Contact Us</a></li>
              <li><a href="#" className="hover:text-orange-500">Track Order</a></li>
              <li><a href="#" className="hover:text-orange-500">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-orange-500">FAQs</a></li>
              <li><a href="#" className="hover:text-orange-500">Complaints</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-orange-500">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-orange-500">Return Policy</a></li>
              <li><a href="#" className="hover:text-orange-500">Cookie Settings</a></li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">For Sellers</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-500">Become a Seller</a></li>
              <li><a href="#" className="hover:text-orange-500">Seller Dashboard</a></li>
              <li><a href="#" className="hover:text-orange-500">Seller Agreement</a></li>
              <li><a href="#" className="hover:text-orange-500">Seller Guide</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2">
                <span>📞</span>
                <span>+254 711 011 011</span>
              </li>
              <li className="flex gap-2">
                <span>✉️</span>
                <span>support@urbancart.com</span>
              </li>
              <li className="flex gap-2">
                <span>📍</span>
                <span>Nairobi, Kenya</span>
              </li>
              <li className="mt-4">
                <button className="bg-orange-500 text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 w-full">
                  WhatsApp Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <p>© 2025 UrbanCart. All rights reserved. | Made with ❤️ in Kenya</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
