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
            <a className="text-secondary font-bold border-b-2 border-secondary pb-1 text-label-md hover:text-primary transition-all duration-300" href="/compare">Compare</a>
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="/alerts">Price Alerts</a>
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="#">Deals</a>
            <a className="text-on-surface-variant font-medium text-label-md hover:text-primary transition-all duration-300" href="#">Calculators</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block btn-neu px-6 py-2 text-label-md text-primary font-medium" onClick={() => router.push('/login')}>Log In</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        
        <div className="text-center mb-12">
          <h1 className="text-headline-lg font-bold tracking-tight mb-4 text-primary">Head-to-Head Comparison</h1>
          <p className="text-on-surface-variant text-body-lg max-w-2xl mx-auto">Select two products to instantly compare prices, historic lows, and AI recommendations.</p>
        </div>

        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product 1 Selector */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <span className="material-symbols-outlined text-secondary">search</span>
            </div>
            <select 
              value={product1Key}
              onChange={(e) => setProduct1Key(e.target.value)}
              className="w-full bg-surface input-neu pl-12 pr-4 py-5 rounded-2xl shadow-[inset_8px_8px_16px_#B8C2D0,inset_-8px_-8px_16px_#FFFFFF] border-none text-on-surface appearance-none outline-none focus:ring-0 transition-all font-bold text-lg"
            >
              {staticProducts.map(p => (
                <option key={p.product_key} value={p.product_key}>
                  {p.product_name}
                </option>
              ))}
            </select>
          </div>

          {/* Product 2 Selector */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <span className="material-symbols-outlined text-tertiary-fixed-dim">search</span>
            </div>
            <select 
              value={product2Key}
              onChange={(e) => setProduct2Key(e.target.value)}
              className="w-full bg-surface input-neu pl-12 pr-4 py-5 rounded-2xl shadow-[inset_8px_8px_16px_#B8C2D0,inset_-8px_-8px_16px_#FFFFFF] border-none text-on-surface appearance-none outline-none focus:ring-0 transition-all font-bold text-lg"
            >
              {staticProducts.map(p => (
                <option key={p.product_key} value={p.product_key}>
                  {p.product_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Matrix */}
        {(product1 && product2) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Column 1 */}
            <div className="card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full"></div>
              
              <div className="text-label-sm font-bold text-secondary uppercase tracking-wider mb-2">{product1.brand}</div>
              <h2 className="text-headline-md font-bold text-primary mb-12">{product1.product_name}</h2>

              <div className="space-y-8 flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-on-surface-variant font-medium text-label-md">
                      <span className="material-symbols-outlined text-secondary text-[18px]">bolt</span> Current Price
                    </div>
                    <span className="px-3 py-1 bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] text-secondary text-label-sm font-bold rounded-lg">{product1.platform}</span>
                  </div>
                  <div className="text-[40px] font-bold text-primary tracking-tight">₹{product1.current_price.toLocaleString()}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2 font-medium text-label-md">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim text-[18px]">history</span> Historic Low
                  </div>
                  <div className="text-headline-md font-bold text-tertiary-fixed-dim" style={{color: '#009865'}}>₹{product1.historic_low.toLocaleString()}</div>
                </div>

                <div className="pt-6 border-t border-surface-dim">
                  <div className="flex items-center gap-2 text-on-surface-variant mb-4 font-medium text-label-md">
                    <span className="material-symbols-outlined text-secondary text-[18px]">psychology</span> AI Recommendation
                  </div>
                  <div className={`inline-block px-6 py-2 rounded-xl font-bold text-label-md bg-surface shadow-[4px_4px_8px_#B8C2D0,-4px_-4px_8px_#FFFFFF] ${product1.recommendation === 'BUY' ? 'text-tertiary-fixed-dim' : 'text-primary'}`} style={{color: product1.recommendation === 'BUY' ? '#009865' : '#00030a'}}>
                    {product1.recommendation}
                  </div>
                </div>

                <div className="pt-6 border-t border-surface-dim">
                  <div className="text-on-surface-variant font-semibold mb-3 text-label-md">Review Summary</div>
                  <p className="text-body-md text-on-surface-variant leading-relaxed italic border-l-4 border-secondary pl-4 py-1">
                    "{product1.review_summary}"
                  </p>
                </div>

                <div className="pt-6 border-t border-surface-dim space-y-4">
                  <div className="text-on-surface-variant font-semibold mb-4 text-label-md">Specifications</div>
                  <div className="flex justify-between items-center bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-3 rounded-xl">
                    <span className="text-on-surface-variant text-label-md">Storage</span>
                    <span className="font-bold text-primary text-label-md">{product1.specs.storage}</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-3 rounded-xl">
                    <span className="text-on-surface-variant text-label-md">Display</span>
                    <span className="font-bold text-primary text-label-md text-right">{product1.specs.display}</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-3 rounded-xl">
                    <span className="text-on-surface-variant text-label-md">Camera</span>
                    <span className="font-bold text-primary text-label-md text-right">{product1.specs.camera}</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-3 rounded-xl">
                    <span className="text-on-surface-variant text-label-md">Battery</span>
                    <span className="font-bold text-primary text-label-md">{product1.specs.battery}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] rounded-[32px] p-8 md:p-12 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-32 h-32 bg-tertiary-fixed-dim/10 blur-3xl rounded-full"></div>
              
              <div className="text-label-sm font-bold text-tertiary-fixed-dim uppercase tracking-wider mb-2" style={{color: '#009865'}}>{product2.brand}</div>
              <h2 className="text-headline-md font-bold text-primary mb-12">{product2.product_name}</h2>

              <div className="space-y-8 flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-on-surface-variant font-medium text-label-md">
                      <span className="material-symbols-outlined text-secondary text-[18px]">bolt</span> Current Price
                    </div>
                    <span className="px-3 py-1 bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] text-secondary text-label-sm font-bold rounded-lg">{product2.platform}</span>
                  </div>
                  <div className="text-[40px] font-bold text-primary tracking-tight">₹{product2.current_price.toLocaleString()}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-on-surface-variant mb-2 font-medium text-label-md">
                    <span className="material-symbols-outlined text-tertiary-fixed-dim text-[18px]">history</span> Historic Low
                  </div>
                  <div className="text-headline-md font-bold text-tertiary-fixed-dim" style={{color: '#009865'}}>₹{product2.historic_low.toLocaleString()}</div>
                </div>

                <div className="pt-6 border-t border-surface-dim">
                  <div className="flex items-center gap-2 text-on-surface-variant mb-4 font-medium text-label-md">
                    <span className="material-symbols-outlined text-secondary text-[18px]">psychology</span> AI Recommendation
                  </div>
                  <div className={`inline-block px-6 py-2 rounded-xl font-bold text-label-md bg-surface shadow-[4px_4px_8px_#B8C2D0,-4px_-4px_8px_#FFFFFF] ${product2.recommendation === 'BUY' ? 'text-tertiary-fixed-dim' : 'text-primary'}`} style={{color: product2.recommendation === 'BUY' ? '#009865' : '#00030a'}}>
                    {product2.recommendation}
                  </div>
                </div>

                <div className="pt-6 border-t border-surface-dim">
                  <div className="text-on-surface-variant font-semibold mb-3 text-label-md">Review Summary</div>
                  <p className="text-body-md text-on-surface-variant leading-relaxed italic border-l-4 border-tertiary-fixed-dim pl-4 py-1" style={{borderColor: '#009865'}}>
                    "{product2.review_summary}"
                  </p>
                </div>

                <div className="pt-6 border-t border-surface-dim space-y-4">
                  <div className="text-on-surface-variant font-semibold mb-4 text-label-md">Specifications</div>
                  <div className="flex justify-between items-center bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-3 rounded-xl">
                    <span className="text-on-surface-variant text-label-md">Storage</span>
                    <span className="font-bold text-primary text-label-md">{product2.specs.storage}</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-3 rounded-xl">
                    <span className="text-on-surface-variant text-label-md">Display</span>
                    <span className="font-bold text-primary text-label-md text-right">{product2.specs.display}</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-3 rounded-xl">
                    <span className="text-on-surface-variant text-label-md">Camera</span>
                    <span className="font-bold text-primary text-label-md text-right">{product2.specs.camera}</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface input-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] p-3 rounded-xl">
                    <span className="text-on-surface-variant text-label-md">Battery</span>
                    <span className="font-bold text-primary text-label-md">{product2.specs.battery}</span>
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
