
import React from 'react';
import { Student } from '../types.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  students: Student[];
}

const Dashboard: React.FC<DashboardProps> = ({ students }) => {
  const totalStudents = students.length;
  const hasData = totalStudents > 0;
  
  const passedStudents = students.filter(s => s.status === 'Pass').length;
  const failedStudents = totalStudents - passedStudents;
  const avgPercentage = hasData 
    ? (students.reduce((acc, s) => acc + s.percentage, 0) / totalStudents).toFixed(1) 
    : "0.0";

  const pieData = [
    { name: 'Pass', value: passedStudents, color: '#10b981' },
    { name: 'Fail', value: failedStudents, color: '#ef4444' },
  ];

  const gradeDist = students.reduce((acc: any, s) => {
    acc[s.grade] = (acc[s.grade] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(gradeDist).sort().map(g => ({
    name: g,
    count: gradeDist[g]
  }));

  const stats = [
    { label: 'Total Students', value: totalStudents, icon: '👥', color: 'bg-blue-50 text-blue-600' },
    { label: 'Passed', value: passedStudents, icon: '✅', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Failed', value: failedStudents, icon: '❌', color: 'bg-rose-50 text-rose-600' },
    { label: 'Avg. Success', value: `${avgPercentage}%`, icon: '📈', color: 'bg-amber-50 text-amber-600' },
  ];

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-6">📊</div>
        <h2 className="text-2xl font-bold text-slate-800">No Data in Database</h2>
        <p className="text-slate-500 mt-2 max-w-sm">Please add student records via the 'Add Result' tab to see analytics here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex justify-between">
            <span>Grade Distribution</span>
            <span className="text-slate-400 text-xs">ग्रेड वितरण</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="text-lg font-bold text-slate-800 mb-6 w-full flex justify-between">
            <span>Result Ratio</span>
            <span className="text-slate-400 text-xs">परिणाम अनुपात</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-8 mt-4">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
