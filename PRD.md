# 📄 PRD.md — Product Requirements Document
# Antigravity — AI-Powered Price Intelligence Platform

> *"Don't just compare prices. Understand them."*

---

## 1. Overview

**Product Name:** Antigravity
**Version:** 1.0 (MVP)
**Document Status:** Final Draft
**Target Audience:** Online shoppers across India and global markets

---

## 2. Problem Statement

Every day, millions of online shoppers make one critical mistake — they buy on impulse.

Current price comparison tools show **what** a product costs today. But they can't answer the questions that actually matter:

- Is this the cheapest this product has ever been?
- Was it 30% cheaper last month?
- Will it drop again before Diwali?
- Should I buy now, or wait?

Users shopping online suffer from **price blindness** — they see a number, but have no context for whether it's a good deal. As a result:

- They overpay because they buy at the wrong time
- They miss deals because they weren't tracking
- They feel regret after purchasing, only to see prices fall days later

> **The core problem: Shoppers lack temporal price intelligence.**

---

## 3. Core Product Idea

**Antigravity** is not a price comparator. It is a **Price Intelligence System**.

Where traditional tools answer *"Where is it cheapest right now?"*, Antigravity answers:

| Traditional Tool | Antigravity |
|---|---|
| Current price on Amazon | Price history across all platforms |
| Static comparison table | Trend-based deal scoring |
| No recommendation | "Buy Now" or "Wait X days" |
| Manual monitoring | Automated price drop alerts |

The key innovation is the **Price Intelligence Engine** — a backend system that combines historical price data, trend analysis, and machine learning to give users a confident, data-backed purchase decision.

---

## 4. Goals & Success Metrics

### 4.1 Product Goals

- Help users find the cheapest platform **instantly**
- Help users decide **when** to buy, not just where
- Build trust through transparency (show the data, not just the conclusion)
- Drive repeat usage through alerts and wishlist tracking

### 4.2 KPIs

| Metric | Target (Month 3) |
|---|---|
| Recommendation follow-through rate | > 45% |
| Price alert engagement rate | > 60% |
| Prediction directional accuracy | > 72% |
| Return visit rate (D7) | > 35% |
| Search-to-result time | < 3 seconds |
| User session duration | > 4 minutes |

---

## 5. Target Users

### Primary Persona — The Conscious Buyer
- Age: 22–40
- Shops online 4–8x per month
- Researches before buying
- Frustrated by post-purchase price drops
- Tech-comfortable, but not a developer

### Secondary Persona — The Deal Hunter
- Actively looks for sales, cashback, seasonal discounts
- Uses multiple tabs to compare manually
- High intent to use price alerts
- Values data over aesthetics

---

## 6. User Stories

### Core Flow

> **"As a user, I want to paste a product URL and instantly see whether I'm getting a good deal, so I don't overpay."**

> **"As a user, I want to see how this product's price has changed over the past 3 months, so I can understand if the current price is high or low."**

> **"As a user, I want the system to tell me if I should buy now or wait, and explain why, so I can trust the recommendation."**

> **"As a user, I want to know when the price is likely to drop, so I can plan my purchase accordingly."**

### Alert & Tracking

> **"As a user, I want to set a target price and receive a notification when the product hits that price."**

> **"As a user, I want a dashboard where I can see all products I'm tracking, their current prices, and alert status."**

### Trust & Transparency

> **"As a user, I want to see the data behind the recommendation, not just a Buy/Wait verdict, so I can make my own judgment."**

---

## 7. Detailed User Flow

```
[User Action]                        [System Action]
─────────────────────────────────────────────────────────────────────

1. User visits Antigravity
   └─ Sees clean search bar

2. User pastes product URL          → URL validation
   (Amazon / Flipkart / Myntra etc.)→ Extract product ID + name
                                    → Identify platform & category

3. System begins parallel search    → Fuzzy match product across
                                      all supported platforms
                                    → Retrieve live prices, ratings,
                                      delivery estimates

4. System pulls historical data     → Query price_history table
   (last 90 days per platform)      → Normalize data (handle gaps)

5. ML Pipeline runs                 → Compute 7/30/90-day trend
                                    → Calculate volatility score
                                    → Predict next 14-day movement
                                    → Generate deal score (0–100)

6. Results rendered to user:
   ├─ Comparison Table (live data)
   ├─ Price Trend Chart (interactive)
   ├─ Deal Score Badge
   └─ Buy Now / Wait Recommendation
       └─ If "Wait" → show expected time window

7. User sets price alert (optional) → Stored in alerts table
                                    → Background worker begins
                                      polling price
                                    → Sends notification when
                                      target price is reached
```

---

## 8. Feature Breakdown

### Feature 1 — Cross-Platform Price Comparison

**Priority:** P0 (Must Have)

- Accepts product URLs from: Amazon, Flipkart, Myntra, Meesho, Croma, Reliance Digital (extendable)
- Extracts product name, image, brand, category
- Searches across all platforms via scraping + official APIs where available
- Displays results in a comparison table sorted by price (ascending)
- Fields shown: Platform, Price, Rating (★), Delivery ETA, Seller name
- "Best Deal" badge applied to the cheapest option

---

### Feature 2 — Historical Price Analysis (CORE)

**Priority:** P0 (Must Have)

The heart of Antigravity. Every product tracked over time.

- Price data collected and stored in `price_history` table at regular intervals (every 6–12 hours)
- Charts rendered for:
  - **7-day view** — short-term fluctuation
  - **30-day view** — monthly trends (most popular)
  - **90-day view** — seasonal patterns
