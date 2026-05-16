'use client';

import React from 'react';
import { 
  Users, UserPlus, FileText, Search, 
  CreditCard, TrendingUp, Clock, MapPin,
  CheckCircle2, AlertCircle, ArrowRight
} from 'lucide-react';

export default function ReceptionDashboard() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Search & Action Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Search Patient by Name, Phone, or ABHA ID..." 
            className="w-full pl-16 pr-8 py-6 bg-white border border-slate-200 rounded-[32px] focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all text-xl font-medium shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
            <kbd className="px-3 py-1.5 bg-slate-100 text-slate-400 rounded-lg text-xs font-black">CTRL</kbd>
            <kbd className="px-3 py-1.5 bg-slate-100 text-slate-400 rounded-lg text-xs font-black">K</kbd>
          </div>
        </div>
        <button className="h-full bg-blue-600 text-white rounded-[32px] font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95">
          <UserPlus size={24} /> New Registration
        </button>
      </div>

      {/* Stats & Finance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ReceptionStatCard 
          title="Today's Collections" 
          value="₹84,200" 
          subtitle="124 Transactions" 
          icon={<CreditCard className="text-emerald-600" />} 
          color="bg-emerald-50"
        />
        <ReceptionStatCard 
          title="Pending Payments" 
          value="₹12,450" 
          subtitle="8 Bills Awaiting" 
          icon={<AlertCircle className="text-amber-600" />} 
          color="bg-amber-50"
        />
        <ReceptionStatCard 
          title="Avg. Waiting Time" 
          value="18 Mins" 
          subtitle="Stable" 
          icon={<Clock className="text-blue-600" />} 
          color="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Registrations</h3>
            <button className="text-blue-600 font-bold text-sm">View All</button>
          </div>
          <div className="space-y-4">
            <PatientRow name="Rohan Mehra" time="5 mins ago" id="MED-9821" abhaStatus="Linked" />
            <PatientRow name="Sita Ram" time="12 mins ago" id="MED-9820" abhaStatus="Pending" />
            <PatientRow name="Gopal Das" time="45 mins ago" id="MED-9819" abhaStatus="Linked" />
            <PatientRow name="Meena Kumari" time="1 hour ago" id="MED-9818" abhaStatus="Linked" />
          </div>
        </div>

        {/* Doctor Availability */}
        <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Doctor Availability</h3>
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">All Active</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DoctorStatus name="Dr. Ritesh" dept="Cardiology" status="IN_CABINET" patients={3} />
            <DoctorStatus name="Dr. Ananya" dept="Pediatrics" status="ON_BREAK" patients={0} />
            <DoctorStatus name="Dr. Vikram" dept="Orthopedics" status="IN_CABINET" patients={5} />
            <DoctorStatus name="Dr. Suman" dept="General" status="AVAILABLE" patients={0} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceptionStatCard({ title, value, subtitle, icon, color }: any) {
  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all">
      <div className={`h-20 w-20 rounded-3xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        {React.cloneElement(icon as React.ReactElement, { size: 32 })}
      </div>
      <div>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h3>
        <p className="text-xs font-bold text-slate-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function PatientRow({ name, time, id, abhaStatus }: any) {
  return (
    <div className="flex items-center justify-between p-5 rounded-3xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
      <div className="flex items-center gap-5">
        <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center font-black text-blue-600">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{name}</h4>
          <p className="text-xs font-bold text-slate-400">{id} • {time}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${abhaStatus === 'Linked' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
          <CheckCircle2 size={12} /> ABHA
        </span>
        <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors"><ArrowRight size={20}/></button>
      </div>
    </div>
  );
}

function DoctorStatus({ name, dept, status, patients }: any) {
  const isAvailable = status === 'AVAILABLE';
  const isInCabinet = status === 'IN_CABINET';
  
  return (
    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className={`h-3 w-3 rounded-full ${isAvailable ? 'bg-emerald-500' : isInCabinet ? 'bg-blue-500 animate-pulse' : 'bg-amber-500'}`}></div>
        <h4 className="font-black text-slate-900 tracking-tight">{name}</h4>
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase mb-3">{dept}</p>
      <div className="flex justify-between items-center pt-4 border-t border-slate-200/50">
        <span className="text-[10px] font-black text-slate-500 uppercase">{status.replace('_', ' ')}</span>
        {patients > 0 && <span className="text-[10px] font-black text-blue-600">{patients} in queue</span>}
      </div>
    </div>
  );
}
