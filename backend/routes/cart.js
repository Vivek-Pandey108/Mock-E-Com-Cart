const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  checkout,
} = require('../controllers/cartController');

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:id', removeFromCart);
router.put('/:id', updateCartItem);
router.post('/checkout', checkout);

module.exports = router;
