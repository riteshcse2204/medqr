'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Users, Activity, Calendar, FileText, 
  Settings, Bell, Search, Menu, 
  LogOut, LayoutDashboard, Stethoscope, Pill,
  Home, FlaskConical, ShieldCheck, MapPin
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useLanguage } from '@/lib/LanguageContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, token, logout } = useAuthStore();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redirect to login if no token is found
  React.useEffect(() => {
    if (!token && pathname !== '/login') {
      router.push('/login');
    }
  }, [token, pathname, router]);

  // Hide sidebar on login page
  if (pathname === '/login') return <>{children}</>;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-slate-100 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-200">
            M
          </div>
          <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-blue-700 to-indigo-500">MedQR</h1>
        </div>
        
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          <NavItem href="/" icon={<LayoutDashboard size={22}/>} label={t('dashboard')} active={pathname === '/'} />
          <NavItem href="/patients" icon={<Users size={22}/>} label={t('patients')} active={pathname.startsWith('/patients')} />
          <NavItem href="/doctor/opd" icon={<Stethoscope size={22}/>} label="OPD Consultation" active={pathname.startsWith('/doctor')} />
          <NavItem href="/ipd" icon={<Home size={22}/>} label={t('ipd')} active={pathname.startsWith('/ipd')} />
          <NavItem href="/lab" icon={<FlaskConical size={22}/>} label={t('lab')} active={pathname.startsWith('/lab')} />
          <NavItem href="/pharmacy" icon={<Pill size={22}/>} label={t('pharmacy')} active={pathname.startsWith('/pharmacy')} />
          <NavItem href="/billing" icon={<FileText size={22}/>} label={t('billing')} active={pathname.startsWith('/billing')} />
          <NavItem href="/iot" icon={<Activity size={22}/>} label="IoT Portal" active={pathname.startsWith('/iot')} />
          <NavItem href="/analytics/nabh" icon={<ShieldCheck size={22}/>} label="NABH Compliance" active={pathname.startsWith('/analytics/nabh')} />
          
          <div className="pt-8 pb-4">
            <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Administration</p>
            <NavItem href="/settings" icon={<Settings size={22}/>} label={t('settings')} active={pathname === '/settings'} />
            <NavItem href="/settings/branches" icon={<MapPin size={22}/>} label="Branches" active={pathname.startsWith('/settings/branches')} />
          </div>
        </nav>
        
        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold group"
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-40 sticky top-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 text-slate-500 hover:bg-slate-100 rounded-2xl transition-all"
            >
              <Menu size={24} />
            </button>
            <div className="relative group hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Global search (Ctrl+K)..." 
                className="pl-12 pr-6 py-3.5 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-[20px] w-96 outline-none transition-all duration-300 font-medium"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end mr-4 hidden md:flex">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Current Branch</span>
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <Home size={14} className="text-blue-600" />
                <span>Patna Main Hospital</span>
              </div>
            </div>

            <button 
              onClick={toggleLanguage}
              className="px-4 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-xl transition-all font-bold text-xs"
            >
              {language === 'en' ? 'हिन्दी (HI)' : 'English (EN)'}
            </button>

            <button className="relative p-3 text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all">
              <Bell size={24} />
              <span className="absolute top-3.5 right-3.5 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            
            <div className="h-12 w-px bg-slate-200 hidden sm:block"></div>
            
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">{user?.name || 'Dr. Ritesh'}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{user?.role || 'Senior Cardiologist'}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-lg group-hover:scale-105 transition-all">
                <img src={`https://i.pravatar.cc/150?u=${user?.id || 'demo'}`} alt="Profile" className="h-full w-full rounded-[14px] object-cover border-2 border-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-slate-50/50 relative">
          {children}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 group ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-600'}`}
    >
      <div className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`}>{icon}</div>
      <span className="tracking-tight">{label}</span>
    </Link>
  );
}
