
import { Student, SubjectMarks, InstitutionInfo } from './types.ts';

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const calculateResult = (marks: SubjectMarks[]): Pick<Student, 'totalObtained' | 'totalMax' | 'percentage' | 'grade' | 'status'> => {
  const totalObtained = marks.reduce((sum, m) => sum + (Number(m.theory) || 0) + (Number(m.practical) || 0), 0);
  const totalMax = marks.reduce((sum, m) => sum + (Number(m.maxMarks) || 100), 0);
  const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
  
  let grade = 'F';
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';
  else if (percentage >= 33) grade = 'E';
  
  const status = percentage >= 33 ? 'Pass' : 'Fail';
  return { totalObtained, totalMax, percentage, grade, status };
};

export const getStorageData = (): Student[] => {
  try {
    const data = localStorage.getItem('eduresult_students');
    return data ? JSON.parse(data) : [];
  } catch (e) { return []; }
};

export const saveStorageData = (data: Student[]) => {
  localStorage.setItem('eduresult_students', JSON.stringify(data));
};

export const getInstitutionInfo = (): InstitutionInfo => {
  const data = localStorage.getItem('eduresult_institution');
  return data ? JSON.parse(data) : {
    name: 'Your School/College Name',
    address: '123 Education Lane, City, State',
    email: 'admin@school.edu',
    phone: '+91 9876543210',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'
  };
};

export const saveInstitutionInfo = (info: InstitutionInfo) => {
  localStorage.setItem('eduresult_institution', JSON.stringify(info));
};

export const exportToCSV = (students: Student[]) => {
  if (students.length === 0) return;
  
  const headers = ['Roll No', 'Name', 'Class', 'Section', 'Total Marks', 'Max Marks', 'Percentage', 'Grade', 'Status'];
  const rows = students.map(s => [
    s.rollNo,
    s.name,
    s.className,
    s.section,
    s.totalObtained,
    s.totalMax,
    s.percentage.toFixed(2),
    s.grade,
    s.status
  ]);

  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Student_Records_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
