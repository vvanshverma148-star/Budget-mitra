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
    <div className="min-h-screen bg-[#050914] text-white overflow-hidden relative flex items-center justify-center selection:bg-cyan-500/30 font-sans">
      
      {/* 3D Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-cyan-900/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-900/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      {/* Floating 3D Elements */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-[60%] right-[15%] w-40 h-40 bg-gradient-to-tl from-emerald-600/20 to-transparent rounded-full blur-2xl animate-float"></div>
      </div>

      <button 
        onClick={() => router.push('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors z-50 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
      </button>

      {/* 3D Card Container */}
      <div 
        className="relative z-10 w-full max-w-md p-8 perspective-1000 mt-12 mb-12"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setMousePos({ x: 0, y: 0 }); }}
      >
        <div 
          className="relative w-full h-full p-8 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl transition-all duration-300 ease-out preserve-3d"
          style={{
            transform: isHovering 
              ? `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg) translateZ(20px)`
              : 'rotateY(0deg) rotateX(0deg) translateZ(0px)',
            boxShadow: isHovering 
              ? `${-mousePos.x * 30}px ${-mousePos.y * 30}px 50px rgba(0,0,0,0.5), 0 0 40px rgba(34,211,238,0.2) inset` 
              : '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Card Glow Border */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)] pointer-events-none transform translate-z-10"></div>
          
          <div className="text-center mb-8 transform translate-z-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-600 mb-6 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Create Account</h1>
            <p className="text-slate-400 text-sm font-medium">Join BudgetMitra for smarter shopping</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 transform translate-z-30">
            {errorMsg && (
              <div className="bg-rose-500/10 border border-rose-500/50 text-rose-400 text-sm font-bold px-4 py-3 rounded-xl text-center animate-pulse">
                {errorMsg}
              </div>
            )}
            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-600 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-600 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-4 pl-12 pr-12 text-white placeholder-slate-600 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner font-mono tracking-widest"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-4 pl-12 pr-12 text-white placeholder-slate-600 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner font-mono tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Register <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400 transform translate-z-20">
            Already have an account? <button onClick={() => router.push('/login')} className="font-bold text-cyan-400 hover:text-cyan-300">Sign in</button>
          </div>
        </div>
      </div>

    </div>
  );
}
