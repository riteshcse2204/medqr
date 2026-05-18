'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Users, Clock, CheckCircle, 
  Stethoscope, Pill, Clipboard, History,
  ChevronRight, Plus, X, Save, FileText,
  Loader2, AlertCircle
} from 'lucide-react';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';

export default function DoctorOPDPage() {
  const { user } = useAuthStore();
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [vitals, setVitals] = useState({ temp: '', bp: '', weight: '', pulse: '' });
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const data: any = await api.get(`/appointments/queue/today?doctorId=${user?.id}`);
      setQueue(data);
    } catch (err) {
      console.error('Failed to fetch queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchQueue();
  }, [user?.id]);

  const addMedicine = () => {
    setMedicines([...medicines, { medicineId: '', name: '', dosage: '', frequency: '1-0-1', duration: '5 Days' }]);
  };

  const removeMedicine = (index: number) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleSavePrescription = async () => {
    if (!selectedPatient) return;
    setSaving(true);
    try {
      await api.post('/clinical/encounters', {
        patientId: selectedPatient.patientId,
        appointmentId: selectedPatient.id,
        vitals: JSON.stringify(vitals),
        diagnosis,
        complaints: 'N/A',
        prescription: {
          items: medicines.map(m => ({
            medicineName: m.name,
            dosage: m.dosage,
            frequency: m.frequency,
            duration: m.duration,
          }))
        }
      });
      alert('Prescription saved successfully!');
      setSelectedPatient(null);
      fetchQueue();
    } catch (err) {
      alert('Failed to save prescription');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row h-[calc(100vh-6rem)] overflow-hidden">
      {/* Patient Queue Sidebar */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Users size={22} className="text-blue-600" /> Patient Queue
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-slate-300" /></div>
          ) : queue.length === 0 ? (
            <div className="py-20 text-center text-slate-400 text-sm">No appointments for today</div>
          ) : (
            queue.map((appt) => (
              <div 
                key={appt.id}
                onClick={() => setSelectedPatient(appt)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedPatient?.id === appt.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-slate-100 hover:border-blue-200 text-slate-700'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedPatient?.id === appt.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                    TOKEN: {appt.token || 'N/A'}
                  </span>
                  <span className="text-[10px] opacity-70 flex items-center gap-1">
                    <Clock size={10} /> {new Date(appt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h4 className="font-bold truncate">{appt.patient?.name}</h4>
                <p className={`text-xs ${selectedPatient?.id === appt.id ? 'text-blue-100' : 'text-slate-400'}`}>
                  {appt.patient?.phone}
                </p>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Prescription / Clinical Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        {selectedPatient ? (
          <div className="max-w-4xl mx-auto p-8 pb-32">
            {/* Patient Header Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-bold">
                  {selectedPatient.patient?.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-800">{selectedPatient.patient?.name}</h1>
                  <p className="text-slate-500 font-medium">ID: {selectedPatient.patient?.uhid || selectedPatient.patientId.slice(-8)} • {selectedPatient.type}</p>
                </div>
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
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
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
                {medicines.map((med, i) => (
                  <div key={i} className="flex flex-wrap md:flex-nowrap gap-4 items-end p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Medicine Name</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        placeholder="Paracetamol 500mg"
                        value={med.name}
                        onChange={(e) => {
                          const newMeds = [...medicines];
                          newMeds[i].name = e.target.value;
                          setMedicines(newMeds);
                        }}
                      />
                    </div>
                    <div className="w-32">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Frequency</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none"
                        value={med.frequency}
                        onChange={(e) => {
                          const newMeds = [...medicines];
                          newMeds[i].frequency = e.target.value;
                          setMedicines(newMeds);
                        }}
                      />
                    </div>
                    <div className="w-32">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Duration</label>
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none"
                        value={med.duration}
                        onChange={(e) => {
                          const newMeds = [...medicines];
                          newMeds[i].duration = e.target.value;
                          setMedicines(newMeds);
                        }}
                      />
                    </div>
                    <button onClick={() => removeMedicine(i)} className="p-2.5 text-slate-400 hover:text-red-500 rounded-lg transition-all"><X size={20} /></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-8 right-8 z-20">
              <button 
                onClick={handleSavePrescription}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all flex items-center gap-3 hover:-translate-y-1"
              >
                {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Save Prescription
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
