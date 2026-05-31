-- seed_data.sql
-- Beginner-friendly way to quickly import the CSV files into MySQL
-- Note: You might need to adjust the file paths based on where your MySQL server is running.

-- 1. Import Current Products Data
LOAD DATA INFILE '/path/to/products_current.csv'
INTO TABLE products
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, product_key, category, brand, product_name, platform, price_inr, rating, reviews_count, delivery_days, image, url);

-- 2. Import Monthly Price History Data
LOAD DATA INFILE '/path/to/price_history_monthly.csv'
INTO TABLE price_history
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(product_key, product_name, category, platform, date, price_inr);

-- 3. Import Product Charges Data
LOAD DATA INFILE '/path/to/product_charges.csv'
INTO TABLE product_charges
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(product_key, platform, platform_fee, delivery_charge, packaging_fee, tax_percent);

-- 4. Import Product Offers Data
LOAD DATA INFILE '/path/to/product_offers.csv'
INTO TABLE product_offers
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(product_key, platform, coupon_code, coupon_discount, bank_name, payment_method, card_type, min_order_amount, discount_amount, discount_percent, max_discount);

-- 5. Import Review Summaries Data
LOAD DATA INFILE '/path/to/review_summaries.csv'
INTO TABLE review_summaries
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(product_key, overall_sentiment, top_pros, top_cons, common_complaints, ai_summary, buying_advice);

-- 6. Import Risk Factors Data
LOAD DATA INFILE '/path/to/risk_factors.csv'
INTO TABLE risk_factors
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(product_key, platform, return_risk, delivery_risk, discount_reliability, availability_risk);
