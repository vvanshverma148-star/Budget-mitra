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
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="#">Compare</a>
            <a className="text-secondary font-bold border-b-2 border-secondary pb-1 text-label-md hover:text-primary transition-all duration-300" href="/alerts">Price Alerts</a>
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="#">Deals</a>
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="#">Calculators</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block btn-neu px-6 py-2 text-label-md text-primary font-medium" onClick={() => router.push('/login')}>Log Out</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-5">
          <div className="mb-8">
            <h1 className="text-headline-lg font-bold tracking-tight mb-4 text-primary">Set Price Alert</h1>
            <p className="text-on-surface-variant leading-relaxed text-body-md">
              We monitor prices 24/7. When the product hits your target price, we'll notify you instantly via email.
            </p>
          </div>

          <div className="p-8 bg-surface card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-[32px] relative overflow-hidden">
            
            {successMsg && (
              <div className="mb-6 flex items-start gap-3 p-4 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl text-label-md font-medium">
                <span className="material-symbols-outlined flex-shrink-0" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                <p>{successMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-label-sm font-semibold text-on-surface-variant flex items-center gap-2 ml-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">smartphone</span> Select Product
                </label>
                <select 
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] border-none rounded-xl py-3 px-4 text-on-surface appearance-none outline-none focus:ring-0 transition-all font-body-md"
                >
                  {staticProducts.map(p => (
                    <option key={p.product_key} value={p.product_key}>
                      {p.product_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-label-sm font-semibold text-on-surface-variant flex items-center gap-2 ml-2">
                  <span className="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">target</span> Target Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">₹</span>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full bg-surface input-neu pl-8 pr-4 py-3 rounded-xl shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] border-none text-on-surface placeholder-outline-variant outline-none focus:ring-0 transition-all font-mono"
                    placeholder="e.g., 65000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-label-sm font-semibold text-on-surface-variant flex items-center gap-2 ml-2">
                  <span className="material-symbols-outlined text-[16px]">mail</span> Notify Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">mail</span>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface input-neu pl-10 pr-4 py-3 rounded-xl shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] border-none text-on-surface placeholder-outline-variant outline-none focus:ring-0 transition-all font-body-md"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 mt-4 bg-primary text-on-primary rounded-xl text-label-md font-bold btn-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
                ) : (
                  <>Create Alert <span className="material-symbols-outlined text-[18px]">add_alert</span></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Active Monitors */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-headline-md font-bold text-on-surface">Active Monitors</h2>
          </div>

          <div className="grid gap-4">
            {activeAlerts.map(alert => (
              <div key={alert.id} className="card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-2xl p-6 flex flex-col gap-6 relative group transition-all">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-body-md font-bold text-primary">{alert.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
                        <span className="text-label-sm font-bold text-tertiary-fixed-dim uppercase tracking-wider">{alert.status}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-label-sm mb-4">
                      <span className="text-on-surface-variant font-medium">Current: ₹{alert.current.toLocaleString()}</span>
                      <span className="text-secondary font-bold">Target: ₹{alert.target.toLocaleString()}</span>
                    </div>

                    {/* Progress Bar UI */}
                    <div className="h-3 w-full bg-surface shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] rounded-full overflow-hidden relative">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary-fixed to-secondary rounded-full" 
                        style={{ width: `${Math.min(100, Math.max(0, (alert.target / alert.current) * 100))}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-right text-label-sm text-on-surface-variant">
                      {Math.round((alert.target / alert.current) * 100)}% to target
                    </div>
                  </div>

                  <button className="w-10 h-10 rounded-full bg-surface shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] flex items-center justify-center text-outline hover:text-error transition-all btn-neu flex-shrink-0">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}

            {activeAlerts.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed border-outline-variant rounded-2xl">
                <span className="material-symbols-outlined text-[48px] text-outline mb-4">notifications_off</span>
                <p className="text-on-surface-variant font-medium">No active alerts. Set one up to start tracking!</p>
              </div>
            )}
          </div>
        </div>

      </main>

    </div>
  );
}
