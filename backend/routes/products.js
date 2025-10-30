const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  initializeProducts,
} = require('../controllers/productController');

router.get('/init', initializeProducts);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
