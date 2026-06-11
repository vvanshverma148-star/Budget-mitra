/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Link as LinkIcon, Type, ArrowRight, PlayCircle, TrendingUp, ShieldCheck, Zap, Sparkles, CalendarClock, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AuroraBackground } from "@/components/ui/aurora-background";

const staticProducts = [
  { product_key: "apple-iphone-15-128gb-black", product_name: "Apple iPhone 15 128GB Black", brand: "Apple", category: "mobile" },
  { product_key: "samsung-galaxy-s24-256gb-onyx-black", product_name: "Samsung Galaxy S24 256GB Onyx Black", brand: "Samsung", category: "mobile" },
  { product_key: "oneplus-12-256gb-flowy-emerald", product_name: "OnePlus 12 256GB Flowy Emerald", brand: "OnePlus", category: "mobile" },
  { product_key: "xiaomi-redmi-note-13-pro-256gb", product_name: "Xiaomi Redmi Note 13 Pro+ 256GB", brand: "Xiaomi", category: "mobile" },
  { product_key: "google-pixel-8-128gb-hazel", product_name: "Google Pixel 8 128GB Hazel", brand: "Google", category: "mobile" },
  { product_key: "nothing-phone-2-256gb-dark-grey", product_name: "Nothing Phone (2) 256GB Dark Grey", brand: "Nothing", category: "mobile" },
  { product_key: "apple-airpods-pro-2nd-gen", product_name: "Apple AirPods Pro (2nd Gen)", brand: "Apple", category: "headphones" },
  { product_key: "sony-wh-1000xm5-black", product_name: "Sony WH-1000XM5 Black", brand: "Sony", category: "headphones" },
  { product_key: "jbl-tune-770nc-blue", product_name: "JBL Tune 770NC Blue", brand: "JBL", category: "headphones" },
  { product_key: "boat-airdopes-141-black", product_name: "boAt Airdopes 141 Black", brand: "boAt", category: "headphones" },
  { product_key: "oneplus-buds-3-splendid-blue", product_name: "OnePlus Buds 3 Splendid Blue", brand: "OnePlus", category: "headphones" },
  { product_key: "apple-watch-se-gps-44mm", product_name: "Apple Watch SE GPS 44mm", brand: "Apple", category: "electronics" },
  { product_key: "samsung-galaxy-watch-6-44mm", product_name: "Samsung Galaxy Watch 6 44mm", brand: "Samsung", category: "electronics" },
  { product_key: "jbl-flip-6-portable-speaker", product_name: "JBL Flip 6 Portable Speaker", brand: "JBL", category: "electronics" },
  { product_key: "lenovo-ideapad-slim-5-16gb-512gb", product_name: "Lenovo IdeaPad Slim 5 16GB 512GB", brand: "Lenovo", category: "electronics" },
  { product_key: "hp-victus-gaming-laptop-i5-16gb-512gb", product_name: "HP Victus Gaming Laptop i5 16GB 512GB", brand: "HP", category: "electronics" },
  { product_key: "nike-club-men-hoodie-black", product_name: "Nike Club Men Hoodie Black", brand: "Nike", category: "clothes" },
  { product_key: "adidas-men-running-shoes-duramo-sl", product_name: "Adidas Men Running Shoes Duramo SL", brand: "Adidas", category: "clothes" },
  { product_key: "levi-s-men-511-slim-jeans-blue", product_name: "Levi's Men 511 Slim Jeans Blue", brand: "Levi's", category: "clothes" },
  { product_key: "puma-unisex-essential-logo-tee", product_name: "Puma Unisex Essential Logo Tee", brand: "Puma", category: "clothes" }
];

const upcomingSales = [
  { name: "Summer Sale", platform: "Amazon", month: 4 },
  { name: "End of Reason Sale", platform: "Myntra", month: 5 },
  { name: "Prime Day", platform: "Amazon", month: 6 },
  { name: "Big Saving Days", platform: "Flipkart", month: 7 },
  { name: "Big Billion Days", platform: "Flipkart", month: 8 },
  { name: "Great Indian Festival", platform: "Amazon", month: 9 },
  { name: "Black Friday", platform: "Global", month: 10 },
  { name: "Year End Sale", platform: "Multiple", month: 11 }
];

