'use client';

import React from 'react';
import { 
  Users, Calendar, Clock, Stethoscope, 
  ChevronRight, Search, Plus, Activity,
  Video, FileText, FlaskConical, Home
} from 'lucide-react';

export default function DoctorDashboard() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Top Banner / Greeting */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
        <div className="absolute top-0 right-0 p-40 bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest">Patna Main Branch</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight mb-2">Good morning, Dr. Ritesh</h1>
            <p className="text-blue-100 text-lg font-medium">You have 12 appointments and 4 urgent reports to review today.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-blue-700 rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-xl">
              <Video size={18} /> Start Telemedicine
            </button>
            <button className="px-8 py-4 bg-blue-500/30 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-blue-500/50 transition-all">
              <Calendar size={18} /> View Schedule
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live OPD Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Live OPD Queue</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400">4 Patients Waiting</span>
              <div className="flex gap-1">
                <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all"><ChevronRight className="rotate-180" size={20}/></button>
                <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all"><ChevronRight size={20}/></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QueueCard 
              name="Rahul Sharma" 
              id="PAT-2024-001" 
              time="10:30 AM" 
              status="WAITING" 
              type="Follow-up" 
              vitals={{ bp: '120/80', temp: '98.6', pulse: '72' }}
            />
            <QueueCard 
              name="Anjali Kumari" 
              id="PAT-2024-005" 
              time="10:45 AM" 
              status="IN_PROGRESS" 
              type="New Patient" 
              vitals={{ bp: '140/90', temp: '99.1', pulse: '88' }}
              isUrgent
            />
            <QueueCard 
              name="Vikram Singh" 
              id="PAT-2024-012" 
              time="11:00 AM" 
              status="WAITING" 
              type="Review" 
              vitals={{ bp: '110/70', temp: '98.2', pulse: '65' }}
            />
            <button className="border-2 border-dashed border-slate-200 rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all group">
              <div className="h-14 w-14 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Plus size={32} />
              </div>
              <span className="font-bold">Add Walk-in Patient</span>
            </button>
          </div>
        </div>

        {/* Sidebar Actions & Activity */}
        <div className="space-y-8">
          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-900">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <ActionButton icon={<FileText className="text-emerald-600"/>} label="Prescribe" color="bg-emerald-50" />
              <ActionButton icon={<FlaskConical className="text-blue-600"/>} label="Lab Order" color="bg-blue-50" />
              <ActionButton icon={<Home className="text-indigo-600"/>} label="Admit Patient" color="bg-indigo-50" />
              <ActionButton icon={<Stethoscope className="text-amber-600"/>} label="Encounter" color="bg-amber-50" />
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Recent Reports</h3>
            <div className="space-y-4">
              <ReportItem name="Lab Report - CBC" patient="Sunita Devi" date="2 mins ago" urgent />
              <ReportItem name="X-Ray Chest" patient="Karan Johar" date="15 mins ago" />
              <ReportItem name="ECG Report" patient="Mohit Lal" date="1 hour ago" />
            </div>
            <button className="w-full mt-8 py-4 text-sm font-bold text-slate-400 hover:text-blue-600 border-t border-slate-100 transition-colors">
              Review All Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueCard({ name, id, time, status, type, vitals, isUrgent }: any) {
  return (
    <div className={`bg-white rounded-[32px] p-7 border transition-all duration-300 group cursor-pointer ${isUrgent ? 'border-red-200 shadow-lg shadow-red-500/5 ring-1 ring-red-100' : 'border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200'}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className={`h-14 w-14 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-lg ${isUrgent ? 'bg-red-500 shadow-red-200' : 'bg-blue-600 shadow-blue-200'}`}>
            {name.charAt(0)}
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{name}</h4>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{id}</p>
          </div>
        </div>
        {isUrgent && (
          <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">Urgent</span>
        )}
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
          <Clock size={16} className="text-slate-400" />
          {time}
        </div>
        <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
          <Activity size={16} className="text-slate-400" />
          {type}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100">
        <VitalItem label="BP" value={vitals.bp} />
        <VitalItem label="Temp" value={vitals.temp} />
        <VitalItem label="Pulse" value={vitals.pulse} />
      </div>
    </div>
  );
}

function VitalItem({ label, value }: any) {
  return (
    <div className="text-center">
      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{label}</p>
      <p className="text-sm font-black text-slate-900">{value}</p>
    </div>
  );
}

function ActionButton({ icon, label, color }: any) {
  return (
    <button className={`flex flex-col items-center justify-center gap-3 p-5 rounded-[24px] ${color} hover:scale-105 transition-all group`}>
      <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
        {icon}
      </div>
      <span className="text-xs font-black text-slate-800 tracking-tight">{label}</span>
    </button>
  );
}

function ReportItem({ name, patient, date, urgent }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className={`h-2 w-2 rounded-full ${urgent ? 'bg-red-500 animate-pulse' : 'bg-blue-400'}`}></div>
        <div>
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600">{name}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase">{patient}</p>
        </div>
      </div>
      <span className="text-[10px] font-bold text-slate-400">{date}</span>
    </div>
  );
}
