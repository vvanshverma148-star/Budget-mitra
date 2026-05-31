# 🎨 DESIGN.md — UI/UX Design Document
# Antigravity — AI-Powered Price Intelligence Platform

> *"Clean enough to trust. Smart enough to decide."*

---

## 1. Design Philosophy

Antigravity sits at the intersection of **data intelligence** and **consumer trust**. The design must reflect both.

### Core Principles

**1. Data Without Clutter**
Every pixel earns its place. Charts and numbers are the heroes — never buried, never overwhelming. We show exactly what the user needs to make a decision.

**2. Premium Minimalism**
Inspired by tools like Linear, Vercel Dashboard, and Notion. White space is intentional. Typography carries weight. Color is used sparingly, always with purpose.

**3. Trust Through Transparency**
The AI recommendation is only as good as the data backing it. We always show the "why" — the chart, the trend, the historical context. No black boxes.

**4. Mobile-First, Desktop-Refined**
The primary use case is a user on their phone, mid-shopping. The experience must be fluid on mobile. The desktop view elevates it with side-by-side layouts and richer charts.

**5. Confidence Without Arrogance**
The "Buy Now / Wait" recommendation is bold and visible. But it's always paired with an explanation. Users should feel informed, not instructed.

---

## 2. Color Palette

### Primary Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Background | Off White | `#F9FAFB` | App background |
| Surface | Pure White | `#FFFFFF` | Cards, panels |
| Surface Alt | Soft Gray | `#F3F4F6` | Inputs, dividers |
| Border | Light Gray | `#E5E7EB` | Card borders, table lines |
| Text Primary | Near Black | `#111827` | Headings, key data |
| Text Secondary | Cool Gray | `#6B7280` | Subtext, labels |
| Text Muted | Light Gray | `#9CA3AF` | Placeholders, timestamps |

### Accent Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Brand Primary | Indigo | `#4F46E5` | CTA buttons, active states, links |
| Brand Light | Lavender | `#EEF2FF` | Badge backgrounds, hover states |
| Success | Emerald | `#10B981` | "Buy Now" badge, price drops, savings |
| Success Light | Mint | `#ECFDF5` | Success card backgrounds |
| Warning | Amber | `#F59E0B` | "Wait" badge, medium deals |
| Warning Light | Cream | `#FFFBEB` | Warning card backgrounds |
| Danger | Rose | `#F43F5E` | Price spikes, high alerts |
| Danger Light | Blush | `#FFF1F2` | Danger card backgrounds |

### Chart Colors

| Purpose | Hex |
|---|---|
| Amazon line | `#4F46E5` (Indigo) |
| Flipkart line | `#F59E0B` (Amber) |
| Other platform | `#10B981` (Emerald) |
| Historical average line | `#9CA3AF` (Dashed gray) |
| Current price marker | `#F43F5E` (Rose dot) |

> **Color Rule:** Never use more than 2 accent colors on a single screen. Background always stays light. Dark mode is a v2 feature.

---

## 3. Typography

### Font Stack

| Role | Font | Weight | Size |
|---|---|---|---|
| Display / Hero | **Inter** | 700–800 | 32–48px |
| Headings | **Inter** | 600–700 | 18–28px |
| Body | **Inter** | 400–500 | 14–16px |
| Data / Numbers | **Inter** (Tabular) | 600 | 16–24px |
| Labels / Tags | **Inter** | 500 | 11–13px |
| Code / Technical | **JetBrains Mono** | 400 | 13px |

### Type Scale (Desktop)

```
H1 Display:    48px / 700 / line-height 1.1
H2 Section:    32px / 700 / line-height 1.2
H3 Card:       22px / 600 / line-height 1.3
H4 Label:      16px / 600 / line-height 1.4
Body:          15px / 400 / line-height 1.6
Small:         13px / 400 / line-height 1.5
Micro:         11px / 500 / line-height 1.4 / uppercase tracking
```

> Import from Google Fonts: `Inter` (weights 400, 500, 600, 700, 800)

---

## 4. Spacing & Layout System

```
Base unit: 4px

Spacing scale:
  xs:   4px
  sm:   8px
  md:   16px
  lg:   24px
  xl:   32px
  2xl:  48px
  3xl:  64px

Border radius:
  Inputs:    8px
  Cards:     12px
  Buttons:   8px
  Badges:    99px (pill)
  Modals:    16px

Shadows:
  Card:   0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)
  Modal:  0 20px 60px rgba(0,0,0,0.12)
  Focus:  0 0 0 3px rgba(79,70,229,0.25)
```

