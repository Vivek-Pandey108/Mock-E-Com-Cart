import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import { fetchProducts, fetchCart, addToCart, removeFromCart, updateCartItem } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and cart on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const productsData = await fetchProducts();
        setProducts(productsData);
        
        const cartData = await fetchCart();
        setCartItems(cartData.items || []);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddToCart = async (productId, qty) => {
    try {
      const updatedCart = await addToCart(productId, qty);
      setCartItems(updatedCart.items);
      alert('Added to cart!');
    } catch (err) {
      alert('Failed to add to cart: ' + err.message);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      const updatedCart = await removeFromCart(itemId);
      setCartItems(updatedCart.items);
    } catch (err) {
      alert('Failed to remove item: ' + err.message);
    }
  };

  const handleUpdateQuantity = async (itemId, qty) => {
    if (qty < 1) {
      handleRemoveFromCart(itemId);
      return;
    }
    try {
      const updatedCart = await updateCartItem(itemId, qty);
      setCartItems(updatedCart.items);
    } catch (err) {
      alert('Failed to update quantity: ' + err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route 
          path="/" 
          element={<Home products={products} onAddToCart={handleAddToCart} />}
        />
        <Route 
          path="/cart" 
          element={
            <CartPage 
              cartItems={cartItems}
              onRemove={handleRemoveFromCart}
              onUpdateQty={handleUpdateQuantity}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
