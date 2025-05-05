import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, Search, Tag, RotateCcw, Users } from 'lucide-react';

const features = [
  {
    icon: <Truck className="h-7 w-7 text-blue-900" />,
    title: 'Free & Fast Shipping',
    description: 'Free shipping on orders over $50. Expedited shipping options available.',
  },
  {
    icon: <Shield className="h-7 w-7 text-blue-900" />,
    title: 'Warranty Protection',
    description: 'All products backed by manufacturer warranty and our satisfaction guarantee.',
  },
  {
    icon: <Search className="h-7 w-7 text-blue-900" />,
    title: 'Easy Parts Finder',
    description: 'Find the right parts for your specific vehicle make, model, and year.',
  },
  {
    icon: <Tag className="h-7 w-7 text-blue-900" />,
    title: 'Competitive Pricing',
    description: 'We regularly check competitors to ensure we offer the best prices.',
  },
  {
    icon: <RotateCcw className="h-7 w-7 text-blue-900" />,
    title: 'Hassle-Free Returns',
    description: '30-day returns policy with no restocking fees on most items.',
  },
  {
    icon: <Users className="h-7 w-7 text-blue-900" />,
    title: 'Expert Support',
    description: 'Our automotive experts are ready to help you find the right parts.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AutoPartsPro offers a premium shopping experience with benefits designed for automotive enthusiasts and professionals alike.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="rounded-full bg-blue-100 p-3 inline-flex mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;