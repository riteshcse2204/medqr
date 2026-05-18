'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2, ShieldCheck, Activity, Zap, ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

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
      // Mocking login for UI demonstration based on email
      let role = 'ADMIN';
      let redirectPath = '/dashboard/admin';
      let name = 'Admin User';
      
      if (email.includes('doctor')) {
        role = 'DOCTOR';
        redirectPath = '/dashboard/doctor';
        name = 'Dr. Smith';
      } else if (email.includes('pharmacy')) {
        role = 'PHARMACY';
        redirectPath = '/dashboard/pharmacy';
        name = 'Pharmacy User';
      } else if (email.includes('reception')) {
        role = 'RECEPTION';
        redirectPath = '/dashboard/reception';
        name = 'Receptionist User';
      }

      const response: any = { 
        user: { id: '1', name, role, tenantId: 'tenant_1' },
        token: 'demo_token'
      };
      
      setAuth(response.user, response.token, response.user.tenantId);
      router.push(redirectPath);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden font-sans">
      {/* Left side: Premium Branding & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0c] relative flex-col justify-between p-16 overflow-hidden">
        {/* Dynamic Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
        
        {/* Floating Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-16 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="h-14 w-14 bg-blue-600 rounded-[22px] flex items-center justify-center text-white shadow-2xl shadow-blue-600/40 transform -rotate-6">
              <ShieldCheck size={32} />
            </div>
            <span className="text-4xl font-black text-white tracking-tighter italic">MedQR</span>
          </div>

          <div className="space-y-8 max-w-xl animate-in fade-in slide-in-from-left-6 duration-1000 delay-100">
            <h1 className="text-7xl font-black text-white leading-[1.05] tracking-tight">
              Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Hospital</span><br />
              Management.
            </h1>
            <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md">
              The world's first AI-driven, multi-tenant clinical OS for modern healthcare providers.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-10 border-t border-white/10 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <BrandingFeature 
            icon={<Activity className="text-blue-400" />} 
            title="Real-time Vitals" 
            desc="Integrated IoT sensors for live patient monitoring." 
          />
          <BrandingFeature 
            icon={<Zap className="text-amber-400" />} 
            title="SaaS Engine" 
            desc="Scale from 1 to 10,000 hospitals seamlessly." 
          />
        </div>
      </div>

      {/* Right side: Modern Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 relative">
        <div className="absolute top-10 right-10 flex gap-2">
            <Link href="/onboarding" className="text-xs font-black text-blue-600 bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100 transition-all">
                REGISTER HOSPITAL
            </Link>
        </div>

        <div className="w-full max-w-md space-y-12 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-left space-y-3">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">Sign In to Portal</h2>
            <p className="text-slate-500 font-medium text-lg">Enter your professional credentials to continue.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-[20px] border border-red-100 flex items-center gap-3 animate-bounce">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-white border border-slate-200 rounded-[24px] focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                  placeholder="doctor@cityhospital.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-xs font-black text-blue-600 hover:underline">FORGOT?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-white border border-slate-200 rounded-[24px] focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-6 rounded-[28px] font-black text-xl shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-4 active:scale-95 transform hover:-translate-y-1"
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Enter Dashboard <ArrowRight size={24} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-400 font-bold text-sm">
            Platform Owner? <Link href="/superadmin" className="text-slate-900 hover:underline">Access Master Portal</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function BrandingFeature({ icon, title, desc }: any) {
  return (
    <div className="space-y-3">
      <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-white font-black text-lg">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function AlertCircle({ size }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  );
}
