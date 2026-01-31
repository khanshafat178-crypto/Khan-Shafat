
import React from 'react';
import { Student } from '../types';

interface ResultViewProps {
  student: Student;
  onClose?: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ student, onClose }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-10 text-white relative">
        <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl">🎓</div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">EXAMINATION REPORT CARD</h2>
            <p className="text-slate-400 mt-2 font-medium tracking-widest uppercase">Academic Session 2024-25</p>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-bold transition-colors"
            >
              Close Window
            </button>
          )}
        </div>
      </div>

      <div className="p-10 space-y-10">
        {/* Profile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Student Name</span>
            <p className="text-lg font-bold text-slate-800">{student.name}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Roll Number</span>
            <p className="text-lg font-bold text-slate-800">{student.rollNo}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Class / Section</span>
            <p className="text-lg font-bold text-slate-800">{student.className} - {student.section}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Date Issued</span>
            <p className="text-lg font-bold text-slate-800">{new Date(student.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Detailed Marks Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Subject</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Theory</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Practical</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Max</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {student.marks.map((m, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-700">{m.subjectName}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{m.theory}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{m.practical}</td>
                  <td className="px-6 py-4 text-center font-bold text-slate-900">{m.theory + m.practical}</td>
                  <td className="px-6 py-4 text-center text-slate-400">{m.maxMarks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50/80 font-bold border-t-2 border-slate-100">
              <tr>
                <td className="px-6 py-4 text-slate-800" colSpan={3}>GRAND TOTAL</td>
                <td className="px-6 py-4 text-center text-blue-600 text-lg">{student.totalObtained}</td>
                <td className="px-6 py-4 text-center text-slate-500">{student.totalMax}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Summary & AI Remarks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1 space-y-4">
            <div className={`p-6 rounded-2xl flex flex-col items-center gap-2 border-2 ${
              student.status === 'Pass' ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'
            }`}>
              <span className="text-sm font-bold text-slate-400 uppercase">Final Status</span>
              <span className={`text-4xl font-black ${
                student.status === 'Pass' ? 'text-emerald-600' : 'text-rose-600'
              }`}>{student.status}</span>
              <div className="w-full bg-white/50 h-px my-2"></div>
              <div className="flex justify-between w-full px-2">
                <span className="text-xs font-bold text-slate-500">GRADE: {student.grade}</span>
                <span className="text-xs font-bold text-slate-500">SCORE: {student.percentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 p-8 rounded-2xl bg-indigo-50 border border-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-indigo-500 shadow-sm border border-indigo-100">
                AI ANALYZED
              </span>
            </div>
            <h4 className="text-indigo-900 font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="text-xl">✨</span> Academic Counselor Remarks
            </h4>
            <p className="text-indigo-800 italic leading-relaxed font-medium">
              "{student.aiRemarks || 'Loading AI insights...'}"
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex justify-between items-center opacity-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Official Digital Transcript</span>
          <span>System Generated - No Signature Required</span>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
