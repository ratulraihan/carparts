import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="product-card group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          {product.discount > 0 && (
            <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 text-xs font-bold">
              {product.discount}% OFF
            </div>
          )}
          <button
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors text-gray-700 hover:text-red-500"
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              {product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-lg font-bold text-gray-900 mr-2">
                    {formatPrice(product.price * (1 - product.discount / 100))}
                  </span>
                  <span className="text-sm line-through text-gray-500">
                    {formatPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-blue-900 text-white hover:bg-blue-800 transition-colors"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </motion.button>
          </div>
          
          {product.freeShipping && (
            <div className="mt-2 text-xs text-green-600 font-medium">
              Free Shipping
            </div>
          )}

          {product.compatibility && (
            <div className="mt-2 text-xs text-gray-600">
              Fits: {product.compatibility.slice(0, 2).join(', ')}
              {product.compatibility.length > 2 ? ' & more' : ''}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;