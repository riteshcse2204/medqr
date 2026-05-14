'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, Search, Plus, Filter, 
  Bed, User, Calendar, LogOut,
  ChevronRight, MoreVertical, Loader2,
  Building2, Activity
} from 'lucide-react';
import { api } from '@/lib/api';

export default function IPDPage() {
  const [wards, setWards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWards = async () => {
    try {
      setLoading(true);
      const data: any = await api.get('/ipd/wards');
      setWards(data);
    } catch (err) {
      console.error('Failed to fetch wards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWards();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-4">
            Ward & Bed Management
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Real-time occupancy tracking and patient admissions.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:-translate-y-1">
          <Bed size={22} /> Admit Patient
        </button>
      </div>

      {/* Ward Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center">
            <Loader2 className="animate-spin text-slate-300" size={40} />
          </div>
        ) : wards.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400 bg-white rounded-[32px] border-2 border-dashed border-slate-100">
            <Building2 className="mx-auto mb-4 opacity-20" size={60} />
            <p className="font-bold text-xl">No Wards Configured</p>
            <p className="text-sm">Setup wards and beds in settings to start admissions.</p>
          </div>
        ) : (
          wards.map((ward) => (
            <div key={ward.id} className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">{ward.name}</h3>
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">{ward.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-2xl text-xs font-black">
                    {ward.beds?.filter((b: any) => b.status === 'OCCUPIED').length || 0} / {ward.beds?.length || 0} OCCUPIED
                  </span>
                </div>
              </div>

              <div className="p-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {ward.beds?.map((bed: any) => (
                  <div 
                    key={bed.id}
                    className={`relative p-6 rounded-[28px] border-2 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group ${bed.status === 'OCCUPIED' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-100 hover:border-blue-200 text-slate-400'}`}
                  >
                    <Bed size={32} className={bed.status === 'OCCUPIED' ? 'text-indigo-600' : 'text-slate-200'} />
                    <span className="font-black text-sm tracking-tighter">{bed.bedNumber}</span>
                    
                    {bed.status === 'OCCUPIED' && (
                      <div className="absolute -top-2 -right-2 h-6 w-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-white">
                        <Activity size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Quick Add Bed Placeholder */}
                <button className="p-6 rounded-[28px] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-slate-200 hover:text-slate-400 transition-all">
                  <Plus size={32} />
                  <span className="font-black text-sm tracking-tighter uppercase">Add Bed</span>
                </button>
              </div>

              <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-center">
                <button className="text-blue-600 font-black text-sm hover:underline flex items-center gap-2">
                  View Ward Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
