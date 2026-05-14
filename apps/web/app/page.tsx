import { 
  Users, Activity, Calendar, FileText, 
  Settings, Bell, Search, Menu, 
  TrendingUp, Plus
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Overview</h2>
              <p className="text-slate-500 mt-1">Here's what's happening at your hospital today.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 hover:-translate-y-0.5">
              <Plus size={20} />
              New Patient
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Patients" value="1,482" trend="+12.5%" icon={<Users className="text-blue-500" size={24} />} color="bg-blue-50" />
            <StatCard title="Appointments Today" value="42" trend="+5.2%" icon={<Calendar className="text-indigo-500" size={24} />} color="bg-indigo-50" />
            <StatCard title="Revenue (MTD)" value="₹8.4L" trend="+18.1%" icon={<TrendingUp className="text-emerald-500" size={24} />} color="bg-emerald-50" />
            <StatCard title="Pending Reports" value="14" trend="-2.4%" trendDown icon={<FileText className="text-amber-500" size={24} />} color="bg-amber-50" />
          </div>

          {/* Recent Appointments & Queue */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm shadow-slate-200/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Live OPD Queue</h3>
                <button className="text-blue-600 font-medium text-sm hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                <QueueItem name="Rahul Sharma" time="10:30 AM" status="In Progress" id="#PT-8472" />
                <QueueItem name="Anita Desai" time="10:45 AM" status="Waiting" id="#PT-8473" />
                <QueueItem name="Vikram Singh" time="11:00 AM" status="Waiting" id="#PT-8474" />
                <QueueItem name="Priya Patel" time="11:15 AM" status="Scheduled" id="#PT-8475" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <h3 className="text-lg font-semibold text-slate-200 mb-6 relative z-10">Doctor Availability</h3>
              <div className="space-y-5 relative z-10">
                <DoctorItem name="Dr. Ritesh" dept="Cardiology" available />
                <DoctorItem name="Dr. Sneha" dept="Pediatrics" available />
                <DoctorItem name="Dr. Amit" dept="Orthopedics" available={false} />
              </div>
              <button className="w-full mt-8 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl backdrop-blur-sm transition-colors font-medium border border-white/10">
                Manage Roster
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

// Subcomponents

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${active ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
      <div className={active ? 'text-blue-600' : 'text-slate-400'}>{icon}</div>
      <span>{label}</span>
    </div>
  );
}

function StatCard({ title, value, trend, icon, color, trendDown = false }: { title: string, value: string, trend: string, icon: React.ReactNode, color: string, trendDown?: boolean }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${trendDown ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
          {trend}
        </span>
      </div>
      <div>
        <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
        <div className="text-3xl font-extrabold text-slate-800">{value}</div>
      </div>
    </div>
  );
}

function QueueItem({ name, time, status, id }: { name: string, time: string, status: string, id: string }) {
  const isProgress = status === "In Progress";
  const isWaiting = status === "Waiting";
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${isProgress ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{name}</h4>
          <p className="text-xs text-slate-400 mt-0.5">{id} • {time}</p>
        </div>
      </div>
      <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${isProgress ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : isWaiting ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
        {status}
      </div>
    </div>
  );
}

function DoctorItem({ name, dept, available }: { name: string, dept: string, available: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium border border-slate-600">
          {name.split(' ')[1]?.charAt(0) || name.charAt(0)}
        </div>
        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-800 ${available ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
      </div>
      <div>
        <h4 className="font-medium text-slate-100">{name}</h4>
        <p className="text-xs text-slate-400">{dept}</p>
      </div>
    </div>
  );
}
