'use client';

import React from 'react';
import { 
  Pill, AlertTriangle, Package, TrendingUp, 
  Search, Plus, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle2, ShoppingCart
} from 'lucide-react';

export default function PharmacyDashboard() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Header with Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InventoryStat cardColor="bg-blue-600" icon={<Package className="text-white"/>} label="Total SKUs" value="1,280" trend="+12" />
        <InventoryStat cardColor="bg-red-500" icon={<AlertTriangle className="text-white"/>} label="Low Stock" value="24" trend="Action Needed" isCritical />
        <InventoryStat cardColor="bg-emerald-600" icon={<CheckCircle2 className="text-white"/>} label="Expiring Soon" value="8" trend="Next 30 Days" />
        <InventoryStat cardColor="bg-indigo-600" icon={<ShoppingCart className="text-white"/>} label="PO Pending" value="5" trend="₹2.4L Value" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prescription Queue */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Prescriptions</h3>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600" size={18} />
              <input 
                type="text" 
                placeholder="Find prescription..." 
                className="pl-12 pr-6 py-3 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none transition-all font-bold text-sm"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <PrescriptionItem patient="Vikram Jha" id="RX-9901" time="2 mins ago" status="NEW" items={3} />
            <PrescriptionItem patient="Rani Devi" id="RX-9895" time="15 mins ago" status="PREPARING" items={5} />
            <PrescriptionItem patient="Sanjay Singh" id="RX-9890" time="45 mins ago" status="READY" items={2} />
          </div>
        </div>

        {/* Stock Updates */}
        <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-8">Stock Alerts</h3>
          <div className="space-y-6">
            <StockAlert name="Paracetamol 500mg" stock={120} min={500} status="CRITICAL" />
            <StockAlert name="Amoxicillin 250mg" stock={85} min={200} status="LOW" />
            <StockAlert name="Insulin Glargine" stock={12} min={50} status="CRITICAL" />
          </div>
          <button className="w-full mt-10 py-5 bg-slate-900 text-white rounded-3xl font-black text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
            <Plus size={20} /> Create Purchase Order
          </button>
        </div>
      </div>
    </div>
  );
}

function InventoryStat({ cardColor, icon, label, value, trend, isCritical }: any) {
  return (
    <div className={`${cardColor} rounded-[32px] p-8 text-white shadow-xl shadow-slate-200/50 relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 p-12 bg-white opacity-10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="relative z-10">
        <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
          {icon}
        </div>
        <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-black mb-4 tracking-tighter">{value}</h3>
        <p className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block ${isCritical ? 'bg-white text-red-600' : 'bg-white/20 text-white'}`}>
          {trend}
        </p>
      </div>
    </div>
  );
}

function PrescriptionItem({ patient, id, time, status, items }: any) {
  return (
    <div className="flex items-center justify-between p-6 rounded-3xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all group cursor-pointer">
      <div className="flex items-center gap-5">
        <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-xl">
          {patient.charAt(0)}
        </div>
        <div>
          <h4 className="font-black text-slate-900 text-lg group-hover:text-blue-600">{patient}</h4>
          <p className="text-xs font-bold text-slate-400">{id} • {items} medicines</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-xs font-black text-slate-400 italic">{time}</span>
        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${status === 'READY' ? 'bg-emerald-50 text-emerald-600' : status === 'PREPARING' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function StockAlert({ name, stock, min, status }: any) {
  return (
    <div className="p-5 bg-slate-50 rounded-[24px] border border-slate-100">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-black text-slate-800 tracking-tight">{name}</h4>
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${status === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>{status}</span>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-xs font-bold text-slate-400">Current Stock: <span className="text-slate-900">{stock} units</span></div>
        <div className="text-[10px] font-black text-slate-400">Min: {min}</div>
      </div>
      <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${status === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'} rounded-full`} 
          style={{ width: `${(stock / min) * 100}%` }}
        />
      </div>
    </div>
  );
}
