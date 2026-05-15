'use client';

import React from 'react';
import { ShieldCheck, BarChart3, Users, Clock, AlertTriangle, FileCheck, Info } from 'lucide-react';

const indicators = [
  { label: 'Avg. Length of Stay (ALOS)', value: '4.2 Days', target: '< 5 Days', status: 'Healthy' },
  { label: 'Bed Occupancy Rate', value: '78%', target: '70-85%', status: 'Healthy' },
  { label: 'Re-admission Rate (30 Days)', value: '2.1%', target: '< 3%', status: 'Healthy' },
  { label: 'Medication Error Rate', value: '0.08%', target: '< 0.5%', status: 'Excellent' },
  { label: 'Patient Satisfaction Score', value: '94%', target: '> 90%', status: 'Healthy' },
  { label: 'Hand Hygiene Compliance', value: '88%', target: '> 90%', status: 'Warning' },
];

export default function NabhPage() {
  return (
    <div className="p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">NABH Compliance Dashboard</h1>
          </div>
          <p className="text-slate-500 font-medium">Automated tracking of 5th Edition quality indicators for hospital accreditation.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-slate-700 px-8 py-4 rounded-[24px] font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <FileCheck size={20} /> Export Audit Pack
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {indicators.map((ind, i) => (
          <IndicatorCard key={i} {...ind} />
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-[40px] p-10 flex gap-8 items-start">
        <div className="h-16 w-16 bg-amber-200 rounded-3xl flex items-center justify-center text-amber-700 shrink-0">
          <AlertTriangle size={32} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-amber-900 mb-2">Non-Compliance Alert: Hand Hygiene</h3>
          <p className="text-amber-800 font-medium leading-relaxed max-w-3xl">
            Current compliance is at 88%, which is below the NABH target of 90%. 
            Audit data shows lower compliance in the Muzaffarpur Branch during the night shift. 
            AI recommends a training refresher for nursing staff in that unit.
          </p>
          <button className="mt-6 bg-amber-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-amber-800 transition-all">
            Schedule Training Session
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[48px] border border-slate-200 shadow-sm p-12">
        <h3 className="text-2xl font-black text-slate-900 mb-8">Accreditation Progress</h3>
        <div className="space-y-12">
          <ProgressBar label="Access, Assessment and Continuity of Care (AAC)" progress={95} />
          <ProgressBar label="Care of Patients (COP)" progress={82} />
          <ProgressBar label="Management of Medication (MOM)" progress={88} />
          <ProgressBar label="Patient Rights and Education (PRE)" progress={100} />
          <ProgressBar label="Hospital Infection Control (HIC)" progress={74} />
        </div>
      </div>
    </div>
  );
}

function IndicatorCard({ label, value, target, status }: any) {
  const isHealthy = status === 'Healthy' || status === 'Excellent';
  const isWarning = status === 'Warning';

  return (
    <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest">{label}</h4>
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isHealthy ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
          {status}
        </span>
      </div>
      <div className="text-4xl font-black text-slate-900 mb-4">{value}</div>
      <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
        <BarChart3 size={14} className="text-slate-400" />
        NABH Target: <span className="text-slate-900">{target}</span>
      </div>
    </div>
  );
}

function ProgressBar({ label, progress }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-slate-800 font-black text-sm">{label}</span>
        <span className="text-indigo-600 font-black text-sm">{progress}%</span>
      </div>
      <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 rounded-full transition-all duration-1000" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
}
