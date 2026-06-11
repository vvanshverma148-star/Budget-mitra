/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, Star, ExternalLink, Activity, Brain, ShieldAlert, 
  ThumbsUp, ThumbsDown, MessageSquare, TrendingUp, Bell, Zap, 
  ShoppingBag, Calculator, Percent, Lock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from "recharts";

// Mapping products to their respective realistic reviews
const reviewsData: Record<string, any> = {
    "apple-iphone-15-128gb-black": ["Highly Positive", "Excellent display | Fast performance | Amazing camera", "Expensive | No charger in box | 60Hz screen", "Heating during heavy gaming", "Users generally love the iPhone 15 for its refined design and great cameras, though the 60Hz display is a sticking point at this price.", "Wait for a major sale event if you want maximum value."],
    "samsung-galaxy-s24-256gb-onyx-black": ["Positive", "Compact design | Great display | Good battery life", "Exynos chip in some regions | Pricey", "Slight camera lag", "The Galaxy S24 remains a strong contender for those wanting a compact, powerful Android device.", "Solid buy right now, but watch out for festival discounts."],
    "oneplus-12-256gb-flowy-emerald": ["Highly Positive", "Stunning design | Blazing fast | Superfast charging", "No IP68 rating | Large size", "Curved screen accidental touches", "Reviewers praise the OnePlus 12 as a true flagship killer offering incredible value and performance.", "Excellent value for money, buy now."],
    "xiaomi-redmi-note-13-pro-256gb": ["Mixed", "Great value | Fast charging | Crisp display", "Bloatware | Average low-light camera", "Software updates are slow", "A very solid mid-ranger that covers all the basics well, despite some heavy UI elements.", "Wait for a discount before purchasing."],
    "google-pixel-8-128gb-hazel": ["Positive", "Amazing camera | Clean UI | Long software support", "Battery life is average | Slow charging", "Fingerprint sensor can be finicky", "The Pixel 8 is loved for its software and cameras, but power users might find the battery lacking.", "Wait for a price drop."],
    "nothing-phone-2-256gb-dark-grey": ["Highly Positive", "Unique glyph interface | Smooth UI | Good battery", "Average cameras | Expensive", "Slightly bulky", "A breath of fresh air in design with super smooth software, though cameras are just average.", "Buy if you value design and software experience."],
    "apple-airpods-pro-2nd-gen": ["Highly Positive", "Incredible ANC | Seamless ecosystem | Great fit", "Very expensive | Lightning port on older stock", "Occasional connection drops on non-Apple devices", "Considered the gold standard for wireless earbuds if you are in the Apple ecosystem.", "A solid buy, especially during seasonal sales."],
    "sony-wh-1000xm5-black": ["Highly Positive", "Industry-leading ANC | Great comfort | Long battery life", "Cannot fold | Expensive", "Gets warm on ears after long use", "The WH-1000XM5 are phenomenal over-ear headphones with top-tier noise cancellation.", "Highly recommended for travelers and audiophiles."],
    "jbl-tune-770nc-blue": ["Positive", "Good bass | Affordable ANC | Comfortable", "Build feels slightly plasticky | Micro-USB on some variants", "ANC is basic", "A great budget choice for bass lovers wanting decent noise cancellation.", "Wait for a sale to get it at a bargain."],
    "boat-airdopes-141-black": ["Mixed", "Very cheap | Bass-heavy | Long battery", "Flimsy case | Call quality is poor", "Disconnection issues", "Decent for the price, but mostly suited for casual listening and workouts.", "Buy now, it's usually always cheap."],
    "oneplus-buds-3-splendid-blue": ["Positive", "Great sound | Dual connection | Good battery", "Touch controls are sensitive | Glossy case scratches easily", "Average ANC", "A strong mid-range earbud offering features usually found in premium models.", "Great value, solid buy."],
    "apple-watch-se-gps-44mm": ["Positive", "Smooth performance | Great fitness tracking | Value", "No always-on display | Battery life is 1 day", "Screen scratches easily", "The best entry point into the Apple Watch ecosystem without breaking the bank.", "Wait for a sale if price is an issue, otherwise a solid buy right now."],
    "samsung-galaxy-watch-6-44mm": ["Positive", "Beautiful display | Great health tracking | Slim bezels", "Battery life | Slow charging", "Some lag on complex watch faces", "A great companion for Android users with a beautiful, vivid screen.", "Wait for bundling offers with phones."],
    "jbl-flip-6-portable-speaker": ["Highly Positive", "Punchy sound | Waterproof | Portable", "No aux input | No built-in mic", "Battery drains fast at max volume", "A rugged, fantastic sounding portable speaker perfect for outdoor use.", "Solid buy right now."],
    "lenovo-ideapad-slim-5-16gb-512gb": ["Positive", "Good performance | Premium look | Good keyboard", "Average battery life | Screen could be brighter", "Fans get loud under load", "A reliable daily driver laptop for students and professionals.", "Wait for back-to-school or festive sales."],
    "hp-victus-gaming-laptop-i5-16gb-512gb": ["Mixed", "Good 1080p gaming | Clean design | Affordable", "Screen wobble | Average color gamut", "Battery life is very poor", "An entry-level gaming laptop that gets the job done, but compromises on screen quality.", "Buy during big electronic sales."],
    "nike-club-men-hoodie-black": ["Positive", "Very comfortable | Classic design | Durable", "Runs slightly small | Fades after many washes", "Lint sticks to it easily", "A classic, cozy staple for casual wear, though you might want to size up.", "Buy now, very popular item."],
    "adidas-men-running-shoes-duramo-sl": ["Mixed", "Lightweight | Good for casual running | Affordable", "Not very durable | Narrow fit", "Sole wears out quickly on hard surfaces", "A decent pair of entry-level running shoes, but not for serious marathon runners.", "Wait for 40-50% off sales, very common."],
    "levi-s-men-511-slim-jeans-blue": ["Highly Positive", "Great fit | Classic style | Durable denim", "Sizing inconsistency between colors | Requires break-in", "Pockets are slightly shallow", "A timeless classic that offers a great slim (but not skinny) fit.", "Wait for seasonal sales to grab multiple pairs."],
    "puma-unisex-essential-logo-tee": ["Mixed", "Soft cotton | Casual fit | Inexpensive", "Neck stretches out | Thin material", "Logo fades over time", "A basic everyday t-shirt that is comfortable but may not last years.", "Buy during clearance sales for maximum value."]
};

