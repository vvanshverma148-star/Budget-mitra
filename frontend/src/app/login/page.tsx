/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { login } = useAuth();

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    
    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to login.");
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

        {/* Right Side: Login Form */}
        <div className="w-full md:w-[480px] bg-surface rounded-[32px] card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] p-8 md:p-12 relative overflow-hidden">
          
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full card-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] flex items-center justify-center bg-surface">
              <span className="material-symbols-outlined text-primary text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
            </div>
            <h1 className="text-headline-md font-bold text-primary tracking-tight">Budget Mitra</h1>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-headline-md font-bold text-on-surface mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-body-md text-on-surface-variant">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="bg-error-container text-on-error-container text-sm font-bold px-4 py-3 rounded-xl text-center">
                {errorMsg}
              </div>
            )}
            
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

            {/* Options */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-5 h-5 rounded card-neu shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] flex items-center justify-center bg-surface group-hover:shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] transition-shadow">
                  {/* Checkmark could go here */}
                </div>
                <span className="text-label-md font-semibold text-on-surface-variant group-hover:text-primary transition-colors">Remember me</span>
              </label>
              <a className="text-label-md font-semibold text-secondary hover:text-primary transition-colors" href="#">Forgot password?</a>
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
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-surface-dim shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF]"></div>
            <span className="text-label-sm font-semibold text-outline uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-[1px] bg-surface-dim shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF]"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="h-12 rounded-xl bg-surface btn-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] active:shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] transition-all duration-200 flex items-center justify-center gap-2 text-label-md font-semibold text-on-surface" type="button">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path><path d="M1 1h22v22H1z" fill="none"></path></svg>
              Google
            </button>
            <button className="h-12 rounded-xl bg-surface btn-neu shadow-[8px_8px_16px_#B8C2D0,-8px_-8px_16px_#FFFFFF] hover:shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] active:shadow-[inset_4px_4px_8px_#B8C2D0,inset_-4px_-4px_8px_#FFFFFF] transition-all duration-200 flex items-center justify-center gap-2 text-label-md font-semibold text-on-surface" type="button">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>apps</span>
              Apple
            </button>
          </div>

          <p className="text-center mt-8 text-body-md text-on-surface-variant">
            Don't have an account? <button onClick={() => router.push('/signup')} className="text-secondary font-semibold hover:text-primary transition-colors">Sign up</button>
          </p>

        </div>
      </main>
    </div>
  );
}