- Summary statistics displayed:
  - 🟢 Lowest recorded price (all-time low)
  - 🔴 Highest recorded price
  - ⚪ Average price (30-day)
  - 📊 Volatility index (low / medium / high)
- Data available per-platform and as an aggregate

---

### Feature 3 — AI Price Intelligence Engine (VERY IMPORTANT)

**Priority:** P0 (Must Have)

The differentiator. The brain of Antigravity.

**Input:** 90-day price history per platform
**Processing:**
- Trend direction (rising / falling / stable)
- Moving averages (7-day, 30-day)
- Seasonal adjustment (if category is seasonal)
- Anomaly detection (sudden price spikes/drops)

**Output:**
```
Deal Score: 82/100
Status: GREAT DEAL — Price is 18% below 30-day average

Recommendation: BUY NOW
Reason: Price has been trending upward for 5 days. 
        Current price is near the 90-day low. 
        Historical pattern shows a rise typically follows this dip.
```

OR:

```
Deal Score: 34/100
Status: OVERPRICED — Price is 22% above average

Recommendation: WAIT
Expected Drop Window: 5–8 days
Reason: Similar price spikes in the past resolved within 7 days. 
        Festival season trend suggests a discount likely incoming.
```

---

### Feature 4 — Best Time to Buy Recommendation

**Priority:** P1 (Should Have)**

- Layered on top of ML prediction
- Accounts for: weekend patterns, sale season cycles (Big Billion Days, Great Indian Festival), day-of-week effects
- Output rendered as a **recommendation card** with:
  - Buy / Wait verdict
  - Confidence level (%)
  - Reason (2–3 sentences, plain language)
  - Expected time window if "Wait"

---

### Feature 5 — Price Drop Alert System

**Priority:** P1 (Should Have)**

- User sets a target price for any tracked product
- System stores alert in DB with: user_id, product_id, target_price, status
- Background cron job checks price every 30 minutes
- When `current_price <= target_price`:
  - Email notification sent (SMTP)
  - In-app notification badge triggered
  - Alert status updated to "triggered"
- User can pause, edit, or delete alerts from dashboard

---

### Feature 6 — Wishlist & Alert Dashboard

**Priority:** P2 (Nice to Have)**

- Lists all products user is tracking
- Shows per product: current price, target price, alert status, trend direction (arrow indicator)
- Quick-action buttons: Edit Alert / Remove / View Product
- Summary stats: "You've saved ₹X across Y purchases using Antigravity"

---

## 9. Functional Requirements

| Requirement | Description |
|---|---|
| URL Parsing | Accept product URLs and extract product identity |
| Product Matching | Match the same product across multiple platforms |
| Price Retrieval | Fetch current prices in real-time (<3s) |
| History Storage | Store and retrieve price history per platform |
| Trend Analysis | Compute 7/30/90-day price trends |
| ML Prediction | Generate directional price prediction for next 14 days |
| Deal Scoring | Assign 0–100 score based on current vs historical price |
| Recommendation | Output Buy/Wait + explanation + time window |
| Alert Creation | Allow user to set target price per product |
| Alert Monitoring | Background job to poll and trigger alerts |
| Notifications | Email and in-app notification on alert trigger |
| Dashboard | Show tracked products with status and trends |

---

## 10. Non-Functional Requirements

| Requirement | Specification |
|---|---|
| Performance | Results rendered in < 3 seconds for cached products |
| Scalability | Support 10,000+ concurrent users with horizontal scaling |
| Reliability | 99.5% uptime SLA for core comparison features |
| Data Freshness | Price history updated every 6–12 hours per product |
| Prediction Accuracy | > 70% directional accuracy on 7-day predictions |
| Security | JWT-based auth, rate limiting on all public endpoints |
| Accessibility | WCAG 2.1 AA compliant UI |

---

## 11. Out of Scope (v1.0)

- Native mobile apps (iOS / Android) — post-MVP
- Browser extension — post-MVP
- International markets beyond India — post-MVP
- User reviews / community features — post-MVP
- Price negotiation or coupon aggregation — post-MVP

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Inaccurate product matching across platforms | High | Use category + brand + model number fingerprinting; allow user correction |
| Incomplete historical data for new products | Medium | Fall back to "Insufficient data" state; still show live comparison |
| Scraping blocks / rate limits | High | Use rotating proxies, respect robots.txt, use official APIs where possible |
| ML model underfitting on volatile products | Medium | Flag high-volatility products; reduce confidence score accordingly |
| User distrust of AI recommendation | Medium | Always show the underlying data and reasoning; no black-box verdicts |

---

## 13. Assumptions

- Sufficient public price data is available for major Indian e-commerce platforms
- Users are comfortable with data-driven recommendations
- Products have stable identifiers (ASIN, EAN, model number) across platforms
- Email delivery infrastructure is reliable for alert notifications

---

## 14. Dependencies

| Dependency | Type | Notes |
|---|---|---|
| E-commerce scraping layer | Internal | Core data pipeline |
| ML prediction service (Python/FastAPI) | Internal | Must be available before launch |
| MySQL / PlanetScale database | Infrastructure | Historical data backbone |
| SMTP email service (SendGrid / SES) | External | For alert notifications |
| Redis cache | Infrastructure | For fast repeated lookups |
| Render / Railway (backend hosting) | External | Node.js API deployment |

---

*Document version: 1.0 | Last updated: April 2026 | Team: Antigravity*
