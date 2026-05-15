'use client';

import React, { useState } from 'react';
import { 
  Settings, User, Shield, Building, 
  Bell, Smartphone, Database, Globe,
  ChevronRight, Save, Plus, Loader2,
  Trash2, Mail, Lock, Edit
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('hospital');

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
      <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-10">Hospital Settings</h1>

      <div className="flex-1 flex gap-10 overflow-hidden">
        {/* Settings Sidebar */}
        <aside className="w-80 shrink-0 space-y-2">
          <SettingsTab 
            icon={<Building size={20} />} 
            label="Hospital Profile" 
            active={activeSection === 'hospital'} 
            onClick={() => setActiveSection('hospital')} 
          />
          <SettingsTab 
            icon={<User size={20} />} 
            label="User Management" 
            active={activeSection === 'users'} 
            onClick={() => setActiveSection('users')} 
          />
          <SettingsTab 
            icon={<Shield size={20} />} 
            label="Roles & Permissions" 
            active={activeSection === 'roles'} 
            onClick={() => setActiveSection('roles')} 
          />
          <SettingsTab 
            icon={<Smartphone size={20} />} 
            label="SMS & WhatsApp" 
            active={activeSection === 'notifications'} 
            onClick={() => setActiveSection('notifications')} 
          />
          <SettingsTab 
            icon={<Database size={20} />} 
            label="Backup & Data" 
            active={activeSection === 'data'} 
            onClick={() => setActiveSection('data')} 
          />
        </aside>

        {/* Settings Content */}
        <main className="flex-1 bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-y-auto p-10">
          {activeSection === 'hospital' && <HospitalProfileSettings />}
          {activeSection === 'users' && <UserManagementSettings />}
        </main>
      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 font-bold' : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-blue-600'}`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <span>{label}</span>
      </div>
      <ChevronRight size={18} className={active ? 'opacity-100' : 'opacity-0'} />
    </button>
  );
}

function HospitalProfileSettings() {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-xl font-black text-slate-800 mb-6">General Information</h3>
        <div className="grid grid-cols-2 gap-6">
          <SettingInput label="Hospital Name" defaultValue="MedQR Speciality Hospital" />
          <SettingInput label="Tagline" defaultValue="Smart Healthcare for T2 Cities" />
          <SettingInput label="Contact Email" defaultValue="admin@medqr.com" />
          <SettingInput label="Phone Number" defaultValue="+91 9876543210" />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-black text-slate-800 mb-6">Address & Location</h3>
        <textarea 
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:border-blue-500 transition-all font-medium"
          rows={3}
          defaultValue="123, Healthcare Road, New Delhi, India - 110001"
        />
      </section>

      <div className="pt-6 flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2">
          <Save size={20} /> Save Changes
        </button>
      </div>
    </div>
  );
}

function UserManagementSettings() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-slate-800">Hospital Staff</h3>
        <button className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2">
          <Plus size={20} /> Invite Staff
        </button>
      </div>

      <div className="space-y-4">
        <StaffRow name="Dr. Ritesh Kumar" role="Senior Cardiologist" email="ritesh@medqr.com" />
        <StaffRow name="Sneha Singh" role="Receptionist" email="sneha@medqr.com" />
        <StaffRow name="Amit Sharma" role="Lab Technician" email="amit@medqr.com" />
      </div>
    </div>
  );
}

function StaffRow({ name, role, email }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[28px] border border-slate-100 group hover:border-blue-200 transition-all">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center font-bold text-slate-400 border border-slate-100">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{name}</h4>
          <p className="text-xs text-slate-500 font-medium">{role} • {email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm">
          <Edit size={18} />
        </button>
        <button className="p-3 text-slate-400 hover:text-red-600 hover:bg-white rounded-xl transition-all shadow-sm">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

function SettingInput({ label, defaultValue }: any) {
  return (
    <div>
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{label}</label>
      <input 
        type="text" 
        defaultValue={defaultValue}
        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all font-medium"
      />
    </div>
  );
}
