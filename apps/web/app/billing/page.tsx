'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, Search, Plus, Filter, 
  Download, Printer, CheckCircle, 
  CreditCard, Smartphone, Banknote,
  ChevronRight, MoreVertical, Loader2, Activity
} from 'lucide-react';
import { api } from '@/lib/api';

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [bills, setBills] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [billsData, statsData]: any = await Promise.all([
        api.get('/billing'),
        api.get('/billing/stats')
      ]);
      setBills(billsData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to fetch billing data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center gap-2 hover:-translate-y-1">
              <Plus size={22} /> Create New Invoice
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatBox label="Total Revenue" value={`₹${stats?.totalRevenue || 0}`} trend="+12%" icon={<Banknote className="text-emerald-500" />} color="bg-emerald-50" />
          <StatBox label="Tax Collected" value={`₹${stats?.taxCollected || 0}`} trend="+15%" icon={<Activity className="text-blue-500" />} color="bg-blue-50" />
          <StatBox label="Pending Amount" value={`₹${stats?.pendingAmount || 0}`} trend="+2%" icon={<CreditCard className="text-amber-500" />} color="bg-amber-50" />
          <StatBox label="Bills (MTD)" value={stats?.totalBills || 0} trend="+8%" icon={<FileText className="text-blue-500" />} color="bg-blue-50" />
        </div>

        {/* Billing Table Area */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-wrap justify-between items-center gap-6 bg-white">
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
              <TabButton label="All Invoices" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
              <TabButton label="Pending" active={activeTab === 'pending'} onClick={() => setActiveTab('pending')} />
              <TabButton label="Paid" active={activeTab === 'paid'} onClick={() => setActiveTab('paid')} />
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span> e-Invoice Enabled
            </div>
          </div>

          {loading ? (
            <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-slate-300" size={40} /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice / IRN</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Patient & Branch</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Taxes (GST)</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Total</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {bills.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-800">#{inv.billNo}</div>
                        <div className="text-[10px] text-emerald-600 font-bold tracking-tight uppercase">IRN: {inv.irn || 'GENERATING...'}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-slate-700">{inv.patient?.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{inv.branch?.name || 'Main Branch'}</div>
                      </td>
                      <td className="px-8 py-6 text-slate-500 text-sm">{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td className="px-8 py-6">
                        <div className="text-xs font-bold text-slate-700">₹{(inv.cgst || 0) + (inv.sgst || 0)}</div>
                        <div className="text-[10px] text-slate-400 font-medium">CGST + SGST</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="font-extrabold text-slate-800">₹{inv.totalAmount}</div>
                        <span className={`text-[10px] font-black ${inv.status === 'PAID' ? 'text-emerald-500' : 'text-amber-500'}`}>{inv.status}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-3 bg-slate-100 text-slate-500 hover:bg-blue-600 hover:text-white rounded-xl transition-all">
                            <Printer size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
