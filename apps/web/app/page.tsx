'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, Activity, Calendar, FileText, 
  TrendingUp, Plus, Loader2
} from 'lucide-react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, queueData]: any = await Promise.all([
        api.get('/billing/stats'),
        api.get('/appointments/queue/today')
      ]);
      setStats(statsData);
      setQueue(queueData);
    } catch (err) {
      console.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Overview</h2>
          <p className="text-slate-500 mt-1">Here's what's happening at your hospital today.</p>
        </div>
        <Link href="/patients/register">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:-translate-y-0.5">
            <Plus size={20} />
            New Patient
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Today's Bills" value={stats?.totalBills || 0} trend="+12.5%" icon={<Users className="text-blue-500" size={24} />} color="bg-blue-50" />
        <StatCard title="OPD Queue" value={queue.length} trend="+5.2%" icon={<Calendar className="text-indigo-500" size={24} />} color="bg-indigo-50" />
        <StatCard title="Revenue (Today)" value={`₹${stats?.totalRevenue || 0}`} trend="+18.1%" icon={<TrendingUp className="text-emerald-500" size={24} />} color="bg-emerald-50" />
        <StatCard title="Outstanding" value={`₹${stats?.pendingAmount || 0}`} trend="-2.4%" trendDown icon={<FileText className="text-amber-500" size={24} />} color="bg-amber-50" />
      </div>

      {/* Recent Appointments & Queue */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Live OPD Queue</h3>
            <Link href="/doctor/opd" className="text-blue-600 font-medium text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {queue.slice(0, 5).map((appt) => (
              <QueueItem 
                key={appt.id}
                name={appt.patient?.name} 
                time={new Date(appt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                status={appt.status} 
                id={appt.token || 'N/A'} 
              />
            ))}
            {queue.length === 0 && <p className="text-center py-10 text-slate-400">No active patients in queue</p>}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <h3 className="text-lg font-semibold text-slate-200 mb-6 relative z-10">System Status</h3>
          <div className="space-y-5 relative z-10">
            <StatusItem label="Database" active />
            <StatusItem label="API Server" active />
            <StatusItem label="WhatsApp Gateway" active={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents
function StatCard({ title, value, trend, icon, color, trendDown = false }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
        <div className="text-3xl font-extrabold text-slate-800">{value}</div>
      </div>
    </div>
  );
}

function QueueItem({ name, time, status, id }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-lg text-slate-600`}>
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{name}</h4>
          <p className="text-xs text-slate-400 mt-0.5">TOKEN: {id} • {time}</p>
        </div>
      </div>
      <div className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase ${status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
        {status}
      </div>
    </div>
  );
}

function StatusItem({ label, active }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-300 font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${active ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
        <span className="text-[10px] font-bold uppercase text-slate-400">{active ? 'Online' : 'Offline'}</span>
      </div>
    </div>
  );
}
