import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Deals from '../components/home/Deals';
import Features from '../components/home/Features';
import Brands from '../components/home/Brands';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const Home: React.FC = () => {
  useEffect(() => {
    // Update the page title
    document.title = 'AutoPartsPro - Quality Automotive Parts & Accessories';
  }, []);

  return (
    <div>
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <Deals />
      <Brands />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;