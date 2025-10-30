import React, { useState } from 'react';
import './ProductGrid.css';

const ProductGrid = ({ products, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, qty) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: qty
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
    onAddToCart(product._id, qty);
    setQuantities(prev => ({
      ...prev,
      [product._id]: 1
    }));
  };

  return (
    <div className="products-container">
      <h1>Featured Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">{product.image}</div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="price">₹{product.price}</span>
                <div className="add-to-cart-section">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantities[product._id] || 1}
                    onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                    className="qty-input"
                  />
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
