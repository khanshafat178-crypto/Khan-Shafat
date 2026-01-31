
import React from 'react';
import { ViewType } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setView: (view: ViewType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  const menuItems = [
    { id: 'DASHBOARD', label: 'Overview', icon: '📊' },
    { id: 'ADD_STUDENT', label: 'Add Result', icon: '📝' },
    { id: 'STUDENT_LIST', label: 'Records', icon: '📋' },
    { id: 'STUDENT_SEARCH', label: 'Portal', icon: '🔍' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col sticky top-0 h-auto md:h-screen z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-blue-500 text-2xl">🎓</span>
            EduResult
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-black">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeView === item.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Database Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-300 font-medium">LocalStorage Connected</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-slate-50 overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md border-b p-4 px-8 sticky top-0 z-20 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">
            {menuItems.find(m => m.id === activeView)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-400">SESSION 24-25</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
              👤
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
