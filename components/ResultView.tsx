
import React from 'react';
import { Student } from '../types.ts';
import { getInstitutionInfo } from '../utils.ts';

interface ResultViewProps {
  student: Student;
  onClose?: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ student, onClose }) => {
  const institution = getInstitutionInfo();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <img src={institution.logoUrl} className="w-32 h-32 object-contain filter grayscale invert" alt="bg-logo" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <img src={institution.logoUrl} className="w-20 h-20 rounded-2xl bg-white p-2 object-contain shadow-lg" alt="Institution Logo" />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black tracking-tight leading-tight uppercase">{institution.name}</h2>
              <p className="text-slate-300 text-sm font-medium">{institution.address}</p>
              <p className="text-blue-400 text-xs font-bold mt-1 tracking-widest">{institution.email} | {institution.phone}</p>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-bold transition-colors border border-white/20"
            >
              Close Record
            </button>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="text-center py-4 border-b-2 border-slate-50">
          <h3 className="text-xl font-black text-slate-800 tracking-widest uppercase">Statement of Marks</h3>
          <p className="text-slate-400 text-xs font-bold tracking-tighter">Academic Session 2024-2025</p>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Student Name</span>
            <p className="text-md font-bold text-slate-800 uppercase">{student.name}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollment No.</span>
            <p className="text-md font-bold text-slate-800">{student.rollNo}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class / Group</span>
            <p className="text-md font-bold text-slate-800">{student.className} - {student.section}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Result Date</span>
            <p className="text-md font-bold text-slate-800">{new Date(student.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Detailed Marks Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Course/Subject</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Theory</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Lab/Prac</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Secured</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {student.marks.map((m, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-700">{m.subjectName}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{m.theory}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{m.practical}</td>
                  <td className="px-6 py-4 text-center font-black text-slate-900">{m.theory + m.practical}</td>
                  <td className="px-6 py-4 text-center text-slate-400 font-bold">{m.maxMarks}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-50 font-black border-t-2 border-slate-100">
              <tr>
                <td className="px-6 py-5 text-slate-800 text-sm" colSpan={3}>CUMULATIVE SCORE</td>
                <td className="px-6 py-5 text-center text-blue-600 text-xl">{student.totalObtained}</td>
                <td className="px-6 py-5 text-center text-slate-500 text-lg">{student.totalMax}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Summary & AI Remarks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className={`p-6 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 ${
            student.status === 'Pass' ? 'border-emerald-100 bg-emerald-50' : 'border-rose-100 bg-rose-50'
          }`}>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance Index</span>
            <span className={`text-4xl font-black ${
              student.status === 'Pass' ? 'text-emerald-600' : 'text-rose-600'
            }`}>{student.status}</span>
            <div className="flex justify-between w-full px-4 mt-4 text-[10px] font-black text-slate-500">
              <span>GRADE: {student.grade}</span>
              <span>{student.percentage.toFixed(1)}%</span>
            </div>
          </div>

          <div className="md:col-span-2 p-6 rounded-2xl bg-indigo-50 border border-indigo-100 relative overflow-hidden flex flex-col justify-center">
            <h4 className="text-indigo-900 font-black text-xs uppercase tracking-widest mb-2">
              ✨ Performance Insight
            </h4>
            <p className="text-indigo-800 italic leading-relaxed text-sm font-medium">
              "{student.aiRemarks || 'Evaluating performance metrics...'}"
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex justify-center opacity-30 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Certified Electronic Result • Generated via EduResult Pro
        </div>
      </div>
    </div>
  );
};

export default ResultView;
