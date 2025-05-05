import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: 'Michael Johnson',
    role: 'Car Enthusiast',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    content: 'AutoPartsPro has been my go-to for all car parts. Their selection is unmatched, and the compatibility checker has saved me from ordering the wrong parts multiple times.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Williams',
    role: 'Professional Mechanic',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    content: 'As a professional mechanic, I need parts I can rely on. AutoPartsPro delivers quality every time, and their fast shipping means my clients never have to wait long for repairs.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Rodriguez',
    role: 'DIY Auto Repair',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    content: 'The detailed product descriptions and compatibility information made it easy to find exactly what I needed for my weekend project. Will definitely shop here again!',
    rating: 4,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what customers have to say about their experience with AutoPartsPro.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;