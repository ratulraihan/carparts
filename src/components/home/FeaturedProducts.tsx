import React from 'react';
import ProductGrid from '../products/ProductGrid';
import { FEATURED_PRODUCTS } from '../../data/products';

const FeaturedProducts: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <ProductGrid
          products={FEATURED_PRODUCTS}
          title="Featured Products"
          subtitle="Top-quality parts selected by our automotive experts"
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;