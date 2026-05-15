'use client';

import React from 'react';
import { Plus, Home, MapPin, Phone, Mail, CheckCircle2, MoreVertical, Building2 } from 'lucide-react';

const branches = [
  { id: 1, name: 'Patna Main Hospital', address: 'Kankarbagh, Patna', phone: '+91 98765 43210', email: 'patna@medqr.com', isMain: true, status: 'Active' },
  { id: 2, name: 'Gaya Diagnostics Center', address: 'Station Road, Gaya', phone: '+91 98765 43211', email: 'gaya@medqr.com', isMain: false, status: 'Active' },
  { id: 3, name: 'Muzaffarpur Clinic', address: 'Mithanpura, Muzaffarpur', phone: '+91 98765 43212', email: 'muz@medqr.com', isMain: false, status: 'Inactive' },
];

export default function BranchesPage() {
  return (
    <div className="p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Branches & Locations</h1>
          <p className="text-slate-500 font-medium">Manage multiple hospital locations and diagnostic centers.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-[24px] font-bold shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95">
          <Plus size={20} />
          <span>Add New Branch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
            {branch.isMain && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-[20px] text-[10px] font-black uppercase tracking-widest">
                Main Branch
              </div>
            )}
            
            <div className="h-16 w-16 bg-slate-100 rounded-3xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <Building2 size={32} />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{branch.name}</h3>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                  <div className={`h-2 w-2 rounded-full ${branch.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                  {branch.status}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50">
                <div className="flex items-start gap-4 text-slate-500 group-hover:text-slate-900 transition-colors">
                  <MapPin size={18} className="shrink-0 text-blue-500" />
                  <p className="text-sm font-medium leading-relaxed">{branch.address}</p>
                </div>
                <div className="flex items-center gap-4 text-slate-500 group-hover:text-slate-900 transition-colors">
                  <Phone size={18} className="shrink-0 text-blue-500" />
                  <p className="text-sm font-medium">{branch.phone}</p>
                </div>
                <div className="flex items-center gap-4 text-slate-500 group-hover:text-slate-900 transition-colors">
                  <Mail size={18} className="shrink-0 text-blue-500" />
                  <p className="text-sm font-medium">{branch.email}</p>
                </div>
              </div>

              <div className="pt-8 flex items-center gap-4">
                <button className="flex-1 bg-slate-900 text-white py-4 rounded-[20px] font-bold text-sm hover:bg-blue-600 transition-all active:scale-95">
                  Switch Context
                </button>
                <button className="p-4 bg-slate-100 rounded-[20px] text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
