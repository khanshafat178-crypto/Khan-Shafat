
import { GoogleGenAI } from "@google/genai";
import { Student } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStudentRemarks = async (student: Student): Promise<string> => {
  try {
    const prompt = `
      As a professional academic counselor, analyze the following student result and provide a short, 
      encouraging 2-sentence feedback/advice for the student.
      
      Student Name: ${student.name}
      Grade: ${student.grade}
      Percentage: ${student.percentage.toFixed(2)}%
      Status: ${student.status}
      Subjects: ${student.marks.map(m => `${m.subjectName}: ${m.theory + m.practical}/${m.maxMarks}`).join(', ')}
      
      The feedback should be personalized and mention specific areas of strength or improvement.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Keep working hard and reach for the stars!";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Great effort this semester. Focus on consistent practice for even better results next time.";
  }
};
