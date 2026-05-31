const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Extract product info from a URL
router.post('/extract-product', productController.extractProduct);

// Get product info by ID
router.get('/get-product', productController.getProduct);

// Get price comparisons across platforms
router.get('/search-products', productController.searchProducts);

// Poll for latest prices (mapped to searchProducts for static data)
router.get('/get-prices', productController.getPrices);

// Get historical prices and computed stats
router.get('/get-history', productController.getHistory);

// Get Buy/Wait recommendation from ML service
router.get('/get-recommendation', productController.getRecommendation);

// Set Price Alert
router.post('/set-alert', productController.setAlert);

module.exports = router;
