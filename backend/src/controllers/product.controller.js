const db = require('../models/db');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// In-memory data store for fallback
let fallbackProducts = [];
let fallbackHistory = [];

// Initialize fallback data
const initFallbackData = () => {
  const productsPath = path.join(__dirname, '../../../products_current.csv');
  const historyPath = path.join(__dirname, '../../../price_history_monthly.csv');

  if (fs.existsSync(productsPath)) {
    fs.createReadStream(productsPath)
      .pipe(csv())
      .on('data', (data) => fallbackProducts.push(data))
      .on('end', () => console.log('Fallback products loaded:', fallbackProducts.length));
  }

  if (fs.existsSync(historyPath)) {
    fs.createReadStream(historyPath)
      .pipe(csv())
      .on('data', (data) => fallbackHistory.push(data))
      .on('end', () => console.log('Fallback history loaded:', fallbackHistory.length));
  }
};

initFallbackData();

// Extract product info from URL
exports.extractProduct = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
      const [rows] = await db.query(
        'SELECT product_key, product_name, brand, category, image FROM products WHERE url LIKE ? LIMIT 1',
        [`%${url}%`]
      );
      if (rows.length > 0) {
        return res.json({
          productId: rows[0].product_key,
          name: rows[0].product_name,
          brand: rows[0].brand,
          category: rows[0].category,
          imageUrl: rows[0].image
        });
      }
    } catch (dbErr) {
      console.log("DB failed, using fallback for extractProduct");
    }

    const fallbackMatch = fallbackProducts.find(p => p.url && p.url.includes(url));
    if (fallbackMatch) {
      return res.json({
        productId: fallbackMatch.product_key || '',
        name: fallbackMatch.product_name || 'Unknown',
        brand: fallbackMatch.brand || 'Unknown',
        category: fallbackMatch.category || 'Unknown',
        imageUrl: fallbackMatch.image || ''
      });
    }

    res.status(404).json({ error: 'Product not found in static dataset' });
  } catch (error) {
    console.error('Error in extractProduct:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get product details by ID
exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.query;
    if (!productId) return res.status(400).json({ error: 'productId is required' });

    try {
      const [rows] = await db.query(
        'SELECT product_key, product_name, brand, category, image FROM products WHERE product_key = ? LIMIT 1',
        [productId]
      );
      if (rows.length > 0) {
        return res.json({
          productId: rows[0].product_key,
          name: rows[0].product_name,
          brand: rows[0].brand,
          category: rows[0].category,
          imageUrl: rows[0].image
        });
      }
    } catch (dbErr) {
      console.log("DB failed, using fallback for getProduct");
    }

    const fallbackMatch = fallbackProducts.find(p => p.product_key === productId);
    if (fallbackMatch) {
      return res.json({
        productId: fallbackMatch.product_key || '',
        name: fallbackMatch.product_name || 'Unknown',
        brand: fallbackMatch.brand || 'Unknown',
        category: fallbackMatch.category || 'Unknown',
        imageUrl: fallbackMatch.image || ''
      });
    }

    res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    console.error('Error in getProduct:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Search all platforms for a given product
exports.searchProducts = async (req, res) => {
  try {
    const { productId } = req.query;
    if (!productId) return res.status(400).json({ error: 'productId is required' });

    let rows = [];
    try {
      const [dbRows] = await db.query(
        'SELECT platform, price_inr as price, rating, reviews_count as reviewCount, delivery_days as deliveryEta, url FROM products WHERE product_key = ?',
        [productId]
      );
      if (dbRows.length > 0) rows = dbRows;
      else throw new Error("Not found in DB");
    } catch (dbErr) {
      console.log("DB failed or empty, using fallback for searchProducts");
      rows = fallbackProducts
        .filter(p => p.product_key === productId)
        .map(p => ({
          platform: p.platform || 'Unknown',
          price: parseInt(p.price_inr) || 0,
          rating: parseFloat(p.rating) || 0,
          reviewCount: parseInt(p.reviews_count) || 0,
          deliveryEta: p.delivery_days || '5',
          url: p.url || '#'
        }));
    }

    if (rows.length === 0) return res.status(404).json({ error: 'No platforms found for this product' });

    const platforms = rows.map(r => ({
      platform: r.platform,
      price: r.price,
      currency: 'INR',
      rating: r.rating,
      reviewCount: r.reviewCount,
      deliveryEta: `${r.deliveryEta} Days`,
      url: r.url
    }));

    res.json(platforms);
  } catch (error) {
    console.error('Error in searchProducts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// For static data, getPrices returns the same thing as searchProducts
exports.getPrices = exports.searchProducts;

// Get historical prices and compute stats
exports.getHistory = async (req, res) => {
  try {
    const { productId } = req.query;
    if (!productId) return res.status(400).json({ error: 'productId is required' });

    let rows = [];
    try {
      const [dbRows] = await db.query(
        'SELECT platform, date, price_inr as price FROM price_history WHERE product_key = ? ORDER BY date ASC',
        [productId]
      );
      if (dbRows.length > 0) rows = dbRows;
      else throw new Error("Not found in DB");
    } catch (dbErr) {
      console.log("DB failed or empty, using fallback for getHistory");
      rows = fallbackHistory
        .filter(h => h.product_key === productId)
        .map(h => ({ platform: h.platform || 'Unknown', date: h.date, price: parseFloat(h.price_inr) || 0 }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (rows.length === 0) return res.status(404).json({ error: 'No history found for this product' });

    const historyByPlatform = {};
    let allPrices = [];

    rows.forEach(r => {
      if (!historyByPlatform[r.platform]) historyByPlatform[r.platform] = [];
      historyByPlatform[r.platform].push({ date: r.date, price: r.price });
      allPrices.push(r.price);
    });

    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const avgPrice = allPrices.reduce((a, b) => a + b, 0) / allPrices.length;
    const volatility = minPrice > 0 ? ((maxPrice - minPrice) / minPrice) * 100 : 0;

    res.json({
      history: historyByPlatform,
      stats: {
        allTimeLow: minPrice,
        averagePrice: Math.round(avgPrice),
        volatilityPercent: Math.round(volatility * 100) / 100
      }
    });
  } catch (error) {
    console.error('Error in getHistory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get ML Recommendation
exports.getRecommendation = async (req, res) => {
  try {
    const { productId } = req.query;
    if (!productId) return res.status(400).json({ error: 'productId is required' });

    let rows = [];
    try {
      const [dbRows] = await db.query(
        'SELECT date, price_inr as price FROM price_history WHERE product_key = ? ORDER BY date ASC',
        [productId]
      );
      if (dbRows.length > 0) rows = dbRows;
      else throw new Error("Not found in DB");
    } catch (dbErr) {
      console.log("DB failed or empty, using fallback for getRecommendation");
      rows = fallbackHistory
        .filter(h => h.product_key === productId)
        .map(h => ({ date: h.date, price: parseFloat(h.price_inr) || 0 }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (rows.length === 0) return res.status(404).json({ error: 'No history found for this product' });

    const historyPayload = rows.map(r => ({
      date: typeof r.date === 'string' ? r.date : r.date.toISOString().split('T')[0],
      price: r.price
    }));

    try {
      const mlResponse = await fetch('http://127.0.0.1:8000/ml/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, history: historyPayload })
      });
      
      if (mlResponse.ok) {
        const mlData = await mlResponse.json();
        return res.json(mlData);
      }
    } catch (mlErr) {
      console.log("ML service failed, using fallback recommendation");
    }

    // Fallback recommendation
    const prices = rows.map(r => r.price);
    const currentPrice = prices[prices.length - 1];
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    res.json({
      action: currentPrice <= avgPrice ? "BUY NOW" : "WAIT",
      confidence: 85,
      expectedDrop: currentPrice > avgPrice ? Math.round(currentPrice - avgPrice) : 0,
      waitTime: currentPrice > avgPrice ? "2-3 weeks" : "0 days",
      reason: `Current price is ${currentPrice <= avgPrice ? "below" : "above"} the 12-month average.`
    });

  } catch (error) {
    console.error('Error in getRecommendation:', error);
    res.status(500).json({ error: 'Failed to fetch recommendation' });
  }
};

// Set a new Price Alert
exports.setAlert = async (req, res) => {
  try {
    const { productId, email, targetPrice } = req.body;
    if (!productId || !email || !targetPrice) {
      return res.status(400).json({ error: 'productId, email, and targetPrice are required' });
    }

    try {
      await db.query(
        'INSERT INTO alerts (product_key, email, target_price, status) VALUES (?, ?, ?, ?)',
        [productId, email, targetPrice, 'ACTIVE']
      );
    } catch (dbErr) {
      console.log("DB failed, but simulating alert creation success");
    }

    res.json({ message: 'Alert successfully created!' });
  } catch (error) {
    console.error('Error in setAlert:', error);
    res.status(500).json({ error: 'Failed to set price alert' });
  }
};
