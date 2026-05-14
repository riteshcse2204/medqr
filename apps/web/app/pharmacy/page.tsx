'use client';

import React, { useState, useEffect } from 'react';
import { 
  Pill, Search, Plus, Filter, 
  AlertTriangle, ArrowUpRight, ArrowDownRight,
  MoreVertical, Edit, Trash2, Loader2, Package
} from 'lucide-react';
import { api } from '@/lib/api';

export default function PharmacyPage() {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [medsData, alertsData]: any = await Promise.all([
        api.get(`/pharmacy/medicines?search=${search}`),
        api.get('/pharmacy/stock-alerts')
      ]);
      setMedicines(medsData);
      setAlerts(alertsData);
    } catch (err) {
      console.error('Failed to fetch pharmacy data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-4">
            Pharmacy Inventory
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Manage medicines, stock levels, and expiry alerts.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:-translate-y-1">
          <Plus size={22} /> Add New Medicine
        </button>
      </div>

      {/* Stock Alerts */}
      {alerts.length > 0 && (
        <div className="mb-10 bg-amber-50 border border-amber-200 rounded-[32px] p-6 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
            <AlertTriangle size={28} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-amber-900 text-lg">Low Stock Warning</h3>
            <p className="text-amber-700 font-medium">{alerts.length} medicines are below the minimum stock level.</p>
          </div>
          <button className="bg-amber-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-amber-700 transition-all">
            View Alerts
          </button>
        </div>
      )}

      {/* Inventory Control Card */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-wrap justify-between items-center gap-6 bg-white">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search medicine or generic name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl w-96 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
            />
          </div>
          <div className="flex gap-4">
            <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-slate-300" size={40} /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Medicine Info</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Current Stock</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Unit Price</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {medicines.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                          <Package size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{med.name}</h4>
                          <p className="text-xs text-slate-400 font-medium">{med.genericName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                        {med.category || 'GENERAL'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className={`text-lg font-black ${med.stock <= med.minStock ? 'text-red-500' : 'text-slate-800'}`}>
                          {med.stock}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Min: {med.minStock}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-extrabold text-slate-800">₹{med.mrp}</td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${med.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {med.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                {medicines.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-20 text-center text-slate-400">
                      No medicines found in inventory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