---

## 5. Component Library

### Buttons

```
Primary Button:
  Background:   #4F46E5
  Text:         White
  Padding:      12px 24px
  Radius:       8px
  Hover:        #4338CA (darken 5%)
  Active:       scale(0.97)

Secondary Button:
  Background:   White
  Border:       1px solid #E5E7EB
  Text:         #111827
  Hover:        #F9FAFB

Ghost Button:
  Background:   Transparent
  Text:         #4F46E5
  Hover:        #EEF2FF
```

### Badges / Tags

```
"BEST DEAL" badge:    bg #ECFDF5  text #065F46  border #6EE7B7
"BUY NOW" badge:      bg #ECFDF5  text #065F46  — with checkmark icon
"WAIT" badge:         bg #FFFBEB  text #92400E  — with clock icon
"OVERPRICED" badge:   bg #FFF1F2  text #9F1239  — with arrow-up icon
"GREAT DEAL" badge:   bg #EEF2FF  text #3730A3  — with star icon
```

### Cards

```
Default Card:
  Background:   White
  Border:       1px solid #E5E7EB
  Border radius: 12px
  Padding:      24px
  Shadow:       card shadow (above)

Highlighted Card:
  Background:   #EEF2FF
  Border:       1px solid #C7D2FE
  — used for AI recommendation card
```

---

## 6. Screen Designs

---

### Screen 1 — Home Page (Search)

**Goal:** First impression. Inspire trust. Get them to paste a URL.

**Layout:** Centered, vertically split — hero text above, search bar below.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                  ⚡ Antigravity                          │
│                                                         │
│         Stop guessing. Start knowing.                   │
│   AI-powered price intelligence for smarter shopping.   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  🔗  Paste product URL here...          [Search] │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│     Supports: Amazon · Flipkart · Myntra · Meesho       │
│                                                         │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Compare  │  │ Track Trends │  │  AI Prediction   │  │
│  │ Prices   │  │ Over Time    │  │  Buy or Wait?    │  │
│  └──────────┘  └──────────────┘  └──────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Design Notes:**
- Logo: "Antigravity" in Inter 700, with a subtle upward-arrow or levitation icon in Indigo
- Tagline: Inter 400, #6B7280
- Search bar: Large (56px height), pill shape, subtle shadow on focus
- Platform logos shown as grayscale icons below search bar
- Feature triptych: 3 cards with icon + short label, no long copy
- Background: Pure `#F9FAFB`, no gradients, no hero image

---

### Screen 2 — Results Page (Comparison)

**Goal:** Show the user the full picture — platforms, prices, and who wins.

**Layout:** Two-column on desktop (product info left, AI summary right). Single column on mobile.

```
┌─────────────────────────────────────────────────────────┐
│ ← Back   Antigravity                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [Product Image]   Sony WH-1000XM5 Headphones           │
│  400x400px         Sony · Electronics · Headphones      │
│                    ⭐ 4.5  (12,400 reviews)               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🤖 AI SUMMARY                              [card]       │
│  ┌──────────────────────────────────────────────────┐   │
│  │  ✅ Best deal right now: Amazon                   │   │
│  │  ₹24,990 — 18% below 30-day average               │   │
│  │  Deal Score: ████████░░ 82/100 GREAT DEAL         │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  PRICE COMPARISON                [Sorted by price ▲]    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Platform    Price      Rating   Delivery        │   │
│  │  ──────────────────────────────────────────────  │   │
│  │  🟢 Amazon   ₹24,990   ⭐ 4.5   Free, 1 day      │   │
│  │  ⚪ Flipkart ₹26,499   ⭐ 4.3   Free, 2 days     │   │
│  │  ⚪ Croma    ₹27,990   ⭐ 4.1   ₹99, 3 days      │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Design Notes:**
- Product image: Rounded corners (12px), 1px gray border
- Best row in table: highlighted with left Indigo accent border + subtle green background
- Deal Score: horizontal progress bar in Emerald, labeled with score and tier text
- Delivery ETA: gray tag pill, bold when fastest

---

### Screen 3 — Price Trend Section

**Goal:** Show historical price movement in a clean, readable chart.

**Layout:** Full-width card with chart + toggle + summary stats below.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  PRICE HISTORY                                          │
│                  [7 Days]  [30 Days]  [90 Days]         │
│                                                         │
│  ₹28k ┤                                                 │
│  ₹26k ┤         ╭─╮                                     │
│  ₹25k ┤  ──────╯  ╰────────────── ← current            │
│  ₹24k ┤╭─╯                                              │
│  ₹22k ┤                                                 │
│       └───────────────────────────────────────────      │
│       Jan 1   Jan 15   Feb 1   Feb 15   Mar 1           │
│                                                         │
│  ┌────────────┐  ┌──────────────┐  ┌────────────────┐   │
│  │ All-time   │  │  30-day Avg  │  │  Volatility    │   │
│  │ Low ₹23,490│  │  ₹27,200     │  │  Medium 📊     │   │
│  └────────────┘  └──────────────┘  └────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Design Notes:**
- Chart library: Recharts (React) or Chart.js
- Line: 2.5px stroke, Indigo `#4F46E5`
- Current price marker: Rose `#F43F5E` filled dot with tooltip on hover
- 30-day average: Dashed gray line `#9CA3AF`
- Chart background: White with subtle horizontal grid lines only
- Toggle: Pill-shaped tab switcher (not dropdown)
- Stats below: 3 mini cards in a row, each with label above, value in bold below

