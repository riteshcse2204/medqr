'use client';

import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import AdminDashboard from './dashboard/admin/page';
import DoctorDashboard from './dashboard/doctor/page';
import ReceptionDashboard from './dashboard/reception/page';
import { Loader2 } from 'lucide-react';

export default function MasterDashboard() {
  const { user } = useAuthStore();

  // If user is not loaded yet (hydration), show a premium loader
  if (!user) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-slate-50 gap-6">
        <div className="relative">
          <div className="h-24 w-24 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-600/30">M</div>
          </div>
        </div>
        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Initializing MedQR Portal</p>
      </div>
    );
  }

  // Role-based routing within the same page for seamless experience
  const role = user.role?.toUpperCase();

  switch (role) {
    case 'ADMIN':
    case 'SUPERADMIN':
      return <AdminDashboard />;
    
    case 'DOCTOR':
      return <DoctorDashboard />;
    
    case 'RECEPTIONIST':
    case 'STAFF':
      return <ReceptionDashboard />;
    
    default:
      // Fallback to a general/doctor view if role is unknown
      return <DoctorDashboard />;
  }
}
