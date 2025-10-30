import React from 'react';
import ProductGrid from '../components/ProductGrid';

const Home = ({ products, onAddToCart }) => {
  return (
    <div>
      <ProductGrid products={products} onAddToCart={onAddToCart} />
    </div>
  );
};

export default Home;
