
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import Dashboard from './components/Dashboard.tsx';
import StudentForm from './components/StudentForm.tsx';
import StudentList from './components/StudentList.tsx';
import StudentSearch from './components/StudentSearch.tsx';
import { Student, ViewType } from './types.ts';
import { getStorageData, saveStorageData } from './utils.ts';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('DASHBOARD');
  const [students, setStudents] = useState<Student[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const data = getStorageData();
    setStudents(data);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveStorageData(students);
    }
  }, [students, initialized]);

  const addStudent = (student: Student) => {
    setStudents(prev => [student, ...prev]);
    setView('STUDENT_LIST');
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const renderContent = () => {
    switch (view) {
      case 'DASHBOARD':
        return <Dashboard students={students} />;
      case 'ADD_STUDENT':
        return <StudentForm onAdd={addStudent} />;
      case 'STUDENT_LIST':
        return <StudentList students={students} onDelete={deleteStudent} />;
      case 'STUDENT_SEARCH':
        return <StudentSearch students={students} />;
      default:
        return <Dashboard students={students} />;
    }
  };

  return (
    <Layout activeView={view} setView={setView}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