export default function Home() {
  const router = useRouter();
  const [searchMode, setSearchMode] = useState<'name' | 'url'>('name');
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<typeof staticProducts>([]);
  const [selectedProductKey, setSelectedProductKey] = useState<string | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string | null>(null);
  
  const { user, logout } = useAuth();
  const currentMonth = new Date().getMonth();
  const nextSale = upcomingSales.find(s => s.month >= currentMonth) || upcomingSales[0];
  const monthsAway = nextSale.month >= currentMonth ? nextSale.month - currentMonth : (12 - currentMonth + nextSale.month);
  
  // Deterministic days left so it doesn't jump on re-renders
  const estimatedDays = monthsAway * 30 + 12;

  // Mouse interaction and Time state for animated background & 3D floating
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const updateTime = () => {
      setTime(Date.now() / 1000);
      animationFrameId = requestAnimationFrame(updateTime);
    };
    updateTime();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 100,
        y: (e.clientY / window.innerHeight - 0.5) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const normalizeText = (value?: string) => {
    return String(value || "").toLowerCase().trim();
  };

  const normalizeSlug = (value?: string) => {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const extractSearchTextFromUrl = (url?: string) => {
    if (!url) return "";
    try {
      const u = new URL(url);
      const pathSegments = u.pathname.split('/').filter(Boolean);
      const relevant = pathSegments.filter(s => s.length > 3 && s !== 'product' && s !== 'dp' && s !== 'item');
      return relevant.join(' ').replace(/-/g, ' ');
    } catch (e) {
      return url.replace(/https?:\/\//g, '').replace(/www\./g, '').replace(/-/g, ' ').replace(/\//g, ' ');
    }
  };

  const findProductByInput = (input?: string, products: any[] = []) => {
    if (!input || !products || products.length === 0) return null;
    let searchText = normalizeText(input);

    if (searchText.startsWith('http') || searchText.includes('amazon') || searchText.includes('flipkart') || searchText.includes('myntra') || searchText.includes('croma')) {
      searchText = normalizeText(extractSearchTextFromUrl(input));
    }

    const searchSlug = normalizeSlug(searchText);

    let match = products.find(p => p?.product_key && p.product_key === searchSlug);
    if (match) return match;

    match = products.find(p => p?.product_name && normalizeText(p.product_name) === searchText);
    if (match) return match;

    match = products.find(p => {
      if (!p) return false;
      const pSlug = p.product_key ? normalizeSlug(p.product_key) : "";
      const pName = p.product_name ? normalizeText(p.product_name) : "";
      if (pSlug && searchSlug && (pSlug.includes(searchSlug) || searchSlug.includes(pSlug))) return true;
      if (pName && searchText && (pName.includes(searchText) || searchText.includes(pName))) return true;
      return false;
    });

    return match || null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setSelectedProductKey(null);
    setSelectedProductName(null);

    try {
      if (!val || val.trim() === '') {
        setSuggestions([]);
        return;
      }

      const searchSlug = normalizeSlug(val);
      const searchText = normalizeText(val);

      if (staticProducts && staticProducts.length > 0) {
        const filtered = staticProducts.filter(p => {
          if (!p) return false;
          const pName = p.product_name ? normalizeText(p.product_name) : "";
          const pId = p.product_key ? normalizeSlug(p.product_key) : "";
          return pName.includes(searchText) || pId.includes(searchSlug);
        });

        const uniqueSuggestions: typeof staticProducts = [];
        const seenKeys = new Set();
        for (const p of filtered) {
          if (!seenKeys.has(p.product_key)) {
            seenKeys.add(p.product_key);
            uniqueSuggestions.push(p);
          }
        }

        setSuggestions(uniqueSuggestions.slice(0, 5));
      }
    } catch (e) {
      setSuggestions([]);
    }
  };

  const handleSelectProduct = (product: { product_key: string, product_name: string }) => {
    setInputValue(product.product_name);
    setSelectedProductKey(product.product_key);
    setSelectedProductName(product.product_name);
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    setIsLoading(true);
    setError("");

    try {
      let match = null;
      if (selectedProductKey) {
        match = staticProducts.find(p => p?.product_key === selectedProductKey);
      }

      if (!match) {
        match = findProductByInput(trimmedInput, staticProducts);
      }

      if (match && match.product_key) {
        router.push(`/product/${match.product_key}`);
      } else {
        if (staticProducts && staticProducts.length > 0 && staticProducts[0].product_key) {
          router.push(`/product/${staticProducts[0].product_key}`);
        } else {
          setError("No products available in dataset.");
          setIsLoading(false);
        }
      }
    } catch (err: any) {
      setError("Failed to extract product safely.");
      setIsLoading(false);
    }
  };

  return (
    <AuroraBackground className="min-h-[100vh] w-full text-white overflow-hidden relative selection:bg-cyan-500/30" showRadialGradient={true}>
      
      {/* Animated Interactive Background Glows */}
      <div 
        className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] bg-cyan-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"
        style={{ transform: `translate(${-mousePos.x * 4}px, ${-mousePos.y * 4}px) scale(${1 + Math.sin(time) * 0.1})`, transition: 'transform 0.1s ease-out' }}
      ></div>
      <div 
        className="absolute bottom-[10%] right-[10%] w-[60vw] h-[60vw] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"
        style={{ transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 4}px) scale(${1 + Math.cos(time) * 0.1})`, transition: 'transform 0.1s ease-out' }}
      ></div>
      
      {/* Floating 3D Gravity Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-80">
        {[...Array(25)].map((_, i) => {
          const size = ((i % 6) * 15 + 25); // Bubbles ranging from 25px to 100px
          const speedX = ((i % 5) + 1) * 0.4;
          const speedY = ((i % 4) + 1) * 0.4;
          return (
            <div 
              key={i}
              className="absolute rounded-full backdrop-blur-sm border border-cyan-400/30"
              style={{
                width: size + 'px',
                height: size + 'px',
                left: (i * 4) + '%',
                top: ((i * 11) % 100) + '%',
                background: 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.4), rgba(15,23,42,0.1))',
                boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.5), inset 5px 5px 15px rgba(255,255,255,0.1)',
                transform: `translate(${mousePos.x * speedX}px, ${mousePos.y * speedY}px) translateY(${Math.sin(time * speedY + i) * 60}px) scale(${1 + Math.sin(time + i) * 0.1})`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#050914]/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/images/budget-mitra-logo-new.png" alt="Budget Mitra Logo" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-screen" />
            </div>
            <span className="text-2xl font-black tracking-tight">Budget Mitra</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="/compare" className="hover:text-cyan-400 transition-colors font-bold text-white flex items-center gap-1"><LinkIcon className="w-4 h-4"/> Compare</a>
            <a href="/alerts" className="hover:text-cyan-400 transition-colors">Price Alerts</a>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                      <User className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="font-bold text-white">{user.name}</span>
                  </div>
                  <button 
                    onClick={logout} 
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition-all"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={() => router.push('/login')} className="hover:text-cyan-400 transition-colors font-semibold">
                    Sign In
                  </button>
                  <button onClick={() => router.push('/signup')} className="px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] text-[#050914] font-bold">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20 lg:pt-48 lg:pb-32 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Typography */}
        <div className="flex-1 w-full text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 text-sm font-semibold mb-8 animate-pulse">
            <Zap className="w-4 h-4" /> AI-Powered Price Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Compare prices.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-[pulse_3s_ease-in-out_infinite]">Track trends.</span><br />
            Buy smarter.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Stop guessing when to buy. BudgetMitra tracks millions of products across Amazon, Flipkart, Myntra, and Croma to predict the perfect time to purchase.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-8 text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" /> <span className="font-medium">98% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" /> <span className="font-medium">Live Market Data</span>
            </div>
          </div>
        </div>

        {/* Right Search Component & Sales Bubble */}
        <div className="flex-1 w-full max-w-lg relative perspective-[1200px] transform-style-3d">
          
          {/* Floating 3D Sales Bubble */}
          <div 
            className="absolute -top-16 -right-16 z-30 cursor-pointer"
            style={{ 
              transform: `translateY(${Math.sin(time * 2) * 15}px) rotateX(${mousePos.y * 0.15 + 10}deg) rotateY(${mousePos.x * -0.15 - 15}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="relative shadow-[0_30px_60px_rgba(34,211,238,0.4)] bg-gradient-to-br from-slate-900 to-[#0a0f1d] border-2 border-cyan-500/50 backdrop-blur-xl rounded-2xl p-5 w-72 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-150%] hover:before:animate-[shimmer_1.5s_infinite]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/30 blur-[50px] rounded-full pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[150%] animate-[shimmer_2s_infinite]"></div>
              
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">Live Soon</span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-bold border border-cyan-500/30">
                  {nextSale.platform}
                </div>
              </div>
              
              <h3 className="text-lg font-black text-white mb-1 leading-tight">{nextSale.name}</h3>
              
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-3">
                <CalendarClock className="w-3.5 h-3.5" />
                Coming up in ~<span className="text-white font-bold">{estimatedDays} Days</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl relative z-20">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold text-white mb-2">Product Analyzer</h2>
            <p className="text-sm text-slate-400 mb-8">Paste a product URL or search by name.</p>

            <div className="flex gap-2 p-1 bg-slate-800/50 rounded-xl mb-6">
              <button 
                onClick={() => { setSearchMode('name'); setInputValue(""); setSuggestions([]); }}
                className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${searchMode === 'name' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
              >
                <Type className="w-4 h-4" /> Name
              </button>
              <button 
                onClick={() => { setSearchMode('url'); setInputValue(""); setSuggestions([]); }}
                className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${searchMode === 'url' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
              >
                <LinkIcon className="w-4 h-4" /> Paste URL
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group z-20">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input 
                  type={searchMode === 'url' ? "url" : "text"}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  placeholder={searchMode === 'name' ? "e.g., iPhone 15, Sony WH-1000XM5" : "https://amazon.in/..."}
                  value={inputValue}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                />

                {/* Dropdown Suggestions */}
                {searchMode === 'name' && suggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden py-2">
                    {suggestions.map((prod) => (
                      <div 
                        key={prod.product_key}
                        onMouseDown={(e) => { e.preventDefault(); handleSelectProduct(prod); }}
                        className="px-4 py-3 hover:bg-slate-700/80 cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-200 truncate">{prod.product_name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && <div className="text-sm font-medium text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">{error}</div>}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Analyze Now <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Trending Deals 3D Carousel */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Trending Drops Today</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-[1000px]">
          {/* Card 1 */}
          <div 
            onClick={() => {
              setSelectedProductKey('apple-iphone-15-128gb-black');
              setSelectedProductName('Apple iPhone 15 128GB Black');
              setTimeout(() => {
                const e = new Event('submit', { cancelable: true }) as any;
                handleSubmit(e);
              }, 100);
            }}
            className="group relative h-64 bg-gradient-to-br from-slate-900 to-[#050914] border border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-cyan-500/50 transition-all duration-300 transform hover:rotate-y-[-5deg] hover:rotate-x-[5deg] hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(34,211,238,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="flex justify-between items-start mb-12">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">15% DROP</span>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                <ArrowRight className="w-4 h-4 text-white group-hover:-rotate-45 transition-transform" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Apple iPhone 15</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">₹65,999</span>
              <span className="text-sm font-medium text-slate-500 line-through">₹79,900</span>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => {
              setSelectedProductKey('sony-wh-1000xm5-black');
              setSelectedProductName('Sony WH-1000XM5 Black');
              setTimeout(() => {
                const e = new Event('submit', { cancelable: true }) as any;
                handleSubmit(e);
              }, 100);
            }}
            className="group relative h-64 bg-gradient-to-br from-slate-900 to-[#050914] border border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full group-hover:bg-purple-500/20 transition-all"></div>
            <div className="flex justify-between items-start mb-12">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/30">22% DROP</span>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                <ArrowRight className="w-4 h-4 text-white group-hover:-rotate-45 transition-transform" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sony WH-1000XM5</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">₹24,990</span>
              <span className="text-sm font-medium text-slate-500 line-through">₹31,990</span>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => {
              setSelectedProductKey('samsung-galaxy-s24-256gb-onyx-black');
              setSelectedProductName('Samsung Galaxy S24 256GB Onyx Black');
              setTimeout(() => {
                const e = new Event('submit', { cancelable: true }) as any;
                handleSubmit(e);
              }, 100);
            }}
            className="group relative h-64 bg-gradient-to-br from-slate-900 to-[#050914] border border-slate-800 rounded-3xl p-6 cursor-pointer hover:border-blue-500/50 transition-all duration-300 transform hover:rotate-y-[5deg] hover:rotate-x-[5deg] hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-all"></div>
            <div className="flex justify-between items-start mb-12">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-lg border border-amber-500/30">LOW STOCK</span>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <ArrowRight className="w-4 h-4 text-white group-hover:-rotate-45 transition-transform" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Samsung Galaxy S24</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">₹74,999</span>
              <span className="text-sm font-medium text-slate-500 line-through">₹79,999</span>
            </div>
          </div>
        </div>
      </section>

    </AuroraBackground>
  );
}
