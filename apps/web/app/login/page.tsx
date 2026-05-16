'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2, ShieldCheck, Activity, Zap, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mocking login for UI demonstration if API is not ready, but using the real logic
      const response: any = await api.post('/auth/login', { email, password });
      setAuth(response.user, response.token, response.user.tenantId);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Left side: Branding & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0c] relative flex-col justify-between p-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/30">
              <ShieldCheck size={28} />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter italic">MedQR</span>
          </div>

          <div className="space-y-8 max-w-lg">
            <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight">
              Next-Gen <span className="text-blue-500">Hospital</span> Management.
            </h1>
            <p className="text-slate-400 text-xl font-medium leading-relaxed">
              Empowering healthcare providers with real-time analytics, IoT monitoring, and seamless patient care.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <FeatureItem 
            icon={<Activity className="text-blue-400" />} 
            title="Real-time Vitals" 
            desc="Connected IoT sensors for live patient monitoring." 
          />
          <FeatureItem 
            icon={<Zap className="text-amber-400" />} 
            title="Fast Billing" 
            desc="GST-compliant billing and e-invoicing in seconds." 
          />
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md space-y-10">
          <div className="text-left">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-medium text-lg">Enter your details to access the portal.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-[20px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                placeholder="doctor@medqr.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-[20px] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center gap-2 ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="remember" className="text-sm font-bold text-slate-500 cursor-pointer">Keep me signed in</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Sign Into Portal <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="pt-8 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-400 font-bold">New Hospital?</p>
              <button className="text-blue-600 font-black text-sm px-6 py-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
                Register Tenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="space-y-2">
      <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-white font-bold">{title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
