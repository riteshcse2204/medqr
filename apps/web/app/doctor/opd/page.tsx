'use client';

import React, { useState } from 'react';
import { 
  Search, Users, Clock, CheckCircle, 
  Stethoscope, Pill, Clipboard, History,
  ChevronRight, Plus, X, Save, FileText
} from 'lucide-react';

// Mock data for the demo
const MOCK_QUEUE = [
  { id: '1', name: 'Rahul Sharma', age: 28, gender: 'Male', token: 'A-12', time: '10:30 AM', status: 'WAITING' },
  { id: '2', name: 'Anita Desai', age: 45, gender: 'Female', token: 'A-13', time: '10:45 AM', status: 'WAITING' },
  { id: '3', name: 'Vikram Singh', age: 34, gender: 'Male', token: 'A-14', time: '11:00 AM', status: 'WAITING' },
];

export default function DoctorOPDPage() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [vitals, setVitals] = useState({ temp: '', bp: '', weight: '', pulse: '' });
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<any[]>([]);

  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '1-0-1', duration: '5 Days' }]);
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Patient Queue Sidebar */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Users size={22} className="text-blue-600" /> Patient Queue
          </h2>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search queue..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-transparent rounded-xl text-sm outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {MOCK_QUEUE.map((patient) => (
            <div 
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedPatient?.id === patient.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-slate-100 hover:border-blue-200 text-slate-700'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedPatient?.id === patient.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                  {patient.token}
                </span>
                <span className="text-[10px] opacity-70 flex items-center gap-1">
                  <Clock size={10} /> {patient.time}
                </span>
              </div>
              <h4 className="font-bold truncate">{patient.name}</h4>
              <p className={`text-xs ${selectedPatient?.id === patient.id ? 'text-blue-100' : 'text-slate-400'}`}>
                {patient.age}Y • {patient.gender}
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* Prescription / Clinical Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        {selectedPatient ? (
          <div className="max-w-4xl mx-auto p-8">
            {/* Patient Header Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-800">{selectedPatient.name}</h1>
                  <p className="text-slate-500 font-medium">ID: #PT-9284 • Last Visit: 12 Jan 2026</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
                  <History size={20} />
                </button>
                <button className="p-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
                  <FileText size={20} />
                </button>
              </div>
            </div>

            {/* Vitals & Clinical Data */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <VitalsInput label="Temp (°F)" value={vitals.temp} onChange={(v) => setVitals({...vitals, temp: v})} />
              <VitalsInput label="BP (mmHg)" value={vitals.bp} onChange={(v) => setVitals({...vitals, bp: v})} />
              <VitalsInput label="Weight (kg)" value={vitals.weight} onChange={(v) => setVitals({...vitals, weight: v})} />
              <VitalsInput label="Pulse" value={vitals.pulse} onChange={(v) => setVitals({...vitals, pulse: v})} />
            </div>

            {/* Diagnosis Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Stethoscope size={20} className="text-blue-600" /> Diagnosis & Notes
              </h3>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none font-medium"
                rows={3}
                placeholder="Write clinical notes or diagnosis here..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </div>

            {/* Medicines Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Pill size={20} className="text-blue-600" /> Prescribed Medicines
                </h3>
                <button 
                  onClick={addMedicine}
                  className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                >
                  <Plus size={18} /> Add Medicine
                </button>
              </div>
              
              <div className="space-y-4">
                {medicines.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                    <p className="text-slate-400 font-medium">No medicines prescribed yet.</p>
                  </div>
                ) : (
                  medicines.map((med, i) => (
                    <div key={i} className="flex flex-wrap md:flex-nowrap gap-4 items-end p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex-1 min-w-[200px]">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Medicine Name</label>
                        <input 
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                          placeholder="Paracetamol 500mg"
                        />
                      </div>
                      <div className="w-32">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Frequency</label>
                        <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none">
                          <option>1-0-1</option>
                          <option>1-1-1</option>
                          <option>0-0-1</option>
                          <option>1-0-0</option>
                        </select>
                      </div>
                      <div className="w-32">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Duration</label>
                        <input className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" defaultValue="5 Days" />
                      </div>
                      <button 
                        onClick={() => removeMedicine(i)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-20">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-blue-600/40 transition-all flex items-center gap-3 hover:-translate-y-1">
                <Save size={20} /> Save Prescription
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <Stethoscope size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No Patient Selected</h3>
            <p className="mt-2">Select a patient from the queue to start the consultation.</p>
          </div>
        )}
      </main>
    </div>
  );
}

function VitalsInput({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
      <label className="text-xs font-bold text-slate-400 uppercase mb-2">{label}</label>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xl font-bold text-slate-800 outline-none bg-transparent"
        placeholder="--"
      />
    </div>
  );
}
