import React, { useState } from 'react';
import { Student } from '../types.ts';
import ResultView from './ResultView.tsx';

interface StudentSearchProps {
  students: Student[];
}

const StudentSearch: React.FC<StudentSearchProps> = ({ students }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Student | null>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const found = students.find(s => s.rollNo.trim() === query.trim());
    if (found) {
      setResult(found);
    } else {
      setError('Invalid Roll Number. Please check and try again.');
    }
  };

  if (result) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button 
          onClick={() => setResult(null)}
          className="text-blue-600 font-bold flex items-center gap-2 mb-4 hover:underline"
        >
          ← Back to Search
        </button>
        <ResultView student={result} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Student Portal</h2>
        <p className="text-slate-500 text-lg">Enter your examination roll number to download your digital report card.</p>
      </div>

      <form onSubmit={handleSearch} className="bg-white p-2 rounded-3xl shadow-xl border border-slate-100 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter Enrollment / Roll Number..."
          className="flex-1 px-8 py-5 rounded-2xl border-none outline-none text-xl font-medium placeholder:text-slate-300"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          Check Result
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-center font-bold">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default StudentSearch;