
import { Student, SubjectMarks } from './types.ts';

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const calculateResult = (marks: SubjectMarks[]): Pick<Student, 'totalObtained' | 'totalMax' | 'percentage' | 'grade' | 'status'> => {
  const totalObtained = marks.reduce((sum, m) => sum + (Number(m.theory) || 0) + (Number(m.practical) || 0), 0);
  const totalMax = marks.reduce((sum, m) => sum + (Number(m.maxMarks) || 100), 0);
  
  // Prevent division by zero
  const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
  
  let grade = 'F';
  let status: 'Pass' | 'Fail' = 'Fail';

  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';
  else if (percentage >= 33) grade = 'E';
  
  status = percentage >= 33 ? 'Pass' : 'Fail';

  return { totalObtained, totalMax, percentage, grade, status };
};

export const getStorageData = (): Student[] => {
  try {
    const data = localStorage.getItem('eduresult_students');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load data from database", e);
    return [];
  }
};

export const saveStorageData = (data: Student[]) => {
  try {
    localStorage.setItem('eduresult_students', JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save data to database", e);
  }
};
