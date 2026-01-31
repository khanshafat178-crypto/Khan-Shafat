
import { Student, SubjectMarks } from './types';

export const calculateResult = (marks: SubjectMarks[]): Pick<Student, 'totalObtained' | 'totalMax' | 'percentage' | 'grade' | 'status'> => {
  const totalObtained = marks.reduce((sum, m) => sum + m.theory + m.practical, 0);
  const totalMax = marks.reduce((sum, m) => sum + m.maxMarks, 0);
  const percentage = (totalObtained / totalMax) * 100;
  
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
  const data = localStorage.getItem('eduresult_students');
  return data ? JSON.parse(data) : [];
};

export const saveStorageData = (data: Student[]) => {
  localStorage.setItem('eduresult_students', JSON.stringify(data));
};
