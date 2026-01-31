
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import StudentSearch from './components/StudentSearch';
import { Student, ViewType } from './types';
import { getStorageData, saveStorageData } from './utils';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('DASHBOARD');
  const [students, setStudents] = useState<Student[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load data on mount
  useEffect(() => {
    const data = getStorageData();
    setStudents(data);
    setInitialized(true);
  }, []);

  // Save data whenever it changes (after initialization)
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
      {renderContent()}
    </Layout>
  );
};

export default App;
