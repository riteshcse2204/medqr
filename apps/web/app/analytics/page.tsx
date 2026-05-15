'use client';

import React from 'react';
import { 
  TrendingUp, TrendingDown, Users, 
  Calendar, Banknote, Clock, ArrowRight,
  Filter, Download, Activity
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-wrap justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Analytics & Insights</h1>
          <p className="text-slate-500 mt-2 text-lg">Detailed hospital performance metrics and growth trends.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-slate-700 px-6 py-3 rounded-2xl font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Filter size={20} /> Last 30 Days
          </button>
          <button className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-2 hover:-translate-y-1">
            <Download size={20} /> Generate PDF Report
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard label="Patient Growth" value="+240" trend="+14%" icon={<Users />} color="bg-blue-600" />
        <MetricCard label="Total Revenue" value="₹12.4L" trend="+22%" icon={<Banknote />} color="bg-emerald-600" />
        <MetricCard label="Avg. Wait Time" value="18m" trend="-4m" trendUp={false} icon={<Clock />} color="bg-indigo-600" />
        <MetricCard label="Appt. Success" value="94%" trend="+3%" icon={<Calendar />} color="bg-amber-600" />
      </div>

      {/* Charts Placeholder Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm h-96 flex flex-col">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Revenue Trends</h3>
          <div className="flex-1 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 font-bold">
            Revenue Chart Visualization
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm h-96 flex flex-col">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Patient Demographics</h3>
          <div className="flex-1 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 font-bold">
            Age & Gender Distribution
          </div>
        </div>
      </div>

      {/* AI Predictive Insights */}
      <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[40px] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Activity size={200} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-blue-500 rounded-xl flex items-center justify-center animate-pulse">
              <Activity size={20} />
            </div>
            <h3 className="text-2xl font-black tracking-tight">AI Predictive Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <AiInsight 
              label="No-Show Risk" 
              value="12% High Risk" 
              desc="Next 24h appointments with high cancellation probability."
              action="Send extra WhatsApp reminders"
            />
            <AiInsight 
              label="Stock Forecast" 
              value="Paracetamol Low" 
              desc="Estimated stock out in 4 days based on current consumption."
              action="Auto-generate PO to Supplier"
            />
            <AiInsight 
              label="Revenue Forecast" 
              value="₹8.5L Next Week" 
              desc="Projected revenue based on current booking trends."
              action="View growth strategy"
            />
          </div>
        </div>
      </div>

      {/* Top Performing Doctors */}
      <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Doctor Performance</h3>
        <div className="space-y-6">
          <PerformanceRow name="Dr. Ritesh Kumar" dept="Cardiology" patients={482} revenue="₹4.2L" />
          <PerformanceRow name="Dr. Sneha Singh" dept="Pediatrics" patients={391} revenue="₹2.8L" />
          <PerformanceRow name="Dr. Amit Sharma" dept="Orthopedics" patients={215} revenue="₹5.1L" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend, icon, color, trendUp = true }: any) {
  return (
    <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className={`h-14 w-14 rounded-2xl ${color} text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-black ${trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
          {trend}
        </span>
      </div>
      <div>
        <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">{label}</h4>
        <div className="text-3xl font-black text-slate-800">{value}</div>
      </div>
    </div>
  );
}

function PerformanceRow({ name, dept, patients, revenue }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[28px] border border-slate-100 hover:border-blue-200 transition-all">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-bold text-blue-600">
          {name.charAt(4)}
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{name}</h4>
          <p className="text-xs text-slate-500 font-medium">{dept}</p>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Patients</p>
          <p className="text-lg font-black text-slate-800">{patients}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
          <p className="text-lg font-black text-emerald-600">{revenue}</p>
        </div>
      </div>
    </div>
  );
}

function AiInsight({ label, value, desc, action }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-[32px] border border-white/10 hover:bg-white/20 transition-all group">
      <h4 className="text-blue-300 font-bold text-xs uppercase tracking-widest mb-2">{label}</h4>
      <div className="text-2xl font-black mb-4 group-hover:scale-105 transition-transform origin-left">{value}</div>
      <p className="text-sm text-blue-100/60 leading-relaxed mb-6 font-medium">{desc}</p>
      <button className="flex items-center gap-2 text-xs font-black text-blue-300 hover:text-white transition-colors group/btn">
        {action} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
