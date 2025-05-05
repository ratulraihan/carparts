import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Clock } from 'lucide-react';

const Deals: React.FC = () => {
  return (
    <section className="section bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Limited Time Offers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-blue-100 mb-6"
            >
              Don't miss our special promotions on premium car parts and accessories. Save up to 40% on selected items!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center mb-8"
            >
              <Clock className="h-6 w-6 mr-2 text-yellow-300" />
              <div className="text-yellow-300 font-semibold">Offer ends in:</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-4 gap-4 max-w-md mb-8"
            >
              {[
                { value: 2, label: 'Days' },
                { value: 18, label: 'Hours' },
                { value: 45, label: 'Minutes' },
                { value: 30, label: 'Seconds' },
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-blue-100">{item.label}</div>
                </div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link to="/deals">
                <Button variant="accent" size="lg">
                  View All Deals
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg" 
                  alt="Performance Parts" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                  40% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold">Performance Upgrades</h3>
                <p className="text-gray-600 text-sm mt-1">Enhance your vehicle's performance</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3807172/pexels-photo-3807172.jpeg" 
                  alt="Lighting Kits" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                  25% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold">Premium Lighting</h3>
                <p className="text-gray-600 text-sm mt-1">Upgrade your vehicle's lighting system</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/13009437/pexels-photo-13009437.jpeg" 
                  alt="Oil Change Kit" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                  30% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold">Maintenance Kits</h3>
                <p className="text-gray-600 text-sm mt-1">Complete service packages</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/13141500/pexels-photo-13141500.jpeg" 
                  alt="Interior Accessories" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                  20% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold">Interior Accessories</h3>
                <p className="text-gray-600 text-sm mt-1">Upgrade your vehicle's comfort</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Deals;