const staticProducts = [
  { product_key: "apple-iphone-15-128gb-black", product_name: "Apple iPhone 15 128GB Black", brand: "Apple", category: "mobile", image: "/images/apple-iphone-15-128gb-black.jpg" },
  { product_key: "samsung-galaxy-s24-256gb-onyx-black", product_name: "Samsung Galaxy S24 256GB Onyx Black", brand: "Samsung", category: "mobile", image: "/images/samsung-galaxy-s24-256gb-onyx-black.jpg" },
  { product_key: "oneplus-12-256gb-flowy-emerald", product_name: "OnePlus 12 256GB Flowy Emerald", brand: "OnePlus", category: "mobile", image: "/images/oneplus-12-256gb-flowy-emerald.jpg" },
  { product_key: "xiaomi-redmi-note-13-pro-256gb", product_name: "Xiaomi Redmi Note 13 Pro+ 256GB", brand: "Xiaomi", category: "mobile", image: "/images/xiaomi-redmi-note-13-pro-256gb.jpg" },
  { product_key: "google-pixel-8-128gb-hazel", product_name: "Google Pixel 8 128GB Hazel", brand: "Google", category: "mobile", image: "/images/google-pixel-8-128gb-hazel.jpg" },
  { product_key: "nothing-phone-2-256gb-dark-grey", product_name: "Nothing Phone (2) 256GB Dark Grey", brand: "Nothing", category: "mobile", image: "/images/nothing-phone-2-256gb-dark-grey.jpg" },
  { product_key: "apple-airpods-pro-2nd-gen", product_name: "Apple AirPods Pro (2nd Gen)", brand: "Apple", category: "headphones", image: "/images/apple-airpods-pro-2nd-gen.jpg" },
  { product_key: "sony-wh-1000xm5-black", product_name: "Sony WH-1000XM5 Black", brand: "Sony", category: "headphones", image: "/images/sony-wh-1000xm5-black.jpg" },
  { product_key: "jbl-tune-770nc-blue", product_name: "JBL Tune 770NC Blue", brand: "JBL", category: "headphones", image: "/images/jbl-tune-770nc-blue.jpg" },
  { product_key: "boat-airdopes-141-black", product_name: "boAt Airdopes 141 Black", brand: "boAt", category: "headphones", image: "/images/boat-airdopes-141-black.jpg" },
  { product_key: "oneplus-buds-3-splendid-blue", product_name: "OnePlus Buds 3 Splendid Blue", brand: "OnePlus", category: "headphones", image: "/images/oneplus-buds-3-splendid-blue.jpg" },
  { product_key: "apple-watch-se-gps-44mm", product_name: "Apple Watch SE GPS 44mm", brand: "Apple", category: "electronics", image: "/images/apple-watch-se-gps-44mm.jpg" },
  { product_key: "samsung-galaxy-watch-6-44mm", product_name: "Samsung Galaxy Watch 6 44mm", brand: "Samsung", category: "electronics", image: "/images/samsung-galaxy-watch-6-44mm.jpg" },
  { product_key: "jbl-flip-6-portable-speaker", product_name: "JBL Flip 6 Portable Speaker", brand: "JBL", category: "electronics", image: "/images/jbl-flip-6-portable-speaker.jpg" },
  { product_key: "lenovo-ideapad-slim-5-16gb-512gb", product_name: "Lenovo IdeaPad Slim 5 16GB 512GB", brand: "Lenovo", category: "electronics", image: "/images/lenovo-ideapad-slim-5-16gb-512gb.jpg" },
  { product_key: "hp-victus-gaming-laptop-i5-16gb-512gb", product_name: "HP Victus Gaming Laptop i5 16GB 512GB", brand: "HP", category: "electronics", image: "/images/hp-victus-gaming-laptop-i5-16gb-512gb.jpg" },
  { product_key: "nike-club-men-hoodie-black", product_name: "Nike Club Men Hoodie Black", brand: "Nike", category: "clothes", image: "/images/nike-club-men-hoodie-black.jpg" },
  { product_key: "adidas-men-running-shoes-duramo-sl", product_name: "Adidas Men Running Shoes Duramo SL", brand: "Adidas", category: "clothes", image: "/images/adidas-men-running-shoes-duramo-sl.jpg" },
  { product_key: "levi-s-men-511-slim-jeans-blue", product_name: "Levi's Men 511 Slim Jeans Blue", brand: "Levi's", category: "clothes", image: "/images/levi-s-men-511-slim-jeans-blue.jpg" },
  { product_key: "puma-unisex-essential-logo-tee", product_name: "Puma Unisex Essential Logo Tee", brand: "Puma", category: "clothes", image: "/images/puma-unisex-essential-logo-tee.jpg" }
];