---

### Screen 4 — AI Recommendation Section

**Goal:** Give the user a clear, confident, explainable verdict.

**Layout:** Full-width recommendation card, visually distinct from the rest.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  🤖 AI RECOMMENDATION                                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │                                                  │   │
│  │         ✅ BUY NOW                               │   │
│  │                                                  │   │
│  │   Confidence: 84%                                │   │
│  │                                                  │   │
│  │   Why? The current price on Amazon (₹24,990)     │   │
│  │   is 18% below the 30-day average (₹30,476).     │   │
│  │   Historical data shows prices in this range     │   │
│  │   typically rise within 4–6 days. This is near   │   │
│  │   the 90-day low. Buying now is the smart move.  │   │
│  │                                                  │   │
│  │   [🛒 Go to Amazon]   [🔔 Set Alert Instead]     │   │
│  │                                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Alternate State — "Wait" Recommendation:**

```
│  ┌──────────────────────────────────────────────────┐   │
│  │                                                  │   │
│  │         ⏳ WAIT                                   │   │
│  │                                                  │   │
│  │   Expected price drop in: 5–8 days               │   │
│  │   Confidence: 71%                                │   │
│  │                                                  │   │
│  │   Why? Current price is 22% above 30-day         │   │
│  │   average. Similar spikes in the past resolved   │   │
│  │   within 7 days. Festival sale pattern detected. │   │
│  │                                                  │   │
│  │   [🔔 Alert me when price drops]                 │   │
│  │                                                  │   │
│  └──────────────────────────────────────────────────┘   │
```

**Design Notes:**
- "Buy Now" card: Background `#ECFDF5`, border `#6EE7B7`, icon Emerald
- "Wait" card: Background `#FFFBEB`, border `#FDE68A`, icon Amber
- Verdict text: Inter 700, 28px
- Explanation: Inter 400, 15px, `#374151`
- Confidence shown as text + subtle progress arc (not pie chart)
- Two CTA buttons always present — primary action + fallback

---

### Screen 5 — Price Alert UI

**Goal:** Let users set a target price with minimal friction.

**Layout:** Inline panel that expands below the recommendation card.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  🔔 SET PRICE ALERT                                     │
│                                                         │
│  Current Price:  ₹24,990                                │
│  Your Target:   [₹  ___________  ]                      │
│                                                         │
│  Notify via:  [✅ Email]  [⬜ In-App]  [⬜ SMS]          │
│                                                         │
│  [Set Alert →]                                          │
│                                                         │
│  ✅ Alert set! We'll notify you when the price          │
│     drops below ₹22,000 on Amazon.                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Design Notes:**
- Input: Large, clear, left-aligned ₹ prefix inside field
- Toggle buttons: Pill-style, multi-select (not radio)
- CTA: Full-width on mobile, right-aligned on desktop
- Confirmation: Inline success message in mint green, replaces button
- Micro-animation: check icon draws in on confirmation

---

### Screen 6 — Wishlist & Alert Dashboard

