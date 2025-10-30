const Cart = require('../models/Cart');
const Product = require('../models/Product');

const userId = 'guest';

// Get cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (!productId || !qty) {
      return res.status(400).json({ message: 'Product ID and quantity required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity: qty,
      });
    }

    // Calculate total
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== id);

    // Calculate total
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;

    if (!qty || qty < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((item) => item._id.toString() === id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = qty;

    // Calculate total
    cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Checkout
const checkout = async (req, res) => {
  try {
    const { cartItems, name, email } = req.body;

    if (!cartItems || cartItems.length === 0 || !name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const receipt = {
      receiptId: 'REC-' + Date.now(),
      customerName: name,
      customerEmail: email,
      items: cartItems,
      total: total,
      timestamp: new Date(),
      status: 'Success',
    };

    // Clear cart after checkout
    let cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = [];
      cart.total = 0;
      await cart.save();
    }

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  checkout,
};
