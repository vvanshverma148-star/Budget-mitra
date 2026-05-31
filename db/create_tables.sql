-- create_tables.sql
-- Beginner-friendly schema for Antigravity Hackathon

-- 1. PRODUCTS TABLE
-- This table stores the current snapshot of products across different platforms.
-- It maps directly to the 'products_current.csv' dataset.
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_key VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    product_name VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    price_inr FLOAT NOT NULL,
    rating FLOAT,
    reviews_count INT,
    delivery_days INT,
    image VARCHAR(500),
    url VARCHAR(500),
    
    -- Indexes for faster searching and filtering
    INDEX idx_product_key (product_key),
    INDEX idx_platform (platform),
    INDEX idx_category (category)
);

-- 2. PRICE HISTORY TABLE
-- This table stores the monthly price data for ML and trend graphs.
-- It maps directly to the 'price_history_monthly.csv' dataset.
CREATE TABLE IF NOT EXISTS price_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_key VARCHAR(255) NOT NULL,
    product_name VARCHAR(255),
    category VARCHAR(100),
    platform VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    price_inr FLOAT NOT NULL,
    
    -- Foreign Key concept: linking to the products table via product_key
    -- Indexes for fast time-series queries
    INDEX idx_history_product_key (product_key),
    INDEX idx_history_platform (platform),
    INDEX idx_history_date (date)
);

-- 3. ALERTS TABLE
-- Stores user price alerts for background checking.
CREATE TABLE IF NOT EXISTS alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_key VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    target_price FLOAT NOT NULL,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_alert_product (product_key),
    INDEX idx_alert_status (status)
);

-- 4. PRODUCT CHARGES TABLE
CREATE TABLE IF NOT EXISTS product_charges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_key VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    platform_fee FLOAT,
    delivery_charge FLOAT,
    packaging_fee FLOAT,
    tax_percent FLOAT,
    INDEX idx_charges_product_platform (product_key, platform)
);

-- 5. PRODUCT OFFERS TABLE
CREATE TABLE IF NOT EXISTS product_offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_key VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    coupon_code VARCHAR(100),
    coupon_discount FLOAT,
    bank_name VARCHAR(100),
    payment_method VARCHAR(50),
    card_type VARCHAR(100),
    min_order_amount FLOAT,
    discount_amount FLOAT,
    discount_percent FLOAT,
    max_discount FLOAT,
    INDEX idx_offers_product_platform (product_key, platform)
);

-- 6. REVIEW SUMMARIES TABLE
CREATE TABLE IF NOT EXISTS review_summaries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_key VARCHAR(255) NOT NULL,
    overall_sentiment VARCHAR(50),
    top_pros TEXT,
    top_cons TEXT,
    common_complaints TEXT,
    ai_summary TEXT,
    buying_advice TEXT,
    INDEX idx_reviews_product (product_key)
);

-- 7. RISK FACTORS TABLE
CREATE TABLE IF NOT EXISTS risk_factors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_key VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    return_risk FLOAT,
    delivery_risk FLOAT,
    discount_reliability FLOAT,
    availability_risk FLOAT,
    INDEX idx_risk_product_platform (product_key, platform)
);
