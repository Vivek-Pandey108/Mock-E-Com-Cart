import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const fetchProducts = async () => {
  try {
    const response = await api.get('/api/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get('/api/products/' + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Cart API
export const fetchCart = async () => {
  try {
    const response = await api.get('/api/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (productId, qty) => {
  try {
    const response = await api.post('/api/cart', {
      productId,
      qty,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete('/api/cart/' + itemId);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const updateCartItem = async (itemId, qty) => {
  try {
    const response = await api.put('/api/cart/' + itemId, {
      qty,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const checkout = async (cartItems, name, email) => {
  try {
    const response = await api.post('/api/cart/checkout', {
      cartItems,
      name,
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

export default api;
