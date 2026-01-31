
export interface SubjectMarks {
  subjectName: string;
  theory: number;
  practical: number;
  maxMarks: number;
}

export interface Student {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  section: string;
  marks: SubjectMarks[];
  totalObtained: number;
  totalMax: number;
  percentage: number;
  grade: string;
  status: 'Pass' | 'Fail';
  aiRemarks?: string;
  createdAt: string;
}

export type ViewType = 'DASHBOARD' | 'ADD_STUDENT' | 'STUDENT_SEARCH' | 'STUDENT_LIST';
