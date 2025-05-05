import React from 'react';
import VehicleSelector from '../ui/VehicleSelector';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleVehicleSelect = (make: string, model: string, year: string) => {
    navigate(`/products?make=${make}&model=${model}&year=${year}`);
  };

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/12086860/pexels-photo-12086860.jpeg')",
        }}
      />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Quality Parts for <span className="text-red-500">Every</span> Vehicle
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8">
              Find the perfect parts for your car with our easy-to-use search. We offer high-quality products at competitive prices.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => navigate('/products')}
              >
                Shop All Parts <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/deals')}
              >
                View Special Offers
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100K+</div>
                <div className="text-gray-400 text-sm">Parts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5K+</div>
                <div className="text-gray-400 text-sm">Vehicles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:ml-auto max-w-lg"
          >
            <VehicleSelector onSelect={handleVehicleSelect} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;