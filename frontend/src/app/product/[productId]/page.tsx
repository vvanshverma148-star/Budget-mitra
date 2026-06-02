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
      <div className="min-h-screen bg-[#050914] flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-medium">Analyzing market data...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#050914] flex flex-col items-center justify-center text-white">
        <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
        <p className="text-slate-400 mb-6">{error || "Could not retrieve product data."}</p>
        <button onClick={() => router.push('/')} className="px-6 py-3 bg-cyan-600 rounded-xl font-bold">Go Back</button>
      </div>
    );
  }

  // Derived Logic
  const getRiskColor = (score: number) => {
    if (score <= 30) return "text-emerald-400";
    if (score <= 70) return "text-amber-400";
    return "text-rose-400";
  };
  const riskScore = Math.floor(Math.random() * 40) + 20; // Mock risk calculation

  return (
    <div className="min-h-screen bg-[#050914] text-white overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Background Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-[#050914]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Search
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <TrendingUp className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tight">Budget<span className="text-cyan-400">Mitra</span></span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 items-start">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl overflow-hidden relative group">
            {product.image ? (
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/300/0D1117/22d3ee?text=${encodeURIComponent(product.name)}`;
                    }}
                />
            ) : (
                <ShoppingBag className="w-16 h-16 text-slate-700" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-bold uppercase tracking-wider">{product.brand}</span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold uppercase tracking-wider">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-lg">{product.rating}</span>
                <span className="text-slate-400 text-sm">({product.reviews?.toLocaleString()} reviews)</span>
              </div>
              {user ? (
                <button onClick={() => router.push('/alerts')} className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl font-semibold transition-colors">
                  <Bell className="w-5 h-5" /> Set Price Alert
                </button>
              ) : (
                <button onClick={() => router.push('/login')} className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700 rounded-xl font-semibold transition-colors">
                  <Lock className="w-5 h-5" /> Login for Alerts
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (5/12) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* AI Prediction Card */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${recommendation?.recommendation === 'BUY' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <div className="flex items-center gap-2 text-slate-400 font-semibold mb-6">
                <Brain className="w-5 h-5 text-cyan-400" /> AI Purchase Engine
              </div>
              
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="text-sm font-medium text-slate-400 mb-1">Recommendation</div>
                  <div className={`text-4xl font-black ${recommendation?.recommendation === 'BUY' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {recommendation?.recommendation || "ANALYZING"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-400 mb-1">Confidence</div>
                  <div className="text-3xl font-bold text-white">{recommendation?.confidence ? Math.round(recommendation.confidence * 100) : 0}%</div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800 mb-4">
                <p className="text-slate-300 text-sm leading-relaxed">{recommendation?.explanation || recommendation?.reason}</p>
              </div>
              
              {recommendation?.recommendation !== 'BUY' && (
                <div className="flex gap-4">
                  <div className="flex-1 bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                    <div className="text-xs font-medium text-slate-500 mb-1">Expected Drop</div>
                    <div className="text-lg font-bold text-emerald-400">
                      ₹{historyStats?.current > historyStats?.lowest ? (historyStats.current - historyStats.lowest).toLocaleString() : Math.round((historyStats?.current || 0) * 0.15).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                    <div className="text-xs font-medium text-slate-500 mb-1">Est. Wait Time</div>
                    <div className="text-lg font-bold text-amber-400">{recommendation?.expectedDropWindow || 'N/A'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Live Deals Table */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <Zap className="w-5 h-5 text-yellow-400" /> Live Market Deals
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">LIVE</span>
              </div>
              
              <div className="relative">
                {!user && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md rounded-xl border border-white/5">
                    <Lock className="w-8 h-8 text-cyan-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-1">Members Only Edge</h3>
                    <p className="text-sm text-slate-300 mb-4 px-6 text-center">Sign in to unlock Live Market Deals & automated Price Drops.</p>
                    <button onClick={() => router.push('/signup')} className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-[#050914] font-bold rounded-full transition-all">
                      Create Account
                    </button>
                  </div>
                )}
                
                <div className={`space-y-3 ${!user ? 'opacity-40 blur-sm pointer-events-none' : ''}`}>
                {platforms.map((p, i) => {
                  const inStock = p.inStock ?? true;
                  return (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${i === 0 ? 'bg-cyan-950/30 border-cyan-500/30' : 'bg-slate-950/50 border-slate-800'}`}>
                    <div>
                      <div className="font-bold text-white mb-0.5">{p.platform}</div>
                      <div className="flex items-center gap-3">
                        <div className={`text-xs font-medium ${inStock ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {inStock ? "In Stock" : "Out of Stock"}
                        </div>
                        {p.rating && (
                          <div className="flex items-center text-xs font-bold text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400 mr-1" /> {p.rating}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white mb-1">₹{p.price.toLocaleString()}</div>
                      <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300">
                        View Deal <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )})}
                </div>
              </div>
            </div>

            {/* True Cost Calculator */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] shadow-xl">
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-6">
                <Calculator className="w-5 h-5 text-blue-400" /> True Cost Calculator
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(["UPI", "Credit Card", "Debit Card"] as const).map(method => (
                  <button 
                    key={method}
                    onClick={() => handlePaymentMethodChange(method)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${paymentMethod === method ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-slate-950/50 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'}`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
                {paymentOptionsData[paymentMethod].map((gateway) => (
                  <button
                    key={gateway.name}
                    onClick={() => setSelectedGateway(gateway)}
                    className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-full border transition-all ${selectedGateway.name === gateway.name ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-300'}`}
                  >
                    {gateway.name} <span className="opacity-70 ml-1">(-₹{gateway.discount})</span>
                  </button>
                ))}
              </div>

              <div className="space-y-3 mb-6 border-b border-slate-800 pb-6">
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Base Price (Lowest)</span>
                  <span className="font-medium">₹{platforms[0]?.price?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Estimated Taxes (GST)</span>
                  <span className="font-medium">Included</span>
                </div>
                <div className="flex justify-between text-sm text-emerald-400">
                  <span>{selectedGateway.name} Discount</span>
                  <span className="font-bold">-₹{selectedGateway.discount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-slate-400 font-medium">Final Payable</span>
                <span className="text-3xl font-black text-white">
                  ₹{((platforms[0]?.price || 0) - selectedGateway.discount).toLocaleString()}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column (7/12) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Price History Chart */}
            <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <Activity className="w-5 h-5 text-purple-400" /> Price History (12 Months)
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                  <div className="text-xs font-medium text-slate-500 mb-1">Current</div>
                  <div className="text-lg font-bold text-white">₹{historyStats?.current?.toLocaleString() || 0}</div>
                </div>
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                  <div className="text-xs font-medium text-slate-500 mb-1">Lowest</div>
                  <div className="text-lg font-bold text-emerald-400">₹{historyStats?.lowest?.toLocaleString() || 0}</div>
                </div>
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                  <div className="text-xs font-medium text-slate-500 mb-1">Highest</div>
                  <div className="text-lg font-bold text-rose-400">₹{historyStats?.highest?.toLocaleString() || 0}</div>
                </div>
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                  <div className="text-xs font-medium text-slate-500 mb-1">Average</div>
                  <div className="text-lg font-bold text-blue-400">₹{historyStats?.average?.toLocaleString() || 0}</div>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/1000}k`} dx={-10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                      itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                      formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Price']}
                    />
                    <ReferenceLine x="Oct" stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'top', value: 'Big Billion Days', fill: '#f59e0b', fontSize: 10, fontWeight: 'bold' }} />
                    <ReferenceLine x="May" stroke="#10b981" strokeDasharray="3 3" label={{ position: 'top', value: 'Summer Sale', fill: '#10b981', fontSize: 10, fontWeight: 'bold' }} />
                    <Area type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Risk Analysis Card */}
              <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] shadow-xl">
                <div className="flex items-center gap-2 text-white font-bold text-lg mb-6">
                  <Percent className="w-5 h-5 text-rose-400" /> Volatility Risk
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-slate-400 text-sm">Purchase Risk Score</div>
                  <div className={`text-2xl font-black ${getRiskColor(riskScore)}`}>{riskScore}/100</div>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 mb-6 border border-slate-800">
                  <div className={`h-2 rounded-full ${riskScore <= 30 ? 'bg-emerald-500' : riskScore <= 70 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${riskScore}%` }}></div>
                </div>
                <p className="text-sm text-slate-300">
                  {riskScore <= 30 ? "Low price fluctuation. Safe to buy." : riskScore <= 70 ? "Moderate volatility. Wait for a minor drop." : "High volatility. Avoid buying right now."}
                </p>
              </div>

              {/* AI Reviews Summary */}
              <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] shadow-xl">
                <div className="flex items-center gap-2 text-white font-bold text-lg mb-6">
                  <MessageSquare className="w-5 h-5 text-emerald-400" /> AI Review Sentiment
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <ThumbsUp className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300">
                        {reviewsData[product.product_key]?.[1] || "Users highly praise the overall value and performance."}
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <ThumbsDown className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-slate-300">
                        {reviewsData[product.product_key]?.[2] || "Common complaints include price and long delivery times."}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-800">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Consensus Verdict</div>
                    <div className="text-sm font-medium text-cyan-400">
                        {reviewsData[product.product_key]?.[4] || "A solid buy for most consumers."}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
