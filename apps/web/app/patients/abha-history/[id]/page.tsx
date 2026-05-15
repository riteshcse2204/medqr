'use client';

import React from 'react';
import { ShieldCheck, Calendar, Activity, Building, ArrowLeft, Download, ExternalLink, History } from 'lucide-react';
import Link from 'next/link';

const patientInfo = {
  name: 'Ramesh Kumar',
  abhaId: '91-4822-1923-4481',
  age: 42,
  gender: 'Male',
  verified: true
};

const nhaRecords = [
  { id: 1, date: '12 Jan 2024', type: 'Lab Report', facility: 'Global Diagnostics', detail: 'Lipid Profile - High Cholesterol', status: 'Verified' },
  { id: 2, date: '05 Nov 2023', type: 'Prescription', facility: 'City General Hospital', detail: 'Amoxicillin 500mg, Paracetamol', status: 'Verified' },
  { id: 3, date: '18 Aug 2023', type: 'Discharge Summary', facility: 'Apollo Specialty', detail: 'Appendectomy - Successful recovery', status: 'Verified' },
];

export default function AbhaHistoryPage() {
  return (
    <div className="p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/patients" className="p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{patientInfo.name}</h1>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                <ShieldCheck size={12} /> ABHA Verified
              </div>
            </div>
            <p className="text-slate-500 font-bold tracking-tight">ABHA Number: <span className="text-indigo-600 font-black">{patientInfo.abhaId}</span></p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-slate-700 px-8 py-4 rounded-[24px] font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download size={20} /> Download ABDM Vault
          </button>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-[24px] font-bold shadow-xl shadow-indigo-200 transition-all flex items-center gap-2 hover:scale-105">
            <RefreshCw size={20} /> Sync with NHA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[48px] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-slate-100 flex items-center gap-3">
              <History size={24} className="text-indigo-600" />
              <h2 className="text-2xl font-black text-slate-900">National Health Records (ABDM)</h2>
            </div>
            <div className="divide-y divide-slate-50">
              {nhaRecords.map((record) => (
                <div key={record.id} className="p-10 hover:bg-slate-50/50 transition-all group flex items-start justify-between">
                  <div className="flex gap-6">
                    <div className="h-16 w-16 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                      {record.type === 'Lab Report' ? <Activity size={28} /> : record.type === 'Prescription' ? <FileText size={28} /> : <Building size={28} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">{record.type}</span>
                        <span className="h-1 w-1 bg-slate-200 rounded-full"></span>
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5"><Calendar size={12}/> {record.date}</span>
                      </div>
                      <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{record.facility}</h3>
                      <p className="text-slate-500 font-medium">{record.detail}</p>
                    </div>
                  </div>
                  <button className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <ExternalLink size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <ShieldCheck size={120} />
            </div>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">
              <ShieldCheck size={24} className="text-indigo-400" /> Security Status
            </h3>
            <div className="space-y-6 relative z-10">
              <SecurityItem label="Consent Manager" value="Active" />
              <SecurityItem label="Health Locker" value="Connected" />
              <SecurityItem label="Encryption" value="AES-256" />
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6">Patient Health Profile</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-slate-50">
                <span className="text-slate-400 font-bold text-sm">Blood Group</span>
                <span className="text-slate-800 font-black">O+ Positive</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-slate-50">
                <span className="text-slate-400 font-bold text-sm">Chronic Conditions</span>
                <span className="text-rose-500 font-black">Hypertension</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-slate-50">
                <span className="text-slate-400 font-bold text-sm">Last Synced</span>
                <span className="text-slate-800 font-black">10 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityItem({ label, value }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-blue-200/60 font-bold text-sm">{label}</span>
      <span className="font-black text-white">{value}</span>
    </div>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function FileText(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}
