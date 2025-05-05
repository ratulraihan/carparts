import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import VehicleSelector from '../components/ui/VehicleSelector';
import { PRODUCTS } from '../data/products';
import { Filter, Check, ChevronDown } from 'lucide-react';
import { Product } from '../types/product';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique brands from products
  const brands = Array.from(new Set(PRODUCTS.map(p => p.brand)));
  
  // Get unique categories from products
  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));

  useEffect(() => {
    // Update the page title
    document.title = 'All Products - AutoPartsPro';
    
    // Get filters from URL params
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const year = searchParams.get('year');
    
    if (category) {
      setSelectedCategory(category);
    }
    
    // Apply filters
    let filteredProducts = [...PRODUCTS];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (make && model && year) {
      filteredProducts = filteredProducts.filter(
        product => 
          product.compatibility && 
          product.compatibility.some(
            compat => compat.toLowerCase().includes(make.toLowerCase()) && 
                    compat.toLowerCase().includes(model.toLowerCase())
          )
      );
    }
    
    setProducts(filteredProducts);
  }, [searchParams]);
  
  // Apply selected filters
  useEffect(() => {
    let filteredProducts = [...PRODUCTS];
    
    // Apply brand filter
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand));
    }
    
    // Apply price filter
    filteredProducts = filteredProducts.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Apply category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        p => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setProducts(filteredProducts);
  }, [selectedBrands, priceRange, selectedCategory]);
  
  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
  };

  return (
    <div className="bg-gray-50">
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">
            {products.length} products found
          </p>
        </div>
        
        {/* Vehicle Selector */}
        <div className="mb-8">
          <VehicleSelector compact />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                <span className="font-medium">Filters</span>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              
              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center">
                      <button
                        className="w-5 h-5 border rounded flex items-center justify-center mr-2"
                        onClick={() => toggleBrand(brand)}
                      >
                        {selectedBrands.includes(brand) && <Check className="h-4 w-4 text-blue-900" />}
                      </button>
                      <span>{brand}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <button
                      className="w-5 h-5 border rounded flex items-center justify-center mr-2"
                      onClick={() => setSelectedCategory(null)}
                    >
                      {selectedCategory === null && <Check className="h-4 w-4 text-blue-900" />}
                    </button>
                    <span>All Categories</span>
                  </div>
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <button
                        className="w-5 h-5 border rounded flex items-center justify-center mr-2"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {selectedCategory === category && <Check className="h-4 w-4 text-blue-900" />}
                      </button>
                      <span>{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Products */}
          <div className={`${showFilters ? 'mt-4 lg:mt-0' : ''} lg:w-3/4`}>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;