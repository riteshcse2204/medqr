'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, Search, Plus, Filter, 
  MoreVertical, UserPlus, ArrowRight,
  Loader2, AlertCircle
} from 'lucide-react';
import { api } from '@/lib/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data: any = await api.get(`/patients?search=${search}`);
      setPatients(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load patients. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [search]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-4">
            Patients {!loading && <span className="bg-blue-100 text-blue-600 text-sm px-4 py-1 rounded-full">{patients.length} Total</span>}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-4 bg-slate-50 border-transparent rounded-2xl w-96 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
            />
          </div>
          <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
            <Filter size={20} />
          </button>
        </div>

        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-medium">Fetching patient records...</p>
          </div>
        ) : error ? (
          <div className="p-20 flex flex-col items-center justify-center text-red-500">
            <AlertCircle className="mb-4" size={40} />
            <p className="font-medium">{error}</p>
            <button onClick={fetchPatients} className="mt-4 text-blue-600 font-bold hover:underline">Try Again</button>
          </div>
        ) : patients.length === 0 ? (
          <div className="p-20 flex flex-col items-center justify-center text-slate-400">
            <Users className="mb-4 opacity-20" size={60} />
            <p className="font-medium text-lg">No patients found</p>
            <p className="text-sm">Try a different search or register a new patient.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Patient Details</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Gender/Age</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Joined Date</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patients.map((pt) => (
                  <tr key={pt.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                          {pt.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{pt.name}</h4>
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">ID: {pt.id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-600 font-medium">{pt.phone}</td>
                    <td className="px-8 py-6">
                      <span className="text-slate-700 font-semibold">{pt.gender}</span>
                      <span className="text-slate-400 ml-2">({new Date().getFullYear() - new Date(pt.dob).getFullYear()}Y)</span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-medium">{new Date(pt.createdAt).toLocaleDateString()}</td>
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
        )}
      </div>
    </div>
  );
}
