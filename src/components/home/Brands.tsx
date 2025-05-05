import React from 'react';
import { motion } from 'framer-motion';

// Sample brand logos - in a real app, these would be actual brand logos
const brands = [
  { id: 1, name: 'Bosch', image: 'https://images.pexels.com/photos/3806252/pexels-photo-3806252.jpeg' },
  { id: 2, name: 'NGK', image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg' },
  { id: 3, name: 'Monroe', image: 'https://images.pexels.com/photos/7390/pexels-photo.jpg' },
  { id: 4, name: 'ACDelco', image: 'https://images.pexels.com/photos/7256584/pexels-photo-7256584.jpeg' },
  { id: 5, name: 'Moog', image: 'https://images.pexels.com/photos/2611710/pexels-photo-2611710.jpeg' },
  { id: 6, name: 'Fram', image: 'https://images.pexels.com/photos/4200740/pexels-photo-4200740.jpeg' },
];

const Brands: React.FC = () => {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top Brands We Carry</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with the most trusted names in the automotive industry to bring you quality parts you can rely on.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-6 rounded-lg flex items-center justify-center hover:shadow-md transition-all"
            >
              <img 
                src={brand.image} 
                alt={brand.name} 
                className="max-h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;