'use client';

import React from 'react';
import { Activity, Thermometer, Weight, Heart, Battery, Wifi, RefreshCw, Plus, Clock } from 'lucide-react';

const devices = [
  { id: 1, name: 'Digital Scale Alpha', type: 'WEIGHING_SCALE', status: 'Online', battery: 85, lastSeen: '2 mins ago' },
  { id: 2, name: 'Smart BP Monitor', type: 'BP_MONITOR', status: 'Online', battery: 42, lastSeen: 'Just now' },
  { id: 3, name: 'OxiPulse Pro', type: 'PULSE_OXIMETER', status: 'Offline', battery: 0, lastSeen: '2 days ago' },
];

const recentReadings = [
  { id: 1, patient: 'Ramesh Kumar', device: 'Digital Scale Alpha', value: '72.5 kg', time: '10:45 AM', color: 'blue' },
  { id: 2, patient: 'Sunita Devi', device: 'Smart BP Monitor', value: '128/84 mmHg', time: '10:42 AM', color: 'rose' },
  { id: 3, patient: 'Anil Singh', device: 'Smart BP Monitor', value: '135/90 mmHg', time: '10:30 AM', color: 'rose' },
];

export default function IotPage() {
  return (
    <div className="p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">IoT Medical Devices</h1>
          <p className="text-slate-500 font-medium">Real-time data synchronization from smart medical equipment.</p>
        </div>
        <div className="flex gap-4">
          <button className="p-4 bg-white border border-slate-200 text-slate-600 rounded-[24px] hover:bg-slate-50 transition-all">
            <RefreshCw size={24} />
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-[24px] font-bold shadow-xl shadow-slate-200 transition-all hover:scale-105 active:scale-95">
            <Plus size={20} />
            <span>Connect Device</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Device Status Cards */}
        {devices.map((device) => (
          <div key={device.id} className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
              <div className={`p-4 rounded-2xl ${device.status === 'Online' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'} group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                {device.type === 'WEIGHING_SCALE' ? <Weight size={24} /> : device.type === 'BP_MONITOR' ? <Heart size={24} /> : <Activity size={24} />}
              </div>
              <div className="flex items-center gap-2">
                <Battery size={16} className={device.battery < 20 ? 'text-red-500' : 'text-slate-400'} />
                <span className="text-xs font-black text-slate-400">{device.battery}%</span>
              </div>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-2">{device.name}</h3>
            <div className="flex items-center gap-2 mb-6">
              <Wifi size={14} className={device.status === 'Online' ? 'text-green-500' : 'text-slate-300'} />
              <span className="text-xs font-bold text-slate-400">{device.status}</span>
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1"><Clock size={12}/> {device.lastSeen}</span>
              <button className="text-blue-600 hover:underline">Settings</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[48px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">Live Reading Stream</h2>
          <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-xs font-black uppercase tracking-widest animate-pulse">Live</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Patient</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Device</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Value</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Time</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentReadings.map((reading) => (
                <tr key={reading.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-8 font-black text-slate-800">{reading.patient}</td>
                  <td className="px-10 py-8 font-bold text-slate-500">{reading.device}</td>
                  <td className="px-10 py-8">
                    <span className={`px-6 py-3 rounded-2xl bg-${reading.color}-50 text-${reading.color}-600 font-black text-lg`}>
                      {reading.value}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-slate-400 font-medium">{reading.time}</td>
                  <td className="px-10 py-8 text-right">
                    <button className="text-blue-600 font-bold hover:underline opacity-0 group-hover:opacity-100 transition-all">Link to EHR</button>
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
