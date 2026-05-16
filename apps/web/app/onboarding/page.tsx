'use client';

import React, { useState } from 'react';
import { 
  Building2, CheckCircle2, CreditCard, 
  ArrowRight, ShieldCheck, Zap, Star
} from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-4xl space-y-12">
        {/* Progress Bar */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <StepIcon number={1} active={step >= 1} label="Hospital" />
          <div className={`h-1 flex-1 mx-4 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          <StepIcon number={2} active={step >= 2} label="Plan" />
          <div className={`h-1 flex-1 mx-4 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          <StepIcon number={3} active={step >= 3} label="Admin" />
        </div>

        {step === 1 && (
          <div className="bg-white rounded-[40px] p-12 shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Hospital Details</h2>
            <p className="text-slate-500 font-medium mb-10">Tell us about your healthcare institution.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <OnboardingField label="Hospital Name" placeholder="e.g. City Heart Hospital" />
              <OnboardingField label="Registration / License No" placeholder="HOSP-12345" />
              <div className="md:col-span-2">
                <label className="text-sm font-black text-slate-700 mb-2 block uppercase tracking-widest">Desired Subdomain</label>
                <div className="flex items-center">
                  <input className="flex-1 px-6 py-4 bg-slate-50 border-transparent rounded-l-2xl outline-none focus:bg-white focus:border-blue-500 font-bold" placeholder="hospital-name" />
                  <div className="px-6 py-4 bg-slate-200 text-slate-600 font-black rounded-r-2xl">.medqr.com</div>
                </div>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="w-full mt-12 bg-blue-600 text-white py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
              Continue to Plans <ArrowRight size={22} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center">
              <h2 className="text-4xl font-black text-slate-900 mb-3">Select Your Subscription</h2>
              <p className="text-slate-500 font-medium text-lg">Choose the best plan for your hospital's growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard 
                name="Basic" 
                price="1,999" 
                features={['5 Doctors Max', 'Standard Pharmacy', 'OPD Management']} 
              />
              <PricingCard 
                name="Pro" 
                price="4,999" 
                features={['Unlimited Doctors', 'Advanced Inventory', 'Telemedicine', 'IoT Monitoring']} 
                popular 
              />
              <PricingCard 
                name="Enterprise" 
                price="Custom" 
                features={['Multi-Branch Support', 'Full NABH Compliance', 'Dedicated Manager']} 
              />
            </div>

            <button onClick={() => setStep(3)} className="w-full max-w-md mx-auto block bg-blue-600 text-white py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
              Setup Admin Account <ArrowRight size={22} />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-[40px] p-12 shadow-xl shadow-slate-200/50 border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-black text-slate-900 mb-2">Platform Admin</h2>
            <p className="text-slate-500 font-medium mb-10">Create the primary account for your hospital management.</p>
            
            <div className="space-y-6">
              <OnboardingField label="Admin Full Name" placeholder="e.g. Dr. Aryan Singh" />
              <OnboardingField label="Work Email" placeholder="aryan@hospital.com" />
              <OnboardingField label="Secure Password" placeholder="••••••••" type="password" />
            </div>

            <button onClick={() => alert('Registration Complete! Redirecting to Dashboard...')} className="w-full mt-12 bg-emerald-600 text-white py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100">
              Launch My Hospital <Zap size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StepIcon({ number, active, label }: any) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black transition-all ${active ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-300 border border-slate-200'}`}>
        {active && number < 3 ? <CheckCircle2 size={24} /> : number}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-blue-600' : 'text-slate-300'}`}>{label}</span>
    </div>
  );
}

function OnboardingField({ label, placeholder, type = 'text' }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-black text-slate-700 mb-2 block uppercase tracking-widest">{label}</label>
      <input 
        type={type}
        className="w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500 font-bold transition-all" 
        placeholder={placeholder} 
      />
    </div>
  );
}

function PricingCard({ name, price, features, popular }: any) {
  return (
    <div className={`bg-white rounded-[32px] p-8 border transition-all ${popular ? 'border-blue-500 shadow-2xl shadow-blue-500/10 ring-1 ring-blue-500' : 'border-slate-100 shadow-sm hover:shadow-xl'}`}>
      {popular && (
        <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full absolute -top-4 left-1/2 -translate-x-1/2">Most Popular</span>
      )}
      <h3 className="text-xl font-black text-slate-900 mb-1">{name}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-3xl font-black text-slate-900">{price !== 'Custom' ? `₹${price}` : price}</span>
        {price !== 'Custom' && <span className="text-slate-400 font-bold text-sm">/month</span>}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((f: any, i: number) => (
          <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
            <CheckCircle2 size={16} className="text-emerald-500" /> {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-4 rounded-2xl font-black text-sm transition-all ${popular ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
        Choose {name}
      </button>
    </div>
  );
}
