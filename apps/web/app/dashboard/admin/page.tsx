'use client';

import React from 'react';
import { 
  Users, TrendingUp, CreditCard, Activity, 
  ArrowUpRight, ArrowDownRight, Calendar, 
  Filter, Download, MoreHorizontal, Building2
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-1">Director's Overview</h1>
          <p className="text-slate-500 font-medium italic">Consolidated performance metrics for Patna & Muzaffarpur branches.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download size={18} /> Export PDF
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2">
            <Filter size={18} /> Last 30 Days
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="₹42,85,900" 
          trend="+12.4%" 
          isPositive={true}
          icon={<CreditCard className="text-blue-600" />}
          chartColor="bg-blue-600"
        />
        <StatCard 
          title="Patient Footfall" 
          value="1,482" 
          trend="+8.2%" 
          isPositive={true}
          icon={<Users className="text-indigo-600" />}
          chartColor="bg-indigo-600"
        />
        <StatCard 
          title="Avg. Bill Value" 
          value="₹2,890" 
          trend="-2.1%" 
          isPositive={false}
          icon={<Activity className="text-emerald-600" />}
          chartColor="bg-emerald-600"
        />
        <StatCard 
          title="Bed Occupancy" 
          value="84%" 
          trend="+5.0%" 
          isPositive={true}
          icon={<Building2 className="text-amber-600" />}
          chartColor="bg-amber-600"
        />
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend Chart (Simplified CSS Chart) */}
        <div className="lg:col-span-2 bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">Revenue Growth</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div> OPD
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-indigo-600"></div> IPD
              </span>
            </div>
          </div>
          
          <div className="h-[300px] flex items-end justify-between gap-4 px-4">
            {[65, 45, 75, 55, 90, 80, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="relative w-full h-full flex flex-col justify-end">
                  <div 
                    className="w-full bg-slate-100 rounded-t-xl group-hover:bg-blue-50 transition-all duration-500 relative overflow-hidden" 
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl opacity-80 group-hover:opacity-100 transition-all duration-500" style={{ height: '60%' }}></div>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Branch Performance */}
        <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8">Branch Performance</h3>
          <div className="space-y-6">
            <BranchProgress name="Patna Main" city="Bihar" revenue="₹28.4L" progress={85} color="bg-blue-600" />
            <BranchProgress name="Muzaffarpur" city="Bihar" revenue="₹14.4L" progress={62} color="bg-indigo-600" />
            <BranchProgress name="Ranchi (Exp)" city="Jharkhand" revenue="₹0.0L" progress={15} color="bg-slate-300" />
          </div>
          
          <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 bg-blue-500 opacity-20 rounded-full blur-3xl -mr-8 -mt-8"></div>
            <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">System Health</p>
            <h4 className="text-2xl font-black mb-4">99.9% Uptime</h4>
            <div className="flex gap-1">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`h-8 w-1 rounded-full ${i > 17 ? 'bg-slate-700' : 'bg-emerald-400'}`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-sm">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900">Recent High-Value Bills</h3>
          <button className="text-blue-600 font-bold text-sm hover:underline">View All Billing</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Patient</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Department</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <BillRow name="Amit Kumar" dept="Cardiology" amount="₹45,200" status="Paid" />
              <BillRow name="Priya Singh" dept="Orthopedics" amount="₹12,800" status="Pending" />
              <BillRow name="Sanjeev Jha" dept="General" amount="₹8,500" status="Paid" />
              <BillRow name="Riya Verma" dept="Gynaecology" amount="₹32,000" status="Paid" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, isPositive, icon, chartColor }: any) {
  return (
    <div className="bg-white rounded-[32px] p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-6">
        <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
      </div>
    </div>
  );
}

function BranchProgress({ name, city, revenue, progress, color }: any) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-black text-slate-800 tracking-tight">{name}</h4>
          <p className="text-xs text-slate-400 font-bold">{city}</p>
        </div>
        <p className="text-sm font-black text-slate-900">{revenue}</p>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000`} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function BillRow({ name, dept, amount, status }: any) {
  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-8 py-6 font-bold text-slate-800">{name}</td>
      <td className="px-8 py-6">
        <span className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600">{dept}</span>
      </td>
      <td className="px-8 py-6 font-black text-slate-900">{amount}</td>
      <td className="px-8 py-6">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
          {status}
        </span>
      </td>
      <td className="px-8 py-6 text-right">
        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </td>
    </tr>
  );
}
