
import React, { useState } from 'react';
import { SubjectMarks, Student } from '../types';
import { calculateResult } from '../utils';
import { generateStudentRemarks } from '../geminiService';

interface StudentFormProps {
  onAdd: (student: Student) => void;
}

const DEFAULT_SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'];

const StudentForm: React.FC<StudentFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    className: '',
    section: '',
  });

  const [marks, setMarks] = useState<SubjectMarks[]>(
    DEFAULT_SUBJECTS.map(s => ({
      subjectName: s,
      theory: 0,
      practical: 0,
      maxMarks: 100
    }))
  );

  const [loading, setLoading] = useState(false);

  const handleMarkChange = (index: number, field: keyof SubjectMarks, value: string | number) => {
    const updated = [...marks];
    updated[index] = { ...updated[index], [field]: Number(value) || value };
    setMarks(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const calculated = calculateResult(marks);
    const newStudent: Student = {
      id: crypto.randomUUID(),
      ...formData,
      marks,
      ...calculated,
      createdAt: new Date().toISOString()
    };

    // AI Remarks Generation
    const remarks = await generateStudentRemarks(newStudent);
    newStudent.aiRemarks = remarks;

    onAdd(newStudent);
    setLoading(false);
    
    // Reset
    setFormData({ name: '', rollNo: '', className: '', section: '' });
    setMarks(DEFAULT_SUBJECTS.map(s => ({
      subjectName: s,
      theory: 0,
      practical: 0,
      maxMarks: 100
    })));

    alert('Student result generated and stored successfully!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-slate-100 bg-slate-50">
        <h3 className="text-xl font-bold text-slate-800">Generate New Result</h3>
        <p className="text-slate-500">Enter student details and subject marks to generate mark sheet.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Student Full Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. Rahul Sharma"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Roll Number</label>
            <input
              required
              type="text"
              value={formData.rollNo}
              onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g. 2024001"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Class</label>
            <select
              required
              value={formData.className}
              onChange={e => setFormData({ ...formData, className: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Class</option>
              <option value="10th">10th Standard</option>
              <option value="12th">12th Standard (Science)</option>
              <option value="B.Tech">B.Tech (CS)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Section</label>
            <input
              required
              type="text"
              value={formData.section}
              onChange={e => setFormData({ ...formData, section: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. A"
            />
          </div>
        </div>

        {/* Marks Table */}
        <div className="space-y-4">
          <h4 className="text-md font-bold text-slate-700 flex items-center gap-2">
            📚 Subject-wise Marks
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600">Subject</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600">Theory</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600">Practical</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-600">Max Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {marks.map((mark, index) => (
                  <tr key={index}>
                    <td className="px-6 py-3">
                      <input 
                        className="bg-transparent font-medium text-slate-700 outline-none w-full"
                        value={mark.subjectName}
                        onChange={(e) => handleMarkChange(index, 'subjectName', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input 
                        type="number" 
                        max={mark.maxMarks}
                        className="w-24 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 focus:ring-blue-500"
                        value={mark.theory}
                        onChange={(e) => handleMarkChange(index, 'theory', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input 
                        type="number"
                        max={mark.maxMarks}
                        className="w-24 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 focus:ring-blue-500"
                        value={mark.practical}
                        onChange={(e) => handleMarkChange(index, 'practical', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input 
                        type="number"
                        className="w-24 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-1 focus:ring-blue-500"
                        value={mark.maxMarks}
                        onChange={(e) => handleMarkChange(index, 'maxMarks', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-10 py-4 rounded-xl font-bold text-white shadow-lg shadow-blue-200 flex items-center gap-3 transition-all ${
              loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing & Storing...
              </>
            ) : (
              <>🚀 Generate Result</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
