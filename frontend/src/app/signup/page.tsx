"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, UserPlus, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { register: registerUser } = useAuth();

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await registerUser(name, email, password);
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex items-center justify-center p-margin-mobile md:p-margin-desktop selection:bg-secondary/30">
      
      <button 
        onClick={() => router.push('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors z-50 group font-label-md"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </button>

      <main className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-center">
        {/* Left Side: Branding / Intro */}
        <div className="hidden md:flex flex-col items-start w-1/2 p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] flex items-center justify-center bg-surface">
              <span className="material-symbols-outlined text-primary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
            </div>
            <h1 className="text-headline-lg font-bold text-primary tracking-tight">Budget Mitra</h1>
          </div>
          <p className="text-body-lg text-on-surface-variant max-w-md mt-4 leading-relaxed">
            Experience the next generation of personal finance management. Secure, intuitive, and designed to help you achieve your financial goals with precision.
          </p>
          <div className="mt-12 flex gap-4">
            <div className="w-16 h-16 rounded-full card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] flex items-center justify-center bg-surface text-secondary">
              <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>shield</span>
            </div>
            <div className="w-16 h-16 rounded-full card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] flex items-center justify-center bg-surface text-secondary">
              <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>monitoring</span>
            </div>
            <div className="w-16 h-16 rounded-full card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] flex items-center justify-center bg-surface text-secondary">
              <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>pie_chart</span>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full md:w-[480px] bg-surface rounded-[32px] card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] p-8 md:p-12 relative overflow-hidden">
          
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] flex items-center justify-center bg-surface">
              <span className="material-symbols-outlined text-primary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
            </div>
            <h1 className="text-headline-md font-bold text-primary tracking-tight">Budget Mitra</h1>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-headline-md font-bold text-on-surface mb-2 tracking-tight">Create Account</h2>
            <p className="text-body-md text-on-surface-variant">Join BudgetMitra for smarter shopping.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="bg-error-container text-on-error-container text-sm font-bold px-4 py-3 rounded-xl text-center">
                {errorMsg}
              </div>
            )}
            
            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="text-label-md font-semibold text-on-surface-variant ml-2 block">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-outline">person</span>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full input-neu pl-12 pr-4 bg-surface rounded-xl shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] border-none text-body-md focus:ring-0 focus:outline-none placeholder-outline-variant text-on-surface py-4"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-label-md font-semibold text-on-surface-variant ml-2 block">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-outline">mail</span>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input-neu pl-12 pr-4 bg-surface rounded-xl shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] border-none text-body-md focus:ring-0 focus:outline-none placeholder-outline-variant text-on-surface py-4"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-label-md font-semibold text-on-surface-variant ml-2 block">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-outline">lock</span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full input-neu pl-12 pr-12 bg-surface rounded-xl shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] border-none text-body-md focus:ring-0 focus:outline-none placeholder-outline-variant text-on-surface py-4 tracking-widest"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-outline hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="text-label-md font-semibold text-on-surface-variant ml-2 block">Confirm Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-outline">lock</span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full input-neu pl-12 pr-12 bg-surface rounded-xl shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] border-none text-body-md focus:ring-0 focus:outline-none placeholder-outline-variant text-on-surface py-4 tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Primary Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 mt-4 bg-primary text-on-primary rounded-xl text-label-md font-bold btn-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] active:shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign Up</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-body-md text-on-surface-variant">
            Already have an account? <button onClick={() => router.push('/login')} className="text-secondary font-semibold hover:text-primary transition-colors">Sign in</button>
          </p>

        </div>
      </main>
    </div>
  );
}
