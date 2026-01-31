
import React, { useState } from 'react';
import { Student } from '../types.ts';
import ResultView from './ResultView.tsx';
import { exportToCSV } from '../utils.ts';

interface StudentListProps {
  students: Student[];
  onDelete: (id: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onDelete }) => {
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  if (viewingStudent) {
    return <ResultView student={viewingStudent} onClose={() => setViewingStudent(null)} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Academic Records</h3>
          <p className="text-xs text-slate-500">{students.length} results stored</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => exportToCSV(students)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all"
          >
            <span>📊</span> Export to Excel
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Roll No</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Class</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Percentage</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                  No records found.
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{s.rollNo}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{s.name}</td>
                  <td className="px-6 py-4 text-slate-600">{s.className}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{s.percentage.toFixed(1)}%</span>
                      <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${s.percentage >= 33 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                          style={{ width: `${s.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      s.status === 'Pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setViewingStudent(s)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        👁️
                      </button>
                      <button 
                        onClick={() => { if(confirm('Are you sure?')) onDelete(s.id); }}
                        className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
