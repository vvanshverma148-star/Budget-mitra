/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, BellRing, Target, Activity, CheckCircle, Smartphone, Tag, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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

export default function AlertsPage() {
  const router = useRouter();
  const [targetPrice, setTargetPrice] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(staticProducts[0].product_key);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [activeAlerts, setActiveAlerts] = useState([
    { id: 1, name: "Apple iPhone 15 128GB Black", target: 65000, current: 69999, status: "Active" },
    { id: 2, name: "Sony WH-1000XM5 Black", target: 22000, current: 24990, status: "Active" }
  ]);
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050914] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 mb-6">
            <Lock className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Members Only Area</h1>
          <p className="text-slate-400 mb-8">Sign in to your BudgetMitra account to create and manage automated price alerts.</p>
          <div className="flex gap-4">
            <button onClick={() => router.push('/')} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">
              Go Back
            </button>
            <button onClick={() => router.push('/login')} className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#050914] font-bold rounded-xl transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${baseUrl}/api/set-alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct,
          targetPrice: parseInt(targetPrice),
          email: email
        })
      });

      if (!res.ok) throw new Error("Failed to set alert");

      const match = staticProducts.find(p => p.product_key === selectedProduct);
      
      setActiveAlerts([
        ...activeAlerts,
        {
          id: Date.now(),
          name: match ? match.product_name : selectedProduct,
          target: parseInt(targetPrice),
          current: parseInt(targetPrice) + 1500, // Mock current
          status: "Active"
        }
      ]);
      setSuccessMsg("Price alert successfully activated!");
      setTargetPrice("");
      setEmail("");
    } catch (err) {
      alert("Error setting alert (backend might be down). We'll set a mock alert locally.");
      const match = staticProducts.find(p => p.product_key === selectedProduct);
      setActiveAlerts([
        ...activeAlerts,
        {
          id: Date.now(),
          name: match ? match.product_name : selectedProduct,
          target: parseInt(targetPrice),
          current: parseInt(targetPrice) + 1500, // Mock current
          status: "Active"
        }
      ]);
      setSuccessMsg("Price alert successfully activated (Mock Mode)!");
      setTargetPrice("");
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050914] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* Background Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-[#050914]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Search
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <BellRing className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tight">Price<span className="text-cyan-400">Alerts</span></span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-5">
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">Set Price Alert</h1>
            <p className="text-slate-400 leading-relaxed">
              We monitor prices 24/7. When the product hits your target price, we&apos;ll notify you instantly via email.
            </p>
          </div>

          <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2rem] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
            
            {successMsg && (
              <div className="mb-6 flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-medium">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <p>{successMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-cyan-400" /> Select Product
                </label>
                <select 
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 px-4 text-white appearance-none outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                >
                  {staticProducts.map(p => (
                    <option key={p.product_key} value={p.product_key} className="bg-slate-900 text-white">
                      {p.product_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" /> Target Price (₹)
                </label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all font-mono"
                  placeholder="e.g., 65000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" /> Notify Email
                </label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder-slate-600 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Create Alert <Bell className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Active Monitors */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-bold">Active Monitors</h2>
          </div>

          <div className="grid gap-4">
            {activeAlerts.map(alert => (
              <div key={alert.id} className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl flex flex-col hover:border-slate-700 transition-colors shadow-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{alert.status}</span>
                    </div>
                    <h3 className="font-bold text-lg text-white leading-tight">{alert.name}</h3>
                  </div>
                  
                  <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto p-4 md:p-0 bg-slate-950/50 md:bg-transparent rounded-xl border border-slate-800 md:border-transparent">
                    <div>
                      <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                        <Target className="w-3 h-3" /> Target
                      </div>
                      <div className="font-bold text-emerald-400 text-lg">₹{alert.target.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                        <Tag className="w-3 h-3" /> Current
                      </div>
                      <div className="font-bold text-white text-lg">₹{alert.current.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar UI */}
                <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full relative" 
                    style={{ width: `${Math.min(100, Math.max(0, (alert.target / alert.current) * 100))}%` }}
                  >
                    <div className="absolute top-0 right-0 w-4 h-full bg-white/30 animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
                <div className="mt-2 text-right text-xs text-slate-400">
                  {Math.round((alert.target / alert.current) * 100)}% to target
                </div>
              </div>
            ))}

            {activeAlerts.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">No active alerts. Set one up to start tracking!</p>
              </div>
            )}
          </div>
        </div>

      </main>

    </div>
  );
}
