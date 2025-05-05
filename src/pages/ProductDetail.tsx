import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { Star, Truck, ShieldCheck, RotateCcw, Minus, Plus, ShoppingCart, ChevronDown, ChevronUp, Heart, Share2 } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openSection, setOpenSection] = useState<string>('description');
  const { addToCart } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundProduct = PRODUCTS.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        // Update the page title
        document.title = `${foundProduct.name} - AutoPartsPro`;
      }
    }
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection('');
    } else {
      setOpenSection(section);
    }
  };
  
  // Calculate actual price if there's a discount
  const calculatePrice = (price: number, discount: number) => {
    if (discount > 0) {
      return price * (1 - discount / 100);
    }
    return price;
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };
  
  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="mt-4">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <div className="mt-8">
          <Link to="/products">
            <Button variant="primary">Return to Products</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Create multiple images for demo purposes
  const images = [product.image];
  for (let i = 0; i < 3; i++) {
    images.push(product.image);
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="text-sm mb-6">
          <Link to="/" className="text-gray-500 hover:text-blue-900">Home</Link>
          {' / '}
          <Link to="/products" className="text-gray-500 hover:text-blue-900">Products</Link>
          {' / '}
          <Link to={`/products?category=${product.category.toLowerCase()}`} className="text-gray-500 hover:text-blue-900">
            {product.category}
          </Link>
          {' / '}
          <span className="text-gray-800">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-4">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-80 object-contain p-8"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`bg-white rounded-md overflow-hidden border-2 ${
                    activeImage === index ? 'border-blue-900' : 'border-transparent'
                  }`}
                >
                  <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-20 object-contain p-2" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="mb-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Brand: </span>
                  <Link to={`/products?brand=${product.brand}`} className="text-sm font-medium hover:text-blue-900">
                    {product.brand}
                  </Link>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{product.reviewCount} reviews</span>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900 mr-3">
                      {formatPrice(calculatePrice(product.price, product.discount))}
                    </span>
                    {product.discount > 0 && (
                      <>
                        <span className="text-xl text-gray-500 line-through mr-2">
                          {formatPrice(product.price)}
                        </span>
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
                          {product.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  {product.inStock ? (
                    <span className="text-sm text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
                
                {product.compatibility && product.compatibility.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                    <div className="font-medium text-blue-900 mb-1">Compatible with:</div>
                    <div className="text-gray-700">
                      {product.compatibility.join(', ')}
                    </div>
                  </div>
                )}
              </div>
              
              <hr className="my-6 border-gray-200" />
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-2 rounded-l-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-16 text-center py-2 bg-gray-50 border-t border-b">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 rounded-r-md bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" size="lg" className="sm:w-auto">
                  <Heart className="h-5 w-5 mr-2" />
                  <span className="sm:hidden md:inline">Add to</span> Wishlist
                </Button>
                
                <Button variant="outline" size="lg" className="sm:w-auto">
                  <Share2 className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Share</span>
                </Button>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-900" />
                  <span className="text-sm">
                    {product.freeShipping ? 'Free Shipping' : 'Standard Shipping'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-blue-900" />
                  <span className="text-sm">1 Year Warranty</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-5 w-5 text-blue-900" />
                  <span className="text-sm">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Accordion */}
        <div className="bg-white rounded-lg shadow-sm mb-12">
          {/* Description */}
          <div className="border-b border-gray-200">
            <button
              className="w-full px-6 py-4 flex items-center justify-between"
              onClick={() => toggleSection('description')}
            >
              <h3 className="text-lg font-semibold">Product Description</h3>
              {openSection === 'description' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {openSection === 'description' && (
              <div className="px-6 py-4">
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
              </div>
            )}
          </div>
          
          {/* Specifications */}
          <div className="border-b border-gray-200">
            <button
              className="w-full px-6 py-4 flex items-center justify-between"
              onClick={() => toggleSection('specifications')}
            >
              <h3 className="text-lg font-semibold">Specifications</h3>
              {openSection === 'specifications' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {openSection === 'specifications' && (
              <div className="px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Technical Details</h4>
                    <ul className="space-y-2">
                      <li className="flex">
                        <span className="w-32 text-gray-600">Brand:</span>
                        <span className="font-medium">{product.brand}</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 text-gray-600">Part Number:</span>
                        <span className="font-medium">PN-{product.id}-{product.brand.slice(0, 3).toUpperCase()}</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 text-gray-600">Weight:</span>
                        <span className="font-medium">{(Math.random() * 5 + 0.5).toFixed(2)} lbs</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 text-gray-600">Dimensions:</span>
                        <span className="font-medium">{(Math.random() * 10 + 5).toFixed(1)} x {(Math.random() * 10 + 5).toFixed(1)} x {(Math.random() * 5 + 1).toFixed(1)} inches</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Product Features</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Premium quality materials</li>
                      <li>Designed for optimal performance</li>
                      <li>Easy installation</li>
                      <li>Manufacturer's warranty included</li>
                      <li>Meets OEM specifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Reviews */}
          <div className="border-b border-gray-200">
            <button
              className="w-full px-6 py-4 flex items-center justify-between"
              onClick={() => toggleSection('reviews')}
            >
              <h3 className="text-lg font-semibold">Reviews ({product.reviewCount})</h3>
              {openSection === 'reviews' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {openSection === 'reviews' && (
              <div className="px-6 py-4">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="text-3xl font-bold">{product.rating.toFixed(1)}</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map(star => {
                      const percentage = Math.floor(Math.random() * 100);
                      return (
                        <div key={star} className="flex items-center mb-1">
                          <div className="text-sm w-6">{star}</div>
                          <div className="h-2 w-full bg-gray-200 rounded-full ml-2 mr-3">
                            <div
                              className="h-2 bg-yellow-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-sm w-8">{percentage}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mb-6">
                  <Button variant="primary">Write a Review</Button>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${
                                j < (i === 0 ? 5 : i === 1 ? 4 : 3) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">
                          {i === 0 ? 'Perfect fit!' : i === 1 ? 'Great quality' : 'Good value'}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-2">
                        By {i === 0 ? 'John D.' : i === 1 ? 'Sarah M.' : 'Mike T.'} on {
                          new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
                        }
                      </div>
                      
                      <p className="text-gray-700">
                        {i === 0 
                          ? 'This part was exactly what I needed for my car. Perfect fit, easy installation, and great quality. Highly recommended!' 
                          : i === 1 
                            ? 'Very good quality product. Shipping was fast and the part arrived well-packaged. It\'s been working great so far.' 
                            : 'Good value for the price. Installation took a bit longer than expected, but the part works as it should.'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Shipping & Returns */}
          <div>
            <button
              className="w-full px-6 py-4 flex items-center justify-between"
              onClick={() => toggleSection('shipping')}
            >
              <h3 className="text-lg font-semibold">Shipping & Returns</h3>
              {openSection === 'shipping' ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            
            {openSection === 'shipping' && (
              <div className="px-6 py-4">
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Shipping Information</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Free shipping on orders over $50</li>
                    <li>Standard shipping: 3-5 business days</li>
                    <li>Expedited shipping: 1-2 business days (additional fee)</li>
                    <li>International shipping available for select countries</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Return Policy</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>30-day return period for most items</li>
                    <li>Items must be unused and in original packaging</li>
                    <li>Return shipping fees may apply</li>
                    <li>Defective items can be returned for free replacement</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PRODUCTS.filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(relatedProduct => (
                <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-4">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-40 object-contain mb-4"
                      />
                      <h3 className="font-medium text-gray-900 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < relatedProduct.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({relatedProduct.reviewCount})</span>
                      </div>
                      <div className="mt-2">
                        {relatedProduct.discount > 0 ? (
                          <div className="flex items-center">
                            <span className="font-bold text-gray-900 mr-2">
                              {formatPrice(calculatePrice(relatedProduct.price, relatedProduct.discount))}
                            </span>
                            <span className="text-sm line-through text-gray-500">
                              {formatPrice(relatedProduct.price)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-gray-900">
                            {formatPrice(relatedProduct.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;