import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Sample category data
const categories = [
  { 
    id: 'engine-parts', 
    name: 'Engine Parts', 
    image: 'https://images.pexels.com/photos/2244082/pexels-photo-2244082.jpeg',
    count: 1200 
  },
  { 
    id: 'brakes-suspension', 
    name: 'Brakes & Suspension', 
    image: 'https://images.pexels.com/photos/9706144/pexels-photo-9706144.jpeg',
    count: 850 
  },
  { 
    id: 'electrical', 
    name: 'Electrical & Lighting', 
    image: 'https://images.pexels.com/photos/11293798/pexels-photo-11293798.jpeg',
    count: 950 
  },
  { 
    id: 'body-exterior', 
    name: 'Body & Exterior', 
    image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg',
    count: 720 
  },
  { 
    id: 'interior', 
    name: 'Interior Accessories', 
    image: 'https://images.pexels.com/photos/3998366/pexels-photo-3998366.jpeg',
    count: 680 
  },
  { 
    id: 'oils-fluids', 
    name: 'Oils & Fluids', 
    image: 'https://images.pexels.com/photos/10773454/pexels-photo-10773454.jpeg',
    count: 450 
  },
  { 
    id: 'wheels-tires', 
    name: 'Wheels & Tires', 
    image: 'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg',
    count: 580 
  },
  { 
    id: 'tools', 
    name: 'Tools & Equipment', 
    image: 'https://images.pexels.com/photos/6517991/pexels-photo-6517991.jpeg',
    count: 620 
  },
];

const Categories: React.FC = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive range of automotive parts and accessories, organized by category for easy navigation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/products?category=${category.id}`} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{category.count} products</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;