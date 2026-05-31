# ⚙️ TECHSTACK.md — System Design Document
# Antigravity — AI-Powered Price Intelligence Platform

> *"Built to scale. Designed to predict."*

---

## 1. Architecture Overview

Antigravity follows a **microservices-inspired architecture** with four independently deployable services communicating over HTTP (REST + JSON). This keeps the system modular, scalable, and allows the ML service to be updated or replaced without touching the frontend or core backend.

```
┌──────────────────────────────────────────────────────────────────────┐
│                        USER (Browser / Mobile)                       │
└─────────────────────────────────┬────────────────────────────────────┘
                                  │ HTTPS
┌─────────────────────────────────▼────────────────────────────────────┐
│                     REACT FRONTEND (Vercel)                          │
│            Next.js 14 · Tailwind CSS · Recharts · Zustand            │
└─────────────────────────────────┬────────────────────────────────────┘
                                  │ REST API (JSON)
┌─────────────────────────────────▼────────────────────────────────────┐
│                   NODE.JS BACKEND API (Render/Railway)               │
│              Express.js · JWT Auth · Redis Cache · Bull Queue        │
└──────┬──────────────────────┬──────────────────────┬────────────────┘
       │                      │                      │
       │ SQL queries           │ ML API call          │ Scraping calls
┌──────▼───────┐    ┌─────────▼────────┐    ┌────────▼───────────────┐
│   MySQL DB   │    │  PYTHON ML API   │    │  SCRAPING LAYER        │
│ (PlanetScale)│    │  (FastAPI/Flask) │    │  (Playwright/Puppeteer)│
│              │    │  Render / HuggingFace │ Proxy rotation         │
└──────────────┘    └──────────────────┘    └────────────────────────┘
       │
┌──────▼───────┐
│  REDIS CACHE │
│  (Upstash)   │
└──────────────┘
```

---

## 2. Technology Stack Summary

| Layer | Technology | Reason |
|---|---|---|
| Frontend | React + Next.js 14 (App Router) | SSR for SEO, fast navigation |
| Styling | Tailwind CSS | Utility-first, responsive by default |
| Charts | Recharts | React-native, highly customizable |
| State Management | Zustand | Lightweight, simple for this scale |
| Backend | Node.js + Express.js | Fast, widely supported, easy REST APIs |
| Authentication | JWT (JSON Web Tokens) | Stateless, scalable |
| Database | MySQL (PlanetScale) | Relational, reliable, serverless-friendly |
| Cache | Redis (Upstash) | Sub-millisecond repeated lookups |
| ML Service | Python + FastAPI | Best ML ecosystem, async-ready |
| ML Model | Prophet / ARIMA / XGBoost | Time series prediction |
| Task Queue | Bull (Redis-backed) | For async price fetching + alert jobs |
| Scraping | Playwright + Proxy Rotation | Headless browser for dynamic sites |
| Email | SendGrid / AWS SES | Reliable transactional email |
| Hosting (Frontend) | Vercel | Zero-config Next.js deployment |
| Hosting (Backend) | Render / Railway | Simple Node.js deployment |
| Hosting (ML) | Render (Python service) | Or HuggingFace Spaces (free) |
| Monitoring | Sentry + Logtail | Error tracking + structured logs |

---

## 3. Frontend (React + Next.js)

### Project Structure

```
antigravity-web/
├── app/
│   ├── page.tsx                 # Home — search page
│   ├── results/[productId]/
│   │   └── page.tsx             # Results — comparison + trends + recommendation
│   ├── dashboard/
│   │   └── page.tsx             # Wishlist + alert dashboard
│   ├── api/                     # Next.js API routes (if needed)
│   └── layout.tsx               # Root layout (header, fonts, providers)
├── components/
│   ├── ui/                      # Design system (Button, Card, Badge, Input)
│   ├── SearchBar.tsx
│   ├── ComparisonTable.tsx
│   ├── PriceTrendChart.tsx
│   ├── RecommendationCard.tsx
│   ├── AlertSetup.tsx
│   └── DashboardProductCard.tsx
├── lib/
│   ├── api.ts                   # All API calls (axios / fetch wrappers)
│   ├── utils.ts                 # formatPrice, formatDate, etc.
│   └── hooks/
│       ├── useProduct.ts
│       └── useAlerts.ts
├── store/
│   └── useAppStore.ts           # Zustand global state
└── public/
    └── icons/, images/
```

