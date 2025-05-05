import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X, ShoppingCart } from 'lucide-react';
import Button from '../components/ui/Button';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Update the page title
    document.title = 'Your Cart - AutoPartsPro';
  }, []);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price * (1 - item.discount / 100) * item.quantity),
    0
  );
  
  // Calculate shipping cost (free over $50)
  const shippingCost = subtotal > 50 ? 0 : 7.99;
  
  // Calculate tax (example: 8%)
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  
  // Calculate total
  const total = subtotal + shippingCost + tax;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-4 flex justify-center">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Cart Items ({cartItems.length})</h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
                
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-24 object-contain"
                          />
                        </div>
                        
                        <div className="flex-1 sm:ml-6">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                            <div>
                              <Link to={`/products/${item.id}`} className="text-lg font-medium hover:text-blue-900 transition-colors">
                                {item.name}
                              </Link>
                              <div className="text-sm text-gray-600 mt-1">
                                {item.brand}
                              </div>
                            </div>
                            
                            <div className="mt-2 sm:mt-0 text-right sm:w-28">
                              <div className="font-bold text-gray-900">
                                {formatPrice(item.price * (1 - item.discount / 100) * item.quantity)}
                              </div>
                              {item.discount > 0 && (
                                <div className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.price * item.quantity)}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="p-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="mx-3">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center text-red-600 hover:text-red-800 transition-colors mt-3 sm:mt-0"
                            >
                              <X className="h-4 w-4 mr-1" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span className="font-medium">{formatPrice(tax)}</span>
                    </div>
                    
                    <div className="h-px bg-gray-200 my-4"></div>
                    
                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-lg">{formatPrice(total)}</span>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={() => navigate('/checkout')}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                    
                    <div className="mt-4">
                      <Link to="/products">
                        <Button
                          variant="outline"
                          size="lg"
                          fullWidth
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;