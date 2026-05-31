"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, GitCompare, Zap, Search, Brain, Activity, Target } from "lucide-react";

const staticProducts = [
  { product_key: "apple-iphone-15-128gb-black", product_name: "Apple iPhone 15 128GB Black", brand: "Apple", current_price: 69999, platform: "Amazon", historic_low: 62000, recommendation: "WAIT", specs: { storage: "128GB", display: "6.1 Super Retina XDR", camera: "48MP Main", battery: "3349 mAh" }, review_summary: "Users generally love the iPhone 15 for its refined design and great cameras, though the 60Hz display is a sticking point at this price." },
  { product_key: "samsung-galaxy-s24-256gb-onyx-black", product_name: "Samsung Galaxy S24 256GB Onyx Black", brand: "Samsung", current_price: 79999, platform: "Flipkart", historic_low: 74000, recommendation: "BUY", specs: { storage: "256GB", display: "6.2 Dynamic AMOLED 2X", camera: "50MP Main", battery: "4000 mAh" }, review_summary: "The Galaxy S24 remains a strong contender for those wanting a compact, powerful Android device. Fast performance and good battery life." },
  { product_key: "oneplus-12-256gb-flowy-emerald", product_name: "OnePlus 12 256GB Flowy Emerald", brand: "OnePlus", current_price: 64999, platform: "Amazon", historic_low: 58000, recommendation: "WAIT", specs: { storage: "256GB", display: "6.82 LTPO AMOLED", camera: "50MP Main", battery: "5400 mAh" }, review_summary: "Reviewers praise the OnePlus 12 as a true flagship killer offering incredible value, performance, and superfast charging." },
  { product_key: "google-pixel-8-128gb-hazel", product_name: "Google Pixel 8 128GB Hazel", brand: "Google", current_price: 59999, platform: "Croma", historic_low: 49999, recommendation: "WAIT", specs: { storage: "128GB", display: "6.2 OLED", camera: "50MP Main", battery: "4575 mAh" }, review_summary: "The Pixel 8 is loved for its clean software and cameras, but power users might find the battery lacking." }
];

export default function ComparePage() {
  const router = useRouter();
  const [product1Key, setProduct1Key] = useState(staticProducts[0].product_key);
  const [product2Key, setProduct2Key] = useState(staticProducts[1].product_key);

  const product1 = staticProducts.find(p => p.product_key === product1Key);
  const product2 = staticProducts.find(p => p.product_key === product2Key);

  return (
    <div className="min-h-screen bg-[#050914] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-[#050914]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center">
              <GitCompare className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tight">Price<span className="text-purple-400">Compare</span></span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Head-to-Head Comparison</h1>
          <p className="text-slate-400">Select two products to instantly compare prices, historic lows, and AI recommendations.</p>
        </div>

        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product 1 Selector */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <select 
              value={product1Key}
              onChange={(e) => setProduct1Key(e.target.value)}
              className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl py-5 pl-12 pr-4 text-white appearance-none outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-bold text-lg"
            >
              {staticProducts.map(p => (
                <option key={p.product_key} value={p.product_key} className="bg-slate-900 text-white">
                  {p.product_name}
                </option>
              ))}
            </select>
          </div>

          {/* Product 2 Selector */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <select 
              value={product2Key}
              onChange={(e) => setProduct2Key(e.target.value)}
              className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl py-5 pl-12 pr-4 text-white appearance-none outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-bold text-lg"
            >
              {staticProducts.map(p => (
                <option key={p.product_key} value={p.product_key} className="bg-slate-900 text-white">
                  {p.product_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Matrix */}
        {(product1 && product2) && (
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            
            <div className="grid grid-cols-2 divide-x divide-slate-800">
              
              {/* Column 1 */}
              <div className="p-8 md:p-12">
                <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">{product1.brand}</div>
                <h2 className="text-2xl font-bold text-white mb-12">{product1.product_name}</h2>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-slate-400 font-medium">
                        <Zap className="w-4 h-4 text-yellow-400" /> Current Price
                      </div>
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-bold rounded border border-blue-500/20">{product1.platform}</span>
                    </div>
                    <div className="text-3xl font-black">₹{product1.current_price.toLocaleString()}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium">
                      <Activity className="w-4 h-4 text-emerald-400" /> Historic Low
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">₹{product1.historic_low.toLocaleString()}</div>
                  </div>

                  <div className="pt-6 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 mb-4 font-medium">
                      <Brain className="w-4 h-4 text-cyan-400" /> AI Recommendation
                    </div>
                    <div className={`inline-block px-4 py-2 rounded-xl border font-bold text-lg ${product1.recommendation === 'BUY' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                      {product1.recommendation}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800">
                    <div className="text-slate-500 font-medium mb-3">Review Summary</div>
                    <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/50 pl-3">
                      "{product1.review_summary}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-800 space-y-3">
                    <div className="text-slate-500 font-medium mb-4">Specifications</div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Storage</span><span className="font-semibold">{product1.specs.storage}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Display</span><span className="font-semibold">{product1.specs.display}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Camera</span><span className="font-semibold">{product1.specs.camera}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Battery</span><span className="font-semibold">{product1.specs.battery}</span></div>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="p-8 md:p-12 bg-slate-950/20">
                <div className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-2">{product2.brand}</div>
                <h2 className="text-2xl font-bold text-white mb-12">{product2.product_name}</h2>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-slate-400 font-medium">
                        <Zap className="w-4 h-4 text-yellow-400" /> Current Price
                      </div>
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-bold rounded border border-blue-500/20">{product2.platform}</span>
                    </div>
                    <div className="text-3xl font-black">₹{product2.current_price.toLocaleString()}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-slate-400 mb-2 font-medium">
                      <Activity className="w-4 h-4 text-emerald-400" /> Historic Low
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">₹{product2.historic_low.toLocaleString()}</div>
                  </div>

                  <div className="pt-6 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-slate-400 mb-4 font-medium">
                      <Brain className="w-4 h-4 text-purple-400" /> AI Recommendation
                    </div>
                    <div className={`inline-block px-4 py-2 rounded-xl border font-bold text-lg ${product2.recommendation === 'BUY' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                      {product2.recommendation}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800">
                    <div className="text-slate-500 font-medium mb-3">Review Summary</div>
                    <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-purple-500/50 pl-3">
                      "{product2.review_summary}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-800 space-y-3">
                    <div className="text-slate-500 font-medium mb-4">Specifications</div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Storage</span><span className="font-semibold">{product2.specs.storage}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Display</span><span className="font-semibold">{product2.specs.display}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Camera</span><span className="font-semibold">{product2.specs.camera}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-slate-400">Battery</span><span className="font-semibold">{product2.specs.battery}</span></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