### Key Libraries

```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "tailwindcss": "^3.4.0",
  "recharts": "^2.10.0",
  "zustand": "^4.5.0",
  "axios": "^1.6.0",
  "lucide-react": "^0.330.0",
  "date-fns": "^3.0.0",
  "clsx": "^2.0.0"
}
```

---

## 4. Backend (Node.js + Express)

### Project Structure

```
antigravity-api/
├── src/
│   ├── routes/
│   │   ├── product.routes.js
│   │   ├── price.routes.js
│   │   ├── alert.routes.js
│   │   └── auth.routes.js
│   ├── controllers/
│   │   ├── product.controller.js
│   │   ├── price.controller.js
│   │   ├── alert.controller.js
│   │   └── auth.controller.js
│   ├── services/
│   │   ├── scraper.service.js     # Playwright-based scraping
│   │   ├── matcher.service.js     # Cross-platform product matching
│   │   ├── ml.service.js          # Calls Python ML API
│   │   ├── alert.service.js       # Alert checking + notification
│   │   └── email.service.js       # SendGrid / SES
│   ├── models/
│   │   └── db.js                  # MySQL connection pool (mysql2)
│   ├── middlewares/
│   │   ├── auth.middleware.js      # JWT verification
│   │   ├── rateLimit.middleware.js # Per-user rate limiting
│   │   └── cache.middleware.js     # Redis cache layer
│   ├── jobs/
│   │   ├── pricePoller.job.js      # Bull job: polls prices every 30 min
│   │   └── alertChecker.job.js     # Bull job: checks alert thresholds
│   └── app.js
├── .env
└── package.json
```

---

## 5. API Endpoints (Full Specification)

### 5.1 `POST /api/extract-product`

**Purpose:** Extract product details from a URL

**Request:**
```json
{
  "url": "https://www.amazon.in/dp/B09XS7JWHH"
}
```

**Response:**
```json
{
  "productId": "uuid-xxxx",
  "name": "Sony WH-1000XM5 Wireless Headphones",
  "brand": "Sony",
  "category": "electronics",
  "image": "https://cdn.amazon.in/...",
  "originalPlatform": "amazon",
  "originalPrice": 24990,
  "asin": "B09XS7JWHH"
}
```

---

### 5.2 `GET /api/search-products?productId=<id>`

**Purpose:** Find matching product listings across all supported platforms

**Response:**
```json
{
  "results": [
    {
      "platform": "amazon",
      "platformProductId": "B09XS7JWHH",
      "price": 24990,
      "rating": 4.5,
      "reviewCount": 12400,
      "deliveryEta": "Tomorrow by 10 PM",
      "isFreeDelivery": true,
      "url": "https://amazon.in/dp/..."
    },
    {
      "platform": "flipkart",
      "price": 26499,
      "rating": 4.3,
      "deliveryEta": "2 days",
      "isFreeDelivery": true,
      "url": "https://flipkart.com/..."
    }
  ]
}
```

---

### 5.3 `GET /api/get-prices?productId=<id>`

**Purpose:** Get current live prices (refresh / re-scrape)

**Response:** Same structure as search-products results, with a `fetchedAt` timestamp

---

### 5.4 `GET /api/get-history?productId=<id>&platform=<platform>&days=<30>`

**Purpose:** Retrieve historical price data for chart rendering

**Request params:** `productId`, `platform` (optional, defaults to all), `days` (7 / 30 / 90)

**Response:**
```json
{
  "platform": "amazon",
  "history": [
    { "date": "2026-01-01", "price": 27990 },
    { "date": "2026-01-08", "price": 26500 },
    { "date": "2026-01-15", "price": 24990 }
  ],
  "stats": {
    "allTimeLow": 23490,
    "allTimeHigh": 32990,
    "avg30Day": 27200,
    "volatility": "medium"
  }
}
```

---

### 5.5 `POST /api/predict-price`

**Purpose:** Call the ML service for price prediction and recommendation

**Request:**
```json
{
  "productId": "uuid-xxxx",
  "platform": "amazon",
  "history": [ ... ]
}
```

