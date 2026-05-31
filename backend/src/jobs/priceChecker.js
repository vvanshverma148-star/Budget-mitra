const Queue = require('bull');
const db = require('../models/db');

// Connect to Redis (Default localhost:6379)
// Passed maxRetriesPerRequest: null so the server doesn't crash if Redis is missing.
const priceCheckQueue = new Queue('price-check', process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  redis: { maxRetriesPerRequest: null }
});

// Prevent app crash if Redis is not installed locally
priceCheckQueue.on('error', (err) => {
  console.warn('Redis Connection Warning: Alerts background job is paused until Redis is running.');
});

priceCheckQueue.process(async (job) => {
  console.log('Running background price check job...');
  try {
    // 1. Get all ACTIVE alerts
    const [alerts] = await db.query("SELECT * FROM alerts WHERE status = 'ACTIVE'");
    
    for (const alert of alerts) {
      // 2. Get current lowest price for this product
      const [products] = await db.query(
        "SELECT MIN(price_inr) as lowest_price FROM products WHERE product_key = ?",
        [alert.product_key]
      );
      
      const currentLowest = products[0]?.lowest_price;
      
      // 3. Check if alert is triggered
      if (currentLowest && currentLowest <= alert.target_price) {
        console.log(`[ALERT TRIGGERED] Email: ${alert.email} | Product: ${alert.product_key} dropped to ₹${currentLowest}!`);
        
        // 4. Mark alert as triggered
        await db.query("UPDATE alerts SET status = 'TRIGGERED' WHERE id = ?", [alert.id]);
        
        // In a real app, send an email here using SendGrid/Nodemailer
      }
    }
  } catch (error) {
    console.error('Error in price check job:', error);
  }
});

// Add a repeating job every hour
priceCheckQueue.add({}, { repeat: { cron: '0 * * * *' } });

module.exports = priceCheckQueue;