**Goal:** Show the user all products they're tracking in one glance.

**Layout:** List view with card per product. Status-driven visual hierarchy.

```
┌─────────────────────────────────────────────────────────┐
│  My Tracked Products                    [+ Add Product] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [img]  Sony WH-1000XM5         ↓ Falling         │   │
│  │        Current: ₹24,990                          │   │
│  │        Target:  ₹22,000    ●●●●░ 80% there       │   │
│  │        Status: 🟡 Watching                        │   │
│  │                            [Edit] [Remove]       │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [img]  Apple AirPods Pro 2     ↑ Rising          │   │
│  │        Current: ₹18,990                          │   │
│  │        Target:  ₹16,000    ●●░░░ 40% there       │   │
│  │        Status: 🟢 Alert Sent!                    │   │
│  │                            [Edit] [Remove]       │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Design Notes:**
- Trend arrow: Emerald for falling (good), Rose for rising (bad)
- Progress bar: Indigo, shows % closeness to target
- Status pill: Amber "Watching", Emerald "Alert Sent!", Gray "Paused"
- Thumbnail: 64x64px, rounded, gray fallback
- Empty state: Illustrated graphic + "No products tracked yet" + search CTA

---

## 7. UX Flow (Step-by-Step Journey)

```
STEP 1 — ARRIVAL
User arrives on Antigravity home page.
Sees hero text and large search input.
Platform logos build instant recognition.
→ Action: Pastes a product URL

STEP 2 — LOADING STATE
Animated progress indicator with 3 stages:
  "Finding product..." → "Comparing prices..." → "Running AI analysis..."
Progress is smooth — never feels stuck.
Total: ~2–3 seconds for cached products.

STEP 3 — RESULTS DELIVERED
AI Summary card appears at the top.
User sees the deal score and winning platform immediately.
Full comparison table below — sorted by price.

STEP 4 — EXPLORE THE DATA
User scrolls to Price Trend section.
Toggles between 7D / 30D / 90D views.
Hover on chart shows exact price on any past date.
Three stat cards (Low / Average / Volatility) give instant context.

STEP 5 — THE DECISION
AI Recommendation card is prominent, visually distinct.
"Buy Now" or "Wait" verdict with reasoning.
Two CTAs: Go to platform OR Set Alert.
User feels informed, not just instructed.

STEP 6 — SET ALERT (OPTIONAL)
User chooses to wait.
Alert panel expands smoothly below.
Sets target price, picks notification channel.
Confirmation appears — no page reload.
Product saved to dashboard automatically.

STEP 7 — RETURN & MONITOR
Email notification arrives when price drops.
User visits dashboard to see all tracked items.
Clicks into a product — sees full history + fresh recommendation.
Completes purchase at the right time.
```

---

## 8. Micro-Interactions & Animation

| Trigger | Animation | Duration |
|---|---|---|
| Search focus | Border glows Indigo, subtle lift shadow | 150ms ease |
| Results load | Cards fade in, staggered 80ms delay each | 300ms ease-out |
| Chart tab switch | Line redraws with ease-in animation | 400ms |
| Alert set | Checkmark draws in, card turns mint green | 300ms |
| Hover on price row | Row background shifts to `#F9FAFB`, slight x-translate | 120ms |
| Deal score bar | Fills on load (left to right) | 600ms ease-out |
| Recommendation card | Slides up 12px on appear | 250ms ease |

> **Animation Rule:** Never animate more than 2 elements simultaneously. Motion is purposeful, never decorative.

---

## 9. Responsive Behavior

| Breakpoint | Layout |
|---|---|
| Mobile (< 640px) | Single column, full-width cards, tab navigation for chart |
| Tablet (640–1024px) | 2-column on results, side-by-side stat cards |
| Desktop (> 1024px) | Full layout with sidebar, wider chart, split recommendation card |

---

## 10. Iconography

- Icon set: **Lucide Icons** (consistent weight, minimal style)
- Key icons used: `search`, `arrow-up`, `arrow-down`, `bell`, `clock`, `check-circle`, `trending-up`, `trending-down`, `shopping-cart`, `star`, `zap`
- Icons always paired with text labels (never icon-only except in tight mobile contexts)
- Size: 16px inline, 20px standalone, 24px hero

---

*Design version: 1.0 | Last updated: April 2026 | Antigravity Design System*
