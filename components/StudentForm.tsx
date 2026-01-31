
import React, { useState } from 'react';
import { SubjectMarks, Student } from '../types.ts';
import { calculateResult, generateId } from '../utils.ts';
import { generateStudentRemarks } from '../geminiService.ts';

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
    updated[index] = { ...updated[index], [field]: field === 'subjectName' ? value : Number(value) || 0 };
    setMarks(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const calculated = calculateResult(marks);
      const newStudent: Student = {
        id: generateId(),
        ...formData,
        marks,
        ...calculated,
        createdAt: new Date().toISOString()
      };

      const remarks = await generateStudentRemarks(newStudent);
      newStudent.aiRemarks = remarks;

      onAdd(newStudent);
      alert('Success: Student data stored in local database!');
      
      setFormData({ name: '', rollNo: '', className: '', section: '' });
      setMarks(DEFAULT_SUBJECTS.map(s => ({
        subjectName: s,
        theory: 0,
        practical: 0,
        maxMarks: 100
      })));
    } catch (err) {
      console.error(err);
      alert('Error generating result. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Generate New Result (नया परिणाम)</h3>
          <p className="text-slate-500 text-sm">Fill student details to save in the local database.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex justify-between">
              <span>Full Name</span>
              <span className="text-slate-400 font-normal">पूरा नाम</span>
            </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Rahul Kumar"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex justify-between">
              <span>Roll Number</span>
              <span className="text-slate-400 font-normal">रोल नंबर</span>
            </label>
            <input
              required
              type="text"
              value={formData.rollNo}
              onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="2024001"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex justify-between">
              <span>Class</span>
              <span className="text-slate-400 font-normal">कक्षा</span>
            </label>
            <select
              required
              value={formData.className}
              onChange={e => setFormData({ ...formData, className: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Class</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
              <option value="College">College / Degree</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex justify-between">
              <span>Section</span>
              <span className="text-slate-400 font-normal">वर्ग</span>
            </label>
            <input
              required
              type="text"
              value={formData.section}
              onChange={e => setFormData({ ...formData, section: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="A"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-md font-bold text-slate-700">Subject Marks (विषय अंक)</h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Subject</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Theory</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Practical</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-600 uppercase">Max</th>
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
                        className="w-20 px-3 py-2 rounded-lg border border-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
                        value={mark.theory}
                        onChange={(e) => handleMarkChange(index, 'theory', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input 
                        type="number"
                        className="w-20 px-3 py-2 rounded-lg border border-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
                        value={mark.practical}
                        onChange={(e) => handleMarkChange(index, 'practical', e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input 
                        type="number"
                        className="w-20 px-3 py-2 rounded-lg border border-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
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
            className={`px-8 py-4 rounded-xl font-bold text-white shadow-xl transition-all ${
              loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
            }`}
          >
            {loading ? 'Storing Data...' : 'Generate & Store Result'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
