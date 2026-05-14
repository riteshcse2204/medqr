'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, Search, Plus, Filter, 
  MoreVertical, UserPlus, ArrowRight
} from 'lucide-react';

const MOCK_PATIENTS = [
  { id: 'PT-9284', name: 'Rahul Sharma', phone: '9876543210', gender: 'MALE', age: 28, lastVisit: '12 May 2026' },
  { id: 'PT-9285', name: 'Anita Desai', phone: '9876543211', gender: 'FEMALE', age: 45, lastVisit: '10 May 2026' },
  { id: 'PT-9286', name: 'Vikram Singh', phone: '9876543212', gender: 'MALE', age: 34, lastVisit: '08 May 2026' },
];

export default function PatientsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-4">
            Patients <span className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full">{MOCK_PATIENTS.length} Total</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Search, register and manage patient medical records.</p>
        </div>
        <Link href="/patients/register">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:-translate-y-1">
            <UserPlus size={22} /> Register New Patient
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-wrap justify-between items-center gap-6 bg-white">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, ID or phone..." 
              className="pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl w-96 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
            />
          </div>
          <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
            <Filter size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Details</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Gender/Age</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Visit</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_PATIENTS.map((pt) => (
                <tr key={pt.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                        {pt.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{pt.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{pt.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-slate-600 font-medium">{pt.phone}</td>
                  <td className="px-8 py-6">
                    <span className="text-slate-700 font-semibold">{pt.gender}</span>
                    <span className="text-slate-400 ml-2">({pt.age}Y)</span>
                  </td>
                  <td className="px-8 py-6 text-slate-500 font-medium">{pt.lastVisit}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <ArrowRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
