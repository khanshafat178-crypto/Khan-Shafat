
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import Dashboard from './components/Dashboard.tsx';
import StudentForm from './components/StudentForm.tsx';
import StudentList from './components/StudentList.tsx';
import StudentSearch from './components/StudentSearch.tsx';
import SettingsForm from './components/SettingsForm.tsx';
import Auth from './components/Auth.tsx';
import { Student, ViewType, InstitutionInfo, User } from './types.ts';
import { getStorageData, saveStorageData, getInstitutionInfo, saveInstitutionInfo } from './utils.ts';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewType>('DASHBOARD');
  const [students, setStudents] = useState<Student[]>([]);
  const [institution, setInstitution] = useState<InstitutionInfo>(getInstitutionInfo());
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check session
    const savedUser = localStorage.getItem('eduresult_session');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const data = getStorageData();
    setStudents(data);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveStorageData(students);
    }
  }, [students, initialized]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('eduresult_session', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eduresult_session');
  };

  const addStudent = (student: Student) => {
    setStudents(prev => [student, ...prev]);
    setView('STUDENT_LIST');
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const updateInstitution = (info: InstitutionInfo) => {
    setInstitution(info);
    saveInstitutionInfo(info);
  };

  if (!currentUser && view !== 'STUDENT_SEARCH') {
    return (
      <div className="min-h-screen">
         <div className="absolute top-6 right-6 z-50">
           <button 
             onClick={() => setView('STUDENT_SEARCH')}
             className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-bold text-sm backdrop-blur-md transition-all border border-white/10"
           >
             Go to Public Portal 🔍
           </button>
         </div>
         <Auth onLogin={handleLogin} />
      </div>
    );
  }

  // Public portal doesn't require login
  if (view === 'STUDENT_SEARCH') {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button 
             onClick={() => setView('DASHBOARD')}
             className="mb-8 font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            ← Admin Dashboard
          </button>
          <StudentSearch students={students} />
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'DASHBOARD':
        return <Dashboard students={students} />;
      case 'ADD_STUDENT':
        return <StudentForm onAdd={addStudent} />;
      case 'STUDENT_LIST':
        return <StudentList students={students} onDelete={deleteStudent} />;
      case 'SETTINGS':
        return <SettingsForm initialInfo={institution} onSave={updateInstitution} />;
      default:
        return <Dashboard students={students} />;
    }
  };

  return (
    <Layout activeView={view} setView={setView} onLogout={handleLogout}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
