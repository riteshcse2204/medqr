'use client';

import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, Search, Plus, Filter, 
  Clock, CheckCircle2, ClipboardList,
  MoreVertical, FileUp, Loader2, Beaker
} from 'lucide-react';
import { api } from '@/lib/api';

export default function LabPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('PENDING');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Fetching all lab orders
      const data: any = await api.get('/lab/orders');
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch lab orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(o => o.status === activeTab);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-4">
            Laboratory Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Process test orders and manage patient results.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:-translate-y-1">
          <Beaker size={22} /> New Test Request
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <TabButton 
          label="Pending Tests" 
          count={orders.filter(o => o.status === 'PENDING').length} 
          active={activeTab === 'PENDING'} 
          onClick={() => setActiveTab('PENDING')} 
        />
        <TabButton 
          label="Completed" 
          count={orders.filter(o => o.status === 'COMPLETED').length} 
          active={activeTab === 'COMPLETED'} 
          onClick={() => setActiveTab('COMPLETED')} 
        />
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 flex justify-center">
            <Loader2 className="animate-spin text-slate-300" size={40} />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400 bg-white rounded-[32px] border-2 border-dashed border-slate-100">
            <FlaskConical className="mx-auto mb-4 opacity-20" size={60} />
            <p className="font-bold text-xl">No {activeTab.toLowerCase()} tests</p>
            <p className="text-sm">New test requests will appear here once ordered by doctors.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 bg-blue-50 opacity-0 group-hover:opacity-10 rounded-full -mr-6 -mt-6 transition-opacity"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                  {order.patient?.name.charAt(0)}
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${order.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {order.status}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">{order.testName}</h3>
                <p className="text-slate-500 font-medium text-sm mt-1">{order.patient?.name}</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <Clock size={14} /> Ordered: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <ClipboardList size={14} /> ID: {order.id.slice(-6)}
                </div>
              </div>

              <button className="w-full bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 border border-slate-100 group-hover:border-blue-600">
                <FileUp size={18} /> {order.status === 'PENDING' ? 'Upload Results' : 'View Report'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TabButton({ label, count, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-4 rounded-[20px] font-bold text-sm flex items-center gap-3 transition-all ${active ? 'bg-slate-800 text-white shadow-xl shadow-slate-200' : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'}`}
    >
      {label}
      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
        {count}
      </span>
    </button>
  );
}