**Response:**
```json
{
  "recommendation": "BUY_NOW",
  "confidence": 0.84,
  "dealScore": 82,
  "dealLabel": "GREAT_DEAL",
  "explanation": "Current price is 18% below 30-day average. Trend shows upward movement likely within 4-6 days.",
  "predictedPrices": [
    { "daysFromNow": 3, "price": 25490 },
    { "daysFromNow": 7, "price": 26200 },
    { "daysFromNow": 14, "price": 27100 }
  ],
  "expectedDropWindow": null
}
```

---

### 5.6 `POST /api/set-alert`

**Purpose:** Create a price alert for a user

**Request (requires JWT):**
```json
{
  "productId": "uuid-xxxx",
  "targetPrice": 22000,
  "platform": "amazon",
  "notifyEmail": true,
  "notifyInApp": true
}
```

**Response:**
```json
{
  "alertId": "alert-uuid",
  "status": "active",
  "message": "Alert set! We'll notify you when the price drops below ₹22,000."
}
```

---

### 5.7 `GET /api/alerts` (JWT Required)

**Purpose:** Get all alerts for the authenticated user

---

### 5.8 `DELETE /api/alerts/:alertId` (JWT Required)

**Purpose:** Remove an alert

---

## 6. Database Design (MySQL)

### Table: `users`

```sql
CREATE TABLE users (
  id            VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
  email         VARCHAR(255)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  name          VARCHAR(100),
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

### Table: `products`

```sql
CREATE TABLE products (
  id            VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
  name          VARCHAR(500)  NOT NULL,
  brand         VARCHAR(100),
  category      VARCHAR(100),
  image_url     TEXT,
  fingerprint   VARCHAR(255)  NOT NULL,  -- used for cross-platform matching
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_fingerprint (fingerprint)
);
```

---

### Table: `platform_prices`

```sql
CREATE TABLE platform_prices (
  id                  VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
  product_id          VARCHAR(36)   NOT NULL,
  platform            VARCHAR(50)   NOT NULL,  -- 'amazon', 'flipkart', etc.
  platform_product_id VARCHAR(255),             -- ASIN, SKU, etc.
  current_price       DECIMAL(10,2) NOT NULL,
  rating              DECIMAL(3,2),
  review_count        INT,
  delivery_eta        VARCHAR(100),
  is_free_delivery    BOOLEAN       DEFAULT FALSE,
  product_url         TEXT,
  last_fetched_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY uq_product_platform (product_id, platform),
  INDEX idx_product_id (product_id)
);
```

---

### Table: `price_history`

```sql
CREATE TABLE price_history (
  id          VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
  product_id  VARCHAR(36)   NOT NULL,
  platform    VARCHAR(50)   NOT NULL,
  price       DECIMAL(10,2) NOT NULL,
  recorded_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product_platform_date (product_id, platform, recorded_at)
);
```

> **Note:** `price_history` is the most-queried table. The composite index on `(product_id, platform, recorded_at)` is essential for fast trend queries.

---

### Table: `alerts`

```sql
CREATE TABLE alerts (
  id             VARCHAR(36)     PRIMARY KEY DEFAULT (UUID()),
  user_id        VARCHAR(36)     NOT NULL,
  product_id     VARCHAR(36)     NOT NULL,
  platform       VARCHAR(50),                  -- NULL means any platform
  target_price   DECIMAL(10,2)   NOT NULL,
  notify_email   BOOLEAN         DEFAULT TRUE,
  notify_in_app  BOOLEAN         DEFAULT TRUE,
  status         ENUM('active', 'triggered', 'paused', 'deleted')
                                 DEFAULT 'active',
  triggered_at   TIMESTAMP       NULL,
  created_at     TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)    REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_status_active (status)
);
```

---

### Table: `notifications`

```sql
CREATE TABLE notifications (
  id          VARCHAR(36)   PRIMARY KEY DEFAULT (UUID()),
  user_id     VARCHAR(36)   NOT NULL,
  alert_id    VARCHAR(36),
  type        ENUM('price_drop', 'system', 'deal_found') DEFAULT 'price_drop',
  title       VARCHAR(255)  NOT NULL,
  body        TEXT,
  is_read     BOOLEAN       DEFAULT FALSE,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_unread (user_id, is_read)
);
```

---

### Entity Relationship Diagram

```
users (1) ──────────── (many) alerts
  │                              │
  │                              │ references
  │                              ▼
  └─── (many) notifications    products (1) ──── (many) platform_prices
                                    │
                                    └─────────── (many) price_history
