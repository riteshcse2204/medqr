'use client';

import React from 'react';
import { 
  Building2, Users, CreditCard, TrendingUp, 
  Search, ShieldCheck, AlertCircle, ArrowUpRight,
  MoreHorizontal, Activity, BarChart3, Globe
} from 'lucide-react';

export default function SuperAdminDashboard() {
  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">SaaS Master Control</h1>
          <p className="text-slate-500 font-medium text-lg mt-1">Managing 42 hospitals across 12 cities.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Globe size={18} /> Network Map
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
            <ShieldCheck size={18} /> Platform Health
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MasterStatCard 
          title="Total MRR" 
          value="₹12,50,000" 
          trend="+8.2%" 
          isPositive={true}
          icon={<CreditCard className="text-blue-600" />}
        />
        <MasterStatCard 
          title="Active Tenants" 
          value="42" 
          trend="+3 new" 
          isPositive={true}
          icon={<Building2 className="text-emerald-600" />}
        />
        <MasterStatCard 
          title="Total Patients" 
          value="85,412" 
          trend="+15k" 
          isPositive={true}
          icon={<Users className="text-indigo-600" />}
        />
        <MasterStatCard 
          title="Avg. Sub Value" 
          value="₹29.7k" 
          trend="-2.1%" 
          isPositive={false}
          icon={<TrendingUp className="text-amber-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Hospitals Table */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Recent Onboardings</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search hospital..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-sm outline-none focus:bg-white focus:border-blue-200 transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hospital</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plan</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <TenantRow name="City Clinic" logo="CC" location="Mumbai" plan="Pro" status="Active" />
                <TenantRow name="Apex Hospital" logo="AH" location="Delhi" plan="Enterprise" status="Trial" />
                <TenantRow name="MediCare Center" logo="MC" location="Bangalore" plan="Standard" status="Active" />
                <TenantRow name="Ruby Hall Clinic" logo="RH" location="Pune" plan="Pro" status="Expired" isUrgent />
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscription Mix */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8">Plan Distribution</h3>
          <div className="space-y-6">
            <PlanProgress label="Enterprise" count={8} percentage={20} color="bg-indigo-600" />
            <PlanProgress label="Pro Plan" count={24} percentage={60} color="bg-blue-500" />
            <PlanProgress label="Standard" count={10} percentage={20} color="bg-slate-300" />
          </div>

          <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 bg-blue-500 opacity-20 rounded-full blur-3xl -mr-8 -mt-8"></div>
            <p className="text-xs font-black text-slate-400 mb-1 uppercase tracking-widest">System Health</p>
            <h4 className="text-2xl font-black mb-4">99.9% Uptime</h4>
            <div className="flex gap-1.5">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className={`h-8 w-1 rounded-full ${i > 21 ? 'bg-slate-700' : 'bg-emerald-400'}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MasterStatCard({ title, value, trend, isPositive, icon }: any) {
  return (
    <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
    </div>
  );
}

function TenantRow({ name, logo, location, plan, status, isUrgent }: any) {
  return (
    <tr className="hover:bg-slate-50 transition-colors group cursor-pointer">
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
            {logo}
          </div>
          <span className="font-bold text-slate-800">{name}</span>
        </div>
      </td>
      <td className="px-8 py-5 text-sm font-medium text-slate-500">{location}</td>
      <td className="px-8 py-5">
        <span className="text-xs font-bold text-slate-600">{plan}</span>
      </td>
      <td className="px-8 py-5">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
          status === 'Trial' ? 'bg-blue-50 text-blue-600' : 
          'bg-red-50 text-red-600'
        }`}>
          {status}
        </span>
      </td>
      <td className="px-8 py-5 text-right">
        <button className="p-2 text-slate-300 hover:text-blue-600"><MoreHorizontal size={18}/></button>
      </td>
    </tr>
  );
}

function PlanProgress({ label, count, percentage, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-900">{count} Hospitals</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
