import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SearchBar from '../ui/SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  const categories = [
    'Engine Parts',
    'Brakes & Suspension',
    'Electrical & Lighting',
    'Body & Exterior',
    'Interior Accessories',
    'Oil & Fluids',
    'Wheels & Tires',
  ];

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setIsCategoryOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleCategories = () => setIsCategoryOpen(!isCategoryOpen);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-900">AutoParts</span>
            <span className="text-2xl font-bold text-red-600">Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-blue-900 transition-colors">
              Home
            </Link>
            
            <div className="relative">
              <button 
                onClick={toggleCategories}
                className="flex items-center font-medium hover:text-blue-900 transition-colors"
              >
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white shadow-lg rounded-md py-2 z-20">
                  {categories.map((category, index) => (
                    <Link 
                      key={index}
                      to={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/products" className="font-medium hover:text-blue-900 transition-colors">
              All Products
            </Link>
            
            <Link to="/deals" className="font-medium hover:text-blue-900 transition-colors">
              Deals
            </Link>
            
            <Link to="/about" className="font-medium hover:text-blue-900 transition-colors">
              About Us
            </Link>
            
            <Link to="/contact" className="font-medium hover:text-blue-900 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={toggleSearch} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 px-4 bg-white shadow-md rounded-md mt-2 slide-up">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md slide-up">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="font-medium py-2 hover:text-blue-900 transition-colors">
                Home
              </Link>
              
              <button
                onClick={toggleCategories}
                className="flex items-center justify-between font-medium py-2 hover:text-blue-900 transition-colors"
              >
                Categories <ChevronDown className="h-4 w-4" />
              </button>
              
              {isCategoryOpen && (
                <div className="pl-4 flex flex-col space-y-2">
                  {categories.map((category, index) => (
                    <Link 
                      key={index}
                      to={`/products?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="py-1 hover:text-blue-900 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
              
              <Link to="/products" className="font-medium py-2 hover:text-blue-900 transition-colors">
                All Products
              </Link>
              
              <Link to="/deals" className="font-medium py-2 hover:text-blue-900 transition-colors">
                Deals
              </Link>
              
              <Link to="/about" className="font-medium py-2 hover:text-blue-900 transition-colors">
                About Us
              </Link>
              
              <Link to="/contact" className="font-medium py-2 hover:text-blue-900 transition-colors">
                Contact
              </Link>
              
              <div className="pt-2">
                <SearchBar />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;