```

---

## 7. Machine Learning Service (Python + FastAPI)

### Service Architecture

```
antigravity-ml/
├── main.py                  # FastAPI app entry point
├── routers/
│   └── predict.py           # POST /predict endpoint
├── models/
│   ├── prophet_model.py     # Facebook Prophet (primary)
│   ├── arima_model.py       # ARIMA (fallback)
│   └── deal_scorer.py       # Rule-based deal scoring
├── preprocessors/
│   └── price_cleaner.py     # Handle missing data, outliers
├── utils/
│   └── volatility.py        # Compute volatility index
└── requirements.txt
```

---

### ML Pipeline

```
INPUT: price_history[] → array of {date, price} tuples (90 days)

STEP 1 — PREPROCESSING
  ├─ Remove outliers (prices > 3σ from mean)
  ├─ Fill missing days (forward-fill)
  └─ Normalize prices

STEP 2 — FEATURE ENGINEERING
  ├─ 7-day moving average
  ├─ 30-day moving average
  ├─ Rate of change (momentum)
  ├─ Volatility score (std dev / mean)
  └─ Day-of-week effect (weekend spikes)

STEP 3 — MODEL SELECTION
  ├─ If history >= 60 days → Prophet (handles seasonality well)
  ├─ If history 20–59 days → ARIMA
  └─ If history < 20 days → Rolling average + confidence penalty

STEP 4 — PREDICTION
  └─ Predict price for next 3, 7, 14 days

STEP 5 — DEAL SCORING
  ├─ deal_score = f(current vs avg, trend direction, volatility)
  ├─ Score 0–100:
  │     80–100 → GREAT DEAL (Buy Now)
  │     60–79  → GOOD DEAL (Buy Now)
  │     40–59  → AVERAGE (Neutral)
  │     20–39  → OVERPRICED (Consider waiting)
  │     0–19   → BAD TIME (Wait)
  └─ Confidence: based on data volume + model fit score

OUTPUT:
  {
    "recommendation": "BUY_NOW" | "WAIT",
    "confidence": 0.0–1.0,
    "dealScore": 0–100,
    "dealLabel": "GREAT_DEAL" | "GOOD_DEAL" | "AVERAGE" | "OVERPRICED" | "BAD_TIME",
    "predictedPrices": [{daysFromNow, price}],
    "explanation": "...",
    "expectedDropWindow": null | "5–8 days"
  }
```

---

### FastAPI Endpoint

```python
# main.py
from fastapi import FastAPI
from routers.predict import router

app = FastAPI(title="Antigravity ML Service")
app.include_router(router, prefix="/ml")

# POST /ml/predict
# Body: { productId, platform, history: [{date, price}] }
# Returns: prediction object (see schema above)
```

---

### Model: Facebook Prophet (Primary)

```python
from prophet import Prophet
import pandas as pd

def predict_with_prophet(history: list, days_ahead: int = 14):
    df = pd.DataFrame(history)
    df.columns = ['ds', 'y']  # Prophet expects 'ds' and 'y'
    
    model = Prophet(
        daily_seasonality=False,
        weekly_seasonality=True,
        changepoint_prior_scale=0.1  # Lower = less sensitive to recent changes
    )
    model.fit(df)
    
    future = model.make_future_dataframe(periods=days_ahead)
    forecast = model.predict(future)
    
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(days_ahead)
```

---

### Deal Scorer Logic

```python
def compute_deal_score(current_price, avg_30d, trend_direction, volatility):
    """
    Returns score 0–100
    """
    # How far below average is the current price?
    pct_vs_avg = (avg_30d - current_price) / avg_30d  # positive = below avg = good

    # Base score from price position
    base_score = 50 + (pct_vs_avg * 200)  # ±20% deviation = ±40 points
    base_score = max(0, min(100, base_score))

    # Trend adjustment
    if trend_direction == "falling":
        base_score += 10   # Price going down = more favorable
    elif trend_direction == "rising":
        base_score -= 10   # Price going up = less favorable

    # Volatility penalty (noisy data = less confidence)
    if volatility == "high":
        base_score *= 0.85

    return round(max(0, min(100, base_score)))
```

---

## 8. Price Drop Alert System

### How It Works (End-to-End)

```
STEP 1: USER SETS ALERT
├─ POST /api/set-alert (with JWT)
├─ Node.js validates and stores in MySQL alerts table
│    {user_id, product_id, platform, target_price, status: 'active'}
└─ Responds with confirmation

