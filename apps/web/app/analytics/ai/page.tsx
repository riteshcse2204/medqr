'use client';

import React, { useState } from 'react';
import { 
  BrainCircuit, Sparkles, RefreshCw, 
  TrendingUp, AlertCircle, ShoppingCart, 
  ChevronRight, ArrowUpRight, CheckCircle2 
} from 'lucide-react';

export default function AiDashboard() {
  const [isFineTuning, setIsFineTuning] = useState(false);
  const [lastSync, setLastSync] = useState('2 hours ago');

  const handleFineTune = () => {
    setIsFineTuning(true);
    setTimeout(() => {
      setIsFineTuning(false);
      setLastSync('Just now');
    }, 3000);
  };

  return (
    <div className="p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <BrainCircuit size={20} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Prediction Engine</h1>
          </div>
          <p className="text-slate-500 font-medium">Self-learning models analyzing hospital operations and patient behavior.</p>
        </div>
        <button 
          onClick={handleFineTune}
          disabled={isFineTuning}
          className={`flex items-center gap-3 px-8 py-4 rounded-[24px] font-bold shadow-xl transition-all active:scale-95 ${isFineTuning ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'}`}
        >
          <RefreshCw size={20} className={isFineTuning ? 'animate-spin' : ''} />
          <span>{isFineTuning ? 'Fine-tuning Models...' : 'Fine-tune Engine'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <InsightCard 
          title="Patient No-Show Risk"
          value="14.2%"
          trend="-2.4%"
          status="Improving"
          icon={<AlertCircle size={28} />}
          color="indigo"
          details="AI has identified 18 appointments today with a >70% probability of cancellation."
        />
        <InsightCard 
          title="Inventory Stock Out"
          value="5 Items"
          trend="+12%"
          status="Critical"
          icon={<ShoppingCart size={28} />}
          color="rose"
          details="Critical medicines (Insulin, IV Fluids) estimated to run out in less than 48 hours."
        />
        <InsightCard 
          title="Revenue Projection"
          value="₹14.8L"
          trend="+8.5%"
          status="On Track"
          icon={<TrendingUp size={28} />}
          color="emerald"
          details="Estimated monthly closure based on current booking velocity and OPD growth."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fine-tuning Status */}
        <div className="bg-white rounded-[48px] p-12 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-indigo-600">
            <Sparkles size={160} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-8">Engine Status</h2>
          <div className="space-y-8">
            <StatusRow label="Data Accuracy" value="98.4%" />
            <StatusRow label="Last Model Retrain" value={lastSync} />
            <StatusRow label="Sample Size" value="12,482 Records" />
            <div className="pt-4 flex items-center gap-2 text-indigo-600 font-black">
              <CheckCircle2 size={20} />
              <span>Models are currently healthy and operational</span>
            </div>
          </div>
        </div>

        {/* Actionable Intelligence */}
        <div className="bg-slate-900 rounded-[48px] p-12 text-white shadow-2xl">
          <h2 className="text-3xl font-black mb-8">AI Recommended Actions</h2>
          <div className="space-y-6">
            <ActionItem 
              label="Inventory Procurement" 
              action="Generate PO for 500 units of Paracetamol (Stock out in 3 days)" 
            />
            <ActionItem 
              label="Staff Allocation" 
              action="Increase nursing staff for Muzaffarpur branch on Saturday (High OPD predicted)" 
            />
            <ActionItem 
              label="Patient Engagement" 
              action="Auto-call 5 patients with 'High Risk' of no-show for surgery tomorrow" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, value, trend, status, icon, color, details }: any) {
  const colors: any = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  };

  return (
    <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm hover:shadow-2xl transition-all group">
      <div className="flex justify-between items-start mb-8">
        <div className={`p-5 rounded-3xl ${colors[color]} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div className="text-right">
          <span className={`text-xs font-black px-3 py-1 rounded-full ${colors[color]} border`}>{status}</span>
          <p className={`text-sm font-black mt-2 ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{trend}</p>
        </div>
      </div>
      <h3 className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-2">{title}</h3>
      <div className="text-5xl font-black text-slate-900 mb-6">{value}</div>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">{details}</p>
      <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between group-hover:text-indigo-600 transition-colors">
        <span className="text-xs font-black uppercase tracking-widest">View Detailed Analysis</span>
        <ChevronRight size={20} />
      </div>
    </div>
  );
}

function StatusRow({ label, value }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[24px] border border-slate-100">
      <span className="text-slate-500 font-bold">{label}</span>
      <span className="text-slate-900 font-black">{value}</span>
    </div>
  );
}

function ActionItem({ label, action }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">{label}</span>
        <ArrowUpRight size={16} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-all" />
      </div>
      <p className="text-slate-300 font-medium leading-snug group-hover:text-white transition-colors">{action}</p>
      <div className="mt-6 h-px bg-white/5 group-last:hidden"></div>
    </div>
  );
}
