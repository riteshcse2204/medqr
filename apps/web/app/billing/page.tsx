'use client';

import React, { useState } from 'react';
import { 
  FileText, Search, Plus, Filter, 
  Download, Printer, CheckCircle, 
  CreditCard, Smartphone, Banknote,
  ChevronRight, MoreVertical
} from 'lucide-react';

const MOCK_INVOICES = [
  { id: 'INV-1024', patient: 'Rahul Sharma', date: '14 May 2026', amount: 1250, status: 'PAID', type: 'Consultation' },
  { id: 'INV-1025', patient: 'Anita Desai', date: '14 May 2026', amount: 4800, status: 'PENDING', type: 'Lab + Pharmacy' },
  { id: 'INV-1026', patient: 'Vikram Singh', age: 34, date: '14 May 2026', amount: 850, status: 'PAID', type: 'Follow-up' },
];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Billing & Invoices</h1>
            <p className="text-slate-500 mt-2 text-lg">Manage patient payments, invoices, and revenue tracking.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white text-slate-700 px-6 py-3 rounded-2xl font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
              <Download size={20} /> Export Report
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:-translate-y-1">
              <Plus size={22} /> Create New Invoice
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <StatBox label="Total Revenue (Today)" value="₹24,500" trend="+12%" icon={<Banknote className="text-emerald-500" />} color="bg-emerald-50" />
          <StatBox label="Outstanding Amount" value="₹12,480" trend="+2%" icon={<CreditCard className="text-amber-500" />} color="bg-amber-50" />
          <StatBox label="Invoices Generated" value="48" trend="+8%" icon={<FileText className="text-blue-500" />} color="bg-blue-50" />
        </div>

        {/* Billing Table Area */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-wrap justify-between items-center gap-6 bg-white">
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
              <TabButton label="All Invoices" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
              <TabButton label="Pending" active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} />
              <TabButton label="Paid" active={activeTab === 'paid'} onClick={() => setActiveTab('paid')} />
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by ID or Patient..." 
                className="pl-12 pr-6 py-3.5 bg-slate-50 border-transparent rounded-2xl w-80 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice ID</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Name</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-6 font-bold text-slate-800">{inv.id}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                          {inv.patient.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-700">{inv.patient}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-medium text-sm">{inv.type}</td>
                    <td className="px-8 py-6 text-slate-500 text-sm">{inv.date}</td>
                    <td className="px-8 py-6 font-extrabold text-slate-800">₹{inv.amount}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Printer size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-slate-50/50 border-t border-slate-100 text-center">
            <button className="text-blue-600 font-bold hover:underline">Load More Transactions</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, trend, icon, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex items-center gap-6 group hover:shadow-md transition-shadow">
      <div className={`h-16 w-16 rounded-2xl ${color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <h4 className="text-slate-500 font-bold text-sm uppercase tracking-wide mb-1">{label}</h4>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-slate-800">{value}</span>
          <span className="text-emerald-500 text-sm font-bold">{trend}</span>
        </div>
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${active ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
    >
      {label}
    </button>
  );
}