STEP 2: BACKGROUND SCHEDULER STARTS
├─ Bull queue job: "price-poller" runs every 30 minutes
├─ Fetches all alerts WHERE status = 'active'
├─ For each alert:
│   ├─ Gets latest price for product+platform from platform_prices
│   ├─ If price is stale (>30 min): triggers a fresh scrape
│   └─ Compares: current_price <= target_price?

STEP 3: TRIGGER CONDITION MET
├─ Updates alert: status = 'triggered', triggered_at = NOW()
├─ Creates record in notifications table
├─ If notify_email = true → sends email via SendGrid
└─ If notify_in_app = true → marks notification as unread (polled by frontend)

STEP 4: USER IS NOTIFIED
├─ Email: "🎉 Price Alert: Sony WH-1000XM5 dropped to ₹22,490!"
│          [Go to Amazon] button in email
└─ In-app: notification bell badge, click to see details
```

---

### Bull Queue Job (Node.js)

```javascript
// jobs/pricePoller.job.js
const Queue = require('bull');
const { checkAlerts } = require('../services/alert.service');

const pricePollerQueue = new Queue('price-poller', {
  redis: process.env.REDIS_URL
});

// Add recurring job: every 30 minutes
pricePollerQueue.add({}, {
  repeat: { cron: '*/30 * * * *' }
});

pricePollerQueue.process(async (job) => {
  console.log('[PricePoller] Checking active alerts...');
  
  // Fetch all active alerts from DB
  const activeAlerts = await db.query(
    `SELECT a.*, pp.current_price 
     FROM alerts a
     JOIN platform_prices pp ON a.product_id = pp.product_id
     AND (a.platform = pp.platform OR a.platform IS NULL)
     WHERE a.status = 'active'`
  );

  for (const alert of activeAlerts) {
    if (alert.current_price <= alert.target_price) {
      await triggerAlert(alert);
    }
  }
});

async function triggerAlert(alert) {
  // 1. Update alert status
  await db.query(
    `UPDATE alerts SET status='triggered', triggered_at=NOW() WHERE id=?`,
    [alert.id]
  );

  // 2. Create in-app notification
  await db.query(
    `INSERT INTO notifications (user_id, alert_id, type, title, body)
     VALUES (?, ?, 'price_drop', ?, ?)`,
    [
      alert.user_id,
      alert.id,
      `Price Alert Triggered!`,
      `The product dropped to ₹${alert.current_price}, below your target of ₹${alert.target_price}`
    ]
  );

  // 3. Send email if requested
  if (alert.notify_email) {
    await emailService.sendPriceAlert(alert);
  }
}
```

---

## 9. Notification System

### Email (SendGrid)

```javascript
// services/email.service.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendPriceAlert(alert) {
  const msg = {
    to: alert.user_email,
    from: 'alerts@antigravity.app',
    subject: `🎉 Price Drop Alert: ${alert.product_name}`,
    html: `
      <h2>Your price alert was triggered!</h2>
      <p><strong>${alert.product_name}</strong> dropped to 
         <strong>₹${alert.current_price}</strong></p>
      <p>Your target was: ₹${alert.target_price}</p>
      <a href="${alert.product_url}" 
         style="background:#4F46E5;color:white;padding:12px 24px;border-radius:8px;
                text-decoration:none;display:inline-block;margin-top:16px">
        Buy Now on ${alert.platform}
      </a>
      <p style="color:#9CA3AF;font-size:12px;margin-top:24px">
        Antigravity · Unsubscribe
      </p>
    `
  };
  await sgMail.send(msg);
}
```

### In-App Notification (Polling)

- Frontend polls `GET /api/notifications/unread` every 60 seconds when user is logged in
- Bell icon shows unread count badge
- Clicking opens a notification drawer
- Marking as read: `PATCH /api/notifications/:id/read`

---

## 10. Caching Strategy (Redis / Upstash)

```
Cache Key Pattern:       TTL          Use Case
────────────────────────────────────────────────────
product:{id}            24h          Product metadata
prices:{id}             30min        Live comparison prices
history:{id}:{platform} 6h           Price history data
prediction:{id}         2h           ML prediction result
search:{fingerprint}    15min        Cross-platform matches
```

**Implementation:**

```javascript
// middlewares/cache.middleware.js
const redis = require('../lib/redis');