const paymentOptionsData = {
  "UPI": [
    { name: "Google Pay", discount: 300 },
    { name: "PhonePe", discount: 250 },
    { name: "Paytm", discount: 200 }
  ],
  "Credit Card": [
    { name: "Axis Bank", discount: 2000 },
    { name: "ICICI Bank", discount: 1800 },
    { name: "HDFC Bank", discount: 1500 },
    { name: "SBI Card", discount: 1200 }
  ],
  "Debit Card": [
    { name: "ICICI Debit", discount: 600 },
    { name: "HDFC Debit", discount: 500 },
    { name: "SBI Debit", discount: 400 }
  ]
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [platforms, setPlatforms] = useState<any[]>([]);
  const [historyStats, setHistoryStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Credit Card" | "Debit Card">("UPI");
  const [selectedGateway, setSelectedGateway] = useState(paymentOptionsData["UPI"][0]);

  const handlePaymentMethodChange = (method: "UPI" | "Credit Card" | "Debit Card") => {
    setPaymentMethod(method);
    setSelectedGateway(paymentOptionsData[method][0]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const normalizeSlug = (value: any) => {
          return String(value || "")
            .toLowerCase()
            .trim()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
        };

        const slug = decodeURIComponent(productId);

        let matchedRow = staticProducts.find(
          (p) => normalizeSlug(p.product_key) === normalizeSlug(slug)
        );

        if (!matchedRow) {
          matchedRow = staticProducts.find(
            (p) => normalizeSlug(p.product_name) === normalizeSlug(slug)
          );
        }

        if (!matchedRow && staticProducts.length > 0) {
          matchedRow = staticProducts[0];
        }

        let finalProductId = matchedRow ? matchedRow.product_key : "";

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const [prodRes, searchRes, histRes, recRes] = await Promise.all([
          fetch(`${baseUrl}/api/get-product?productId=${finalProductId}`),
          fetch(`${baseUrl}/api/search-products?productId=${finalProductId}`),
          fetch(`${baseUrl}/api/get-history?productId=${finalProductId}`),
          fetch(`${baseUrl}/api/get-recommendation?productId=${finalProductId}`),
        ]);

        if (!prodRes.ok) throw new Error("Product not found");

        const [prodData, searchData, histData, recData] = await Promise.all([
          prodRes.json(),
          searchRes.json(),
          histRes.json(),
          recRes.json(),
        ]);

        // Manually calculate prices since the backend stats might not have all 4 exactly named
        let allPrices: number[] = [];
        if (histData.history) {
            Object.values(histData.history).forEach((platformHistory: any) => {
                platformHistory.forEach((item: any) => allPrices.push(parseFloat(item.price)));
            });
        }
        
        const sortedPlatforms = searchData.sort((a: any, b: any) => a.price - b.price);
        const currentPrice = sortedPlatforms.length > 0 ? sortedPlatforms[0].price : 0;
        const lowestPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
        const highestPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;
        const averagePrice = allPrices.length > 0 ? Math.round(allPrices.reduce((a,b)=>a+b,0)/allPrices.length) : 0;

        setProduct({ ...prodData, ...matchedRow }); // Merge mock data for images
        setPlatforms(sortedPlatforms);
        setHistoryStats({ current: currentPrice, lowest: lowestPrice, highest: highestPrice, average: averagePrice });
        setRecommendation(recData);

        if (histData.history && histData.history["Amazon"]) {
          const formatted = histData.history["Amazon"].map((item: any) => ({
            date: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
            price: item.price
          }));
          setChartData(formatted);
        } else {
          const firstPlatform = Object.keys(histData.history || {})[0];
          if (firstPlatform) {
            const formatted = histData.history[firstPlatform].map((item: any) => ({
              date: new Date(item.date).toLocaleDateString('en-US', { month: 'short' }),
              price: item.price
            }));
            setChartData(formatted);
          }
        }

      } catch (err: any) {
        setError(err.message || "Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    }

    if (productId) {
      fetchData();
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col items-center justify-center selection:bg-secondary/30">
        <div className="w-16 h-16 border-4 border-surface-dim border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-on-surface-variant font-medium text-body-lg">Analyzing market data...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col items-center justify-center selection:bg-secondary/30">
        <span className="material-symbols-outlined text-[64px] text-error mb-4">shield_alert</span>
        <h2 className="text-headline-md font-bold mb-2 text-primary">Analysis Failed</h2>
        <p className="text-on-surface-variant mb-6 text-body-md">{error || "Could not retrieve product data."}</p>
        <button onClick={() => router.push('/')} className="btn-neu px-6 py-3 text-label-md text-primary font-bold">Go Back</button>
      </div>
    );
  }

  // Derived Logic
  const getRiskColor = (score: number) => {
    if (score <= 30) return "#009865"; // emerald-like
    if (score <= 70) return "#f59e0b"; // amber-like
    return "#ba1a1a"; // error
  };
  const riskScore = Math.floor(Math.random() * 40) + 20; // Mock risk calculation

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col antialiased selection:bg-secondary/30">
      
      {/* TopNavBar Shared Component */}
      <nav className="bg-surface shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto px-margin-mobile">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/')} className="text-headline-md font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
              Budget Mitra
            </button>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="/compare">Compare</a>
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="/alerts">Price Alerts</a>
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="#">Deals</a>
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="#">Calculators</a>
          </div>
          <div className="flex items-center gap-4">
            {!user ? (
              <button className="hidden md:block btn-neu px-6 py-2 text-label-md text-primary font-medium" onClick={() => router.push('/login')}>Log In</button>
            ) : (
              <button className="hidden md:block btn-neu px-6 py-2 text-label-md text-primary font-medium" onClick={() => {/* logout */}}>Log Out</button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col gap-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-4">
          <div>
            <p className="text-on-surface-variant text-label-md mb-2 flex items-center gap-2 uppercase tracking-widest">
              <span className="material-symbols-outlined text-[16px]">laptop_mac</span> Electronics / {product.category}
            </p>
            <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold text-primary">{product.name}</h1>
            <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl">Track prices, set alerts, and find the best deals across major retailers.</p>
          </div>
          <div className="flex items-center gap-4 bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-2 rounded-full">
            <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-secondary rounded-full transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-error rounded-full transition-colors">
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </header>

        {/* Top Grid: Product Overview & Alert Widget */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Product Overview */}
          <div className="card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-[32px] p-8 lg:col-span-2 flex flex-col md:flex-row items-center gap-8">
            {/* Image Pedestal */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-surface rounded-[24px] shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] relative overflow-hidden h-64">
              <img 
                src={product.image || "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop"} 
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply relative z-10"
              />
            </div>

            {/* Quick Stats */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <div>
                <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Current Lowest Price</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[40px] font-bold text-primary tracking-tight">₹{historyStats?.current?.toLocaleString()}</h2>
                  <span className="text-tertiary-fixed-dim text-label-md flex items-center bg-tertiary-fixed-dim/10 px-2 py-1 rounded-md" style={{color: '#009865'}}>
                    <span className="material-symbols-outlined text-[16px] mr-1">arrow_downward</span> 5%
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] rounded-2xl p-4 flex flex-col gap-1">
                  <span className="material-symbols-outlined text-secondary mb-1">history</span>
                  <span className="text-label-sm text-on-surface-variant">Highest Price</span>
                  <span className="text-label-md text-on-surface font-bold">₹{historyStats?.highest?.toLocaleString()}</span>
                </div>
                <div className="bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] rounded-2xl p-4 flex flex-col gap-1">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim mb-1" style={{color: '#009865'}}>trending_down</span>
                  <span className="text-label-sm text-on-surface-variant">Lowest Price</span>
                  <span className="text-label-md text-on-surface font-bold">₹{historyStats?.lowest?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Drop Alert Widget */}
          <div className="card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-[32px] p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-surface shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">notifications_active</span>
              </div>
              <h3 className="text-headline-sm font-bold text-primary">Price Alert</h3>
            </div>
            <p className="text-body-md text-on-surface-variant mb-4">Set a target price and we'll notify you when it drops.</p>
            
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-label-sm font-semibold text-on-surface-variant ml-2">Target Price (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">₹</span>
                  <input 
                    type="number"
                    className="w-full bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] border-none rounded-xl pl-8 pr-4 py-3 text-on-surface outline-none focus:ring-0 font-mono"
                    placeholder={(historyStats?.lowest || 0).toString()}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label className="text-label-sm font-semibold text-on-surface-variant ml-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant material-symbols-outlined text-[18px]">mail</span>
                  <input 
                    type="email"
                    className="w-full bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] border-none rounded-xl pl-10 pr-4 py-3 text-on-surface outline-none focus:ring-0 font-body-md"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              {user ? (
                <button type="button" onClick={() => router.push('/alerts')} className="btn-neu w-full py-4 mt-4 bg-primary text-on-primary rounded-xl text-label-md font-bold shadow-[6px_6px_12px_#B8C2D0,-6px_-6px_12px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#000000,inset_-4px_-4px_8px_#333333] transition-all flex items-center justify-center gap-2">
                  Create Alert <span className="material-symbols-outlined text-[18px]">add_alert</span>
                </button>
              ) : (
                <button type="button" onClick={() => router.push('/login')} className="btn-neu w-full py-4 mt-4 bg-surface text-primary rounded-xl text-label-md font-bold shadow-[6px_6px_12px_#B8C2D0,-6px_-6px_12px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] transition-all flex items-center justify-center gap-2">
                  Login for Alerts <span className="material-symbols-outlined text-[18px]">lock</span>
                </button>
              )}
            </form>
          </div>
        </section>

        {/* Middle Section: Retailer Comparison & Recommendation */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Retailer Deals */}
          <div className="lg:col-span-8 card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-[32px] p-8">
            <h3 className="text-headline-sm font-bold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">storefront</span> Retailer Prices
            </h3>
            
            <div className="flex flex-col gap-4">
              {platforms.length > 0 ? platforms.map((plat, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] rounded-2xl gap-4 hover:shadow-[inset_6px_6px_12px_#B8C2D0,inset_-6px_-6px_12px_#FFFFFF] transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface shadow-[4px_4px_8px_#B8C2D0,-4px_-4px_8px_#FFFFFF] flex items-center justify-center text-secondary font-bold text-lg">
                      {plat.platform.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-label-md font-bold text-primary group-hover:text-secondary transition-colors">{plat.platform}</h4>
                      <p className="text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span> In Stock
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="text-headline-sm font-bold text-primary">₹{plat.price.toLocaleString()}</div>
                      <div className="text-label-sm text-tertiary-fixed-dim" style={{color: '#009865'}}>Free Shipping</div>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[4px_4px_8px_#B8C2D0,-4px_-4px_8px_#FFFFFF] hover:shadow-[inset_2px_2px_4px_#000000,inset_-2px_-2px_4px_#333333] transition-all flex-shrink-0">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-on-surface-variant bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] rounded-2xl font-medium">
                  No retailer data available.
                </div>
              )}
            </div>
          </div>

          {/* AI Recommendation Engine */}
          <div className="lg:col-span-4 card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full"></div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-surface shadow-[4px_4px_8px_#B8C2D0,-4px_-4px_8px_#FFFFFF] flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <h3 className="text-headline-sm font-bold text-primary">AI Recommendation</h3>
              </div>

              <div className="bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-6 rounded-2xl mb-6 text-center">
                <div className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Verdict</div>
                <div className="text-[48px] font-black tracking-tight" style={{color: recommendation?.recommendation === "BUY" ? '#009865' : (recommendation?.recommendation === "WAIT" ? '#f59e0b' : '#ba1a1a')}}>
                  {recommendation?.recommendation || "ANALYZING"}
                </div>
                <p className="text-body-md text-on-surface-variant mt-4 font-medium px-4">
                  "{recommendation?.reasoning || "Analyzing market trends and historical data to provide a recommendation."}"
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-label-sm mb-2 font-bold">
                <span className="text-on-surface-variant">Market Volatility Risk</span>
                <span style={{color: getRiskColor(riskScore)}}>{riskScore}%</span>
              </div>
              <div className="h-2 w-full bg-surface input-neu shadow-[inset_2px_2px_4px_#B8C2D0,inset_-2px_-2px_4px_#FFFFFF] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ width: `${riskScore}%`, backgroundColor: getRiskColor(riskScore) }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section: Chart & Reviews */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Price History Chart */}
          <div className="card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-[32px] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-sm font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">monitoring</span> Price History
              </h3>
              <select className="bg-surface input-neu shadow-[inset_2px_2px_4px_#B8C2D0,inset_-2px_-2px_4px_#FFFFFF] border-none rounded-lg text-label-sm font-bold text-on-surface-variant py-2 pl-3 pr-8 appearance-none outline-none">
                <option>6 Months</option>
                <option>1 Year</option>
                <option>All Time</option>
              </select>
            </div>
            
            <div className="h-[300px] w-full pt-4">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00687b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00687b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e2e4" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#75777e" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#75777e" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `₹${value/1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fbf9fb', borderRadius: '12px', border: 'none', boxShadow: '4px 4px 8px #B8C2D0, -4px -4px 8px #FFFFFF', color: '#1b1b1e', fontWeight: 'bold' }}
                      itemStyle={{ color: '#00687b' }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Price']}
                    />
                    <ReferenceLine y={historyStats?.lowest} stroke="#009865" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Historic Low', fill: '#009865', fontSize: 10, fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="price" stroke="#00687b" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-on-surface-variant font-medium">
                  Not enough historical data.
                </div>
              )}
            </div>
          </div>

          {/* User Reviews Analysis */}
          <div className="card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-[32px] p-8 flex flex-col">
            <h3 className="text-headline-sm font-bold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">forum</span> Review Sentiment
            </h3>

            {reviewsData[product.product_key] ? (
              <div className="space-y-6 flex-grow flex flex-col justify-center">
                <div className="flex justify-between items-center p-4 bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] rounded-2xl">
                  <div className="text-label-md font-bold text-on-surface-variant">Overall Consensus</div>
                  <div className="text-label-md font-bold" style={{color: reviewsData[product.product_key][0] === 'Highly Positive' ? '#009865' : (reviewsData[product.product_key][0] === 'Mixed' ? '#f59e0b' : '#00687b')}}>
                    {reviewsData[product.product_key][0]}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-4 rounded-2xl border-l-4" style={{borderColor: '#009865'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[18px]" style={{color: '#009865'}}>thumb_up</span>
                      <span className="text-label-sm font-bold" style={{color: '#009865'}}>Pros</span>
                    </div>
                    <p className="text-body-md text-on-surface">{reviewsData[product.product_key][1]}</p>
                  </div>
                  <div className="bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-4 rounded-2xl border-l-4" style={{borderColor: '#ba1a1a'}}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[18px]" style={{color: '#ba1a1a'}}>thumb_down</span>
                      <span className="text-label-sm font-bold" style={{color: '#ba1a1a'}}>Cons</span>
                    </div>
                    <p className="text-body-md text-on-surface">{reviewsData[product.product_key][2]}</p>
                  </div>
                </div>

                <div className="p-4 border border-surface-dim rounded-2xl">
                  <span className="material-symbols-outlined text-outline mb-2">format_quote</span>
                  <p className="text-body-md text-on-surface italic">
                    "{reviewsData[product.product_key][4]}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-on-surface-variant font-medium bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] rounded-2xl">
                No review analysis available.
              </div>
            )}
          </div>

        </section>

      </main>

    </div>
  );
}
