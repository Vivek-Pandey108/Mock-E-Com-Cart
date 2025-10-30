const Product = require('../models/Product');

const mockProducts = [
  {
    name: 'Wireless Headphones',
    price: 2999,
    description: 'High-quality wireless headphones with noise cancellation',
    image: '🎧',
  },
  {
    name: 'USB-C Cable',
    price: 499,
    description: 'Durable USB-C charging cable',
    image: '🔌',
  },
  {
    name: 'Phone Case',
    price: 599,
    description: 'Protective phone case for all models',
    image: '📱',
  },
  {
    name: 'Portable Charger',
    price: 1299,
    description: '20000mAh portable power bank',
    image: '🔋',
  },
  {
    name: 'Screen Protector',
    price: 399,
    description: 'Tempered glass screen protector',
    image: '🛡️',
  },
  {
    name: 'Webcam',
    price: 2499,
    description: '1080p HD webcam for streaming',
    image: '📹',
  },
  {
    name: 'Mouse Pad',
    price: 299,
    description: 'Non-slip gaming mouse pad',
    image: '🖱️',
  },
  {
    name: 'Keyboard',
    price: 3499,
    description: 'Mechanical gaming keyboard',
    image: '⌨️',
  },
];

// Initialize products
const initializeProducts = async (req, res) => {
  try {
    const existingProducts = await Product.countDocuments();
    if (existingProducts === 0) {
      await Product.insertMany(mockProducts);
      console.log('Mock products inserted');
    }
    res.json({ message: 'Products initialized' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();
    
    if (products.length === 0) {
      products = await Product.insertMany(mockProducts);
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  initializeProducts,
};