function cacheMiddleware(ttlSeconds) {
  return async (req, res, next) => {
    const key = `${req.path}:${JSON.stringify(req.query)}`;
    const cached = await redis.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    // Store original json method, intercept response
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      redis.setex(key, ttlSeconds, JSON.stringify(body));
      return originalJson(body);
    };
    
    next();
  };
}
```

---

## 11. Integration: Node.js ↔ Python ML Service

```javascript
// services/ml.service.js
const axios = require('axios');

async function getPricePrediction(productId, platform, history) {
  try {
    const response = await axios.post(
      `${process.env.ML_SERVICE_URL}/ml/predict`,
      { productId, platform, history },
      { timeout: 10000 }  // 10 second timeout
    );
    return response.data;
  } catch (error) {
    console.error('[ML Service] Prediction failed:', error.message);
    // Graceful fallback: return neutral recommendation
    return {
      recommendation: 'INSUFFICIENT_DATA',
      confidence: 0,
      dealScore: 50,
      explanation: 'Not enough data to make a confident recommendation.'
    };
  }
}
```

**Communication:** JSON over HTTP. The Node.js backend calls the Python FastAPI service via internal network (same cloud region for minimal latency). The ML service is stateless — each request is independent.

---

## 12. Scraping Layer

### Strategy

```
Priority 1: Official APIs (where available)
  └─ Amazon Product Advertising API
  └─ Flipkart Affiliate API

Priority 2: Structured scraping with Playwright
  └─ Headless Chromium for JS-rendered pages
  └─ Rotating proxy pool (residential IPs via ScraperAPI / Bright Data)
  └─ Randomized delays + human-like behavior

Priority 3: Fallback to static HTML parsing
  └─ Cheerio for non-dynamic pages
```

### Fingerprinting for Product Matching

```javascript
// services/matcher.service.js
function generateFingerprint(product) {
  // Normalize: lowercase, remove special chars, extract key terms
  const tokens = [
    product.brand?.toLowerCase(),
    product.modelNumber?.toLowerCase(),
    product.category?.toLowerCase()
  ].filter(Boolean);
  
  return tokens.join(':');
}

// Example: "sony:wh-1000xm5:headphones"
// This fingerprint matches across Amazon, Flipkart, Croma
```

---

## 13. Deployment

### Frontend — Vercel

```bash
# Deploy with zero config
vercel --prod

# Environment variables:
NEXT_PUBLIC_API_URL=https://api.antigravity.app
NEXT_PUBLIC_APP_ENV=production
```

### Backend — Render

```yaml
# render.yaml
services:
  - type: web
    name: antigravity-api
    env: node
    buildCommand: npm install
    startCommand: node src/app.js
    envVars:
      - key: DATABASE_URL
        fromDatabase: { name: antigravity-db, property: connectionString }
      - key: REDIS_URL
        value: <upstash-redis-url>
      - key: ML_SERVICE_URL
        value: https://antigravity-ml.onrender.com
      - key: JWT_SECRET
        generateValue: true
```

### ML Service — Render (Python)

```bash
# Dockerfile for ML service
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Database — PlanetScale (MySQL)

- Branch-based schema management (like git for databases)
- Serverless connection pooling built in
- Free tier supports 1B row reads/month — more than sufficient for MVP

---

## 14. Security

| Concern | Implementation |
|---|---|
| Authentication | JWT (HS256), 7-day expiry, refresh token in httpOnly cookie |
| API Rate Limiting | 100 req/min per IP (express-rate-limit) |
| SQL Injection | Parameterized queries via mysql2 (never string concat) |
| XSS | React escapes by default; CSP headers via Next.js |
| Secrets | Environment variables only — never committed to git |
| HTTPS | Enforced on Vercel + Render (automatic TLS) |
| CORS | Whitelist: `antigravity.app` + `localhost:3000` only |

---

## 15. Scalability Path

| Scale | Architecture |
|---|---|
| MVP (0–10K users) | Single Node.js instance + PlanetScale + Upstash Redis |
| Growth (10K–100K) | Horizontal scaling on Render, read replicas for MySQL |
| Scale (100K+) | Move to AWS ECS, Aurora MySQL, ElastiCache, SQS for jobs |

---

*Tech version: 1.0 | Last updated: April 2026 | Antigravity Engineering